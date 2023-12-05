"use client";
import React, { useState } from "react";
import Image from "next/image";
import { App, Button, Drawer, Modal, Space } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImageUploading from "react-images-uploading";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";
import GalleryList from "@/components/client/Profile/Volunteer/GalleryList";
import beforeUpload from "@/utils/beforeUpload";
import UploadImageIcon from "@/components/server/UploadImageIcon";
import defaultAvatar from "@/assets/img/default.png";

const FormGuideVideo = ({ lng, session }) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const [open, setOpen] = useState(false);
  const [openImageEdit, setOpenImageEdit] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarForm, setAvatarForm] = useState(null);
  const [imageId, setImageId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeAvatar = (imageList) => {
    if (imageList && imageList.length) {
      beforeUpload(message, imageList[0]?.file).then((res) => {
        if (res === true) {
          console.log({ imageList });
          setAvatar(imageList);
          const formData = new FormData();
          formData.append("image", imageList[0].file);
          setAvatarForm(formData.get("image"));
        }
      });
    }
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["volunteerGalleryList", session?.accessToken],
    queryFn: async () => {
      const { data } = await UserService.getMyProfileVolunteerGallery(
        session?.accessToken,
      );
      return data;
    },
  });

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async () => {
      const formData = {
        image: avatarForm,
      };
      await UserService.registerVolunteerGallery(
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["volunteerGalleryList"]);
      await message.success(tMessage("successAddImage"));
      await setAvatar(null);
    },
    onError: async (error) => {
      console.error("Error add volunteer gallery form", error);
      await message.error(tMessage("errorAddImage"));
    },
  });

  const { mutate: onUpdateForm } = useMutation({
    mutationFn: async () => {
      const formData = {
        image: avatarForm,
      };
      await UserService.updateVolunteerGallery(
        editImage?.id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["volunteerGalleryList"]);
      await message.success(tMessage("successUpdateImage"));
      await setAvatar(null);
      await setOpenImageEdit(false);
    },
    onError: async (error) => {
      console.error("Error update volunteer gallery form", error);
      await message.error(tMessage("errorUploadImage"));
    },
  });

  const { mutate: onDeleteForm } = useMutation({
    mutationFn: async (id) => {
      await UserService.deleteVolunteerGallery(id, session?.accessToken);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["volunteerGalleryList"]);
      await message.success(tMessage("successDeleteImage"));
      await setOpenImageEdit(false);
    },
    onError: async (error) => {
      console.error("Error delete volunteer gallery form", error);
      await message.error(tMessage("errorDeleteImage"));
    },
  });

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showDrawerEdit = (item) => {
    setEditImage(item);
    setOpenImageEdit(true);
  };
  const showDrawerDelete = async (id) => {
    await setImageId(id);
    await setIsModalOpen(true);
  };
  const onCloseEdit = () => {
    setOpenImageEdit(false);
  };

  const handleDelete = async () => {
    await onDeleteForm(imageId);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="profile-form">
        <GalleryList
          data={data}
          isLoading={isLoading}
          isSuccess={isSuccess}
          showDrawer={showDrawer}
          showDrawerEdit={showDrawerEdit}
          showDrawerDelete={showDrawerDelete}
          lng={lng}
        />
        <Drawer
          title={tDefault("addImage")}
          className="ant-form__drawer"
          width={500}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>{tForm("cancel")}</Button>
            </Space>
          }
        >
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: "flex",
            }}
          >
            <ImageUploading
              value={avatar}
              onChange={onChangeAvatar}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, isDragging, dragProps }) => {
                return (
                  <div
                    className="upload__image-wrapper"
                    style={isDragging ? { border: "1px solid red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {avatar && imageList?.length ? (
                      <div className="upload__image-item">
                        <Image
                          className="upload__image-src"
                          src={avatar[0]["data_url"]}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : (
                      <UploadImageIcon text={tForm("download")} />
                    )}
                  </div>
                );
              }}
            </ImageUploading>
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              onClick={onSubmitForm}
            >
              {tForm("add")}
            </Button>
          </Space>
        </Drawer>

        <Drawer
          title={tDefault("changeGallery")}
          className="ant-form__drawer"
          width={500}
          onClose={onCloseEdit}
          open={openImageEdit}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onCloseEdit}>{tForm("cancel")}</Button>
            </Space>
          }
        >
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: "flex",
            }}
          >
            <div className="profile-item__img gallery-edit__img">
              <ImageUploading
                value={avatar}
                onChange={onChangeAvatar}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, isDragging, dragProps }) => (
                  <>
                    <div
                      className="gallery-edit__img-upload"
                      style={
                        isDragging ? { border: "1px solid red" } : undefined
                      }
                    >
                      {avatar && imageList.length > 0 ? (
                        <div className="upload__image-item">
                          <Image
                            priority
                            className="upload__image-src"
                            quality={75}
                            sizes="(max-width: 768px) 100vw"
                            src={imageList[0] && imageList[0]["data_url"]}
                            alt="Gallery uload image"
                            width={100}
                            height={100}
                          />
                        </div>
                      ) : (
                        <div className="upload__image-item">
                          <Image
                            priority
                            className="upload__image-src"
                            quality={75}
                            sizes="(max-width: 768px) 100vw"
                            src={
                              session?.user ? editImage?.image : defaultAvatar
                            }
                            alt="Gallery image"
                            width={100}
                            height={100}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className="profile-item__edit"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      {`${tForm("change")}`}
                    </div>
                  </>
                )}
              </ImageUploading>
            </div>
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              onClick={onUpdateForm}
            >
              {tForm("save")}
            </Button>
          </Space>
        </Drawer>
      </div>
      <Modal
        title={tForm("deleteImage")}
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
        <p>{tForm("deleteConfirmImage")}</p>
      </Modal>
    </>
  );
};

export default FormGuideVideo;
