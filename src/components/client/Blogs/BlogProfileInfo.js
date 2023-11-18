import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { App, Button, Input, Form, Modal, Rate, Skeleton } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactPlayer from "react-player/lazy";
import {
  CloseOutlined,
  DeleteFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "@/app/i18n/client";
import { RedableFormatExactly } from "@/utils/dayjs";
import { LINK_URLS } from "@/utils/constants";
import InformationService from "@/services/InformationService";
import BackLink from "@/components/client/BackLink";
import BlogProfillePreview from "@/components/server/BlogProfillePreview";
import userFillLogo from "@/assets/img/icons/user-fill.svg";
import EmptyBlock from "@/components/server/EmptyBlock";

const { TextArea } = Input;

const BlogProfileInfo = ({ lng, slug }) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const router = useRouter();
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const [modal, contextHolder] = Modal.useModal();
  const [writeReview, setWriteReview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["oneGuide"],
    queryFn: async ({ signal }) => {
      const { data } = await InformationService.getOneGuide(slug, lng, signal);
      return data;
    },
  });

  const {
    data: dataVideo,
    isLoading: isLoadingVideo,
    isSuccess: isSuccessVideo,
  } = useQuery({
    queryKey: ["oneGuideVideo"],
    queryFn: async ({ signal }) => {
      const { data } = await InformationService.getOneGuideVideo(
        slug,
        lng,
        signal,
      );
      return data;
    },
  });

  const {
    data: dataComments,
    isLoading: isLoadingComments,
    isSuccess: isSuccessComments,
  } = useQuery({
    queryKey: ["oneGuideComments"],
    queryFn: async ({ signal }) => {
      const { data } = await InformationService.getGuideComments(slug, signal);
      return data;
    },
  });

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        comments: value?.reviews,
      };
      const formStarData = {
        stars: value?.stars,
      };
      await InformationService.commentSend(
        slug,
        session?.accessToken,
        formData,
      );
      await InformationService.starSend(
        slug,
        session?.accessToken,
        formStarData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["oneGuideComments"]);
      await notification.success({
        message: tMessage("success"),
        description: tMessage("successAcceptedReview"),
        placement: "topRight",
      });
      await form.setFieldsValue({
        reviews: "",
        stars: "",
      });
    },
    onError: async (error) => {
      if (error.response.status === 406) {
        await notification.warning({
          message: tMessage("warning"),
          description: tMessage("errorAcceptedOnlyReview"),
          placement: "topRight",
        });
      } else {
        await notification.error({
          message: tMessage("error"),
          description: tMessage("errorAcceptedReview"),
          placement: "topRight",
        });
      }
      console.error("Error post review", error);
    },
  });

  const { mutate: onDeleteComment } = useMutation({
    mutationFn: async (idComment) => {
      await InformationService.deleteGuideComments(
        idComment,
        session?.accessToken,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["oneGuideComments"]);
      await notification.success({
        message: tMessage("success"),
        description: tMessage("successDeleteReview"),
        placement: "topRight",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("errorDeleteReview"),
        placement: "topRight",
      });
      console.error("Error delete review", error);
    },
  });

  const onClickWriteReview = async () => {
    if (!session?.user) {
      router.push(`/${lng}/${LINK_URLS.login}`);
    } else if (session?.user?.guide_id === +slug) {
      modal.warning({
        title: tMessage("attention"),
        content: tMessage("attentionReview"),
      });
    } else {
      setWriteReview(!writeReview);
    }
  };

  const infoConnect = async (phone) => {
    await modal.info({
      title: tMessage("contact"),
      content: phone,
      icon: <InfoCircleOutlined />,
    });
  };

  const showDrawerEdit = async (id) => {
    await setCommentId(id);
    await showModal(id);
  };

  const handleDelete = async () => {
    await onDeleteComment(commentId);
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return !isLoading && isSuccess ? (
    <>
      <div className="blog-profile-preview__back">
        <BackLink lng={lng} small />
      </div>
      <BlogProfillePreview data={data} lng={lng} infoConnect={infoConnect} />
      <h3 className="title title-h3 blog-profile-preview__title-block">
        {tDefault("mySuggestions")}
      </h3>
      {!isLoadingVideo && isSuccessVideo && dataVideo.length < 1 ? (
        <div className="publish-empty">
          <EmptyBlock description={tDefault("noResultsFound")} />
        </div>
      ) : (
        <div className="blog-profile-preview__video">
          {!isLoadingVideo &&
            isSuccessVideo &&
            dataVideo.map(({ id, description, price, type_ex, url }) => {
              return (
                <div className="video-item" key={id}>
                  <div className="video-item-head">
                    <div className="player-wrapper">
                      <ReactPlayer
                        className="react-player"
                        controls
                        url={url}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  </div>
                  <div className="video-item-text">
                    <div className="video-item-text__desc">{description}</div>
                    <div className="video-item-text__footer">
                      <div className="video-item-text__footer-type">
                        {type_ex?.name}
                      </div>
                      <div className="video-item-text__footer-price">
                        {price} тг.
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <h3 className="title title-h3 blog-profile-preview__title-block">
        {tDefault("reviews")}
      </h3>
      <Button
        type={writeReview ? "default" : "primary"}
        className="blog-profile-preview__write-review"
        size="large"
        onClick={onClickWriteReview}
      >
        {writeReview ? (
          <>
            <CloseOutlined />
            {tForm("closeForm")}
          </>
        ) : (
          tDefault("writeReview")
        )}
      </Button>
      {writeReview && (
        <Form
          form={form}
          onFinish={onSubmitForm}
          name="validateOnly"
          layout="vertical"
          className="blog-profile-preview__form"
        >
          <Form.Item
            name="reviews"
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <TextArea
              rows={8}
              placeholder={tForm("placeholderLeaveFeedback")}
            />
          </Form.Item>
          <Form.Item
            name="stars"
            className="blog-profile-preview__stars"
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
            }}
            htmlType="submit"
          >
            {tForm("leaveFeedback")}
          </Button>
        </Form>
      )}
      {!isLoadingComments &&
      isSuccessComments &&
      dataComments?.results.length < 1 ? (
        <div className="publish-empty">
          <EmptyBlock description={tDefault("noResultsFound")} />
        </div>
      ) : (
        <div className="comments-list">
          {!isLoadingComments &&
            isSuccessComments &&
            dataComments?.results.map(
              ({ id, comments, created_at, stars, user }) => {
                return (
                  <div className="comments-item" key={id}>
                    <div className="comments-item__top">
                      <div className="comments-item__top-image">
                        <Image
                          src={user?.image ? user?.image : userFillLogo}
                          alt={user?.firstname}
                          width={54}
                          height={54}
                        />
                      </div>
                      <div className="comments-item__top-info">
                        <div className="comments-item__top-header">
                          <div className="comments-item__top-name">
                            {user?.firstname}
                          </div>
                          <Rate allowHalf disabled value={stars ? stars : 0} />
                        </div>
                        <div className="comments-item__top-date">
                          <RedableFormatExactly date={created_at} lng={lng} />
                        </div>
                      </div>
                    </div>
                    <div className="comments-item__bottom">
                      <div className="comments-item__bottom-text">
                        {comments}
                      </div>
                    </div>
                    {user?.id === session?.user?.id && (
                      <div
                        className="comments-item__delete"
                        onClick={() => showDrawerEdit(id)}
                      >
                        <DeleteFilled
                          style={{
                            color: "#ff4d4d",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              },
            )}
        </div>
      )}
      {contextHolder}
      <Modal
        title={tForm("deleteReview")}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={(_, {}) => (
          <>
            <Button onClick={() => handleCancel()}>{tForm("cancel")}</Button>
            <Button type="primary" onClick={() => handleDelete()}>
              {tForm("delete")}
            </Button>
          </>
        )}
      >
        <p>{tForm("deleteConfirmReview")}</p>
      </Modal>
    </>
  ) : (
    <Skeleton
      paragraph={{
        rows: 8,
      }}
    />
  );
};

export default BlogProfileInfo;
