"use client";
import {
  App,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";
import React, { useEffect, useState } from "react";
import GuideVideoList from "@/components/client/Profile/Guide/GuideVideoList";

const FormGuideVideo = ({ lng }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openVideoEdit, setOpenVideoEdit] = useState(false);
  const [editVideoData, setEditVideoData] = useState(null);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["guideVideoList", session?.accessToken],
    queryFn: async () => {
      const { data } = await UserService.getProfileGuideVideo(
        session?.accessToken,
      );
      return data;
    },
  });

  const {
    data: dataTypeEx,
    isLoading: isLoadingTypeEx,
    isSuccess: isSuccessTypeEx,
  } = useQuery({
    queryKey: ["guideTypeEx"],
    queryFn: async () => {
      const { data } = await UserService.getSelectGuideTypeEx(lng);
      return data;
    },
  });

  console.log({ dataTypeEx });

  useEffect(() => {
    form.setFieldsValue({
      urlEdit: editVideoData?.url,
      typeExEdit: editVideoData?.type_ex,
      priceEdit: editVideoData?.price,
      descriptionVideoKzEdit: editVideoData?.description_kk,
      descriptionVideoRuEdit: editVideoData?.description_ru,
      descriptionVideoEnEdit: editVideoData?.description_en,
      descriptionVideoCnEdit: editVideoData?.description_cn,
    });
  }, [editVideoData, form]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        url: values.url !== null && values.url !== undefined && values.url,
        type_ex:
          values.typeEx !== null && values.typeEx !== undefined
            ? values.typeEx
            : "",
        price:
          values.price !== null && values.price !== undefined && values.price,
        description_kk:
          values.descriptionVideoKz !== null &&
          values.descriptionVideoKz !== undefined
            ? values.descriptionVideoKz
            : "",
        description_ru:
          values.descriptionVideoRu !== null &&
          values.descriptionVideoRu !== undefined
            ? values.descriptionVideoRu
            : "",
        description_en:
          values.descriptionVideoEn !== null &&
          values.descriptionVideoEn !== undefined
            ? values.descriptionVideoEn
            : "",
        description_cn:
          values.descriptionVideoCn !== null &&
          values.descriptionVideoCn !== undefined
            ? values.descriptionVideoCn
            : "",
      };
      await UserService.registerGuideVideo(session?.accessToken, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["guideVideoList"]);
      await message.success(tMessage("successAddSuggestion"));
      await form.setFieldsValue({
        url: "",
        typeEx: "",
        price: "",
        descriptionVideoKz: "",
        descriptionVideoRu: "",
        descriptionVideoEn: "",
        descriptionVideoCn: "",
      });
    },
    onError: async (error) => {
      console.error("Error add guide video form", error);
      await message.error(tMessage("errorAddSuggestion"));
    },
  });

  const { mutate: onUpdateForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        url:
          values.urlEdit !== null &&
          values.urlEdit !== undefined &&
          values.urlEdit,
        type_ex:
          values.typeExEdit !== null && values.typeExEdit !== undefined
            ? values.typeExEdit
            : "",
        price:
          values.priceEdit !== null &&
          values.priceEdit !== undefined &&
          values.priceEdit,
        description_kk:
          values.descriptionVideoKzEdit !== null &&
          values.descriptionVideoKzEdit !== undefined
            ? values.descriptionVideoKzEdit
            : "",
        description_ru:
          values.descriptionVideoRuEdit !== null &&
          values.descriptionVideoRuEdit !== undefined
            ? values.descriptionVideoRuEdit
            : "",
        description_en:
          values.descriptionVideoEnEdit !== null &&
          values.descriptionVideoEnEdit !== undefined
            ? values.descriptionVideoEnEdit
            : "",
        description_cn:
          values.descriptionVideoCnEdit !== null &&
          values.descriptionVideoCnEdit !== undefined
            ? values.descriptionVideoCnEdit
            : "",
      };
      await UserService.updateProfileGuideVideo(
        editVideoData?.id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["guideVideoList"]);
      await message.success(tMessage("successUpdateSuggestion"));
      await form.setFieldsValue({
        urlEdit: "",
        typeExEdit: "",
        priceEdit: "",
        descriptionVideoKzEdit: "",
        descriptionVideoRuEdit: "",
        descriptionVideoEnEdit: "",
        descriptionVideoCnEdit: "",
      });
      await setOpenVideoEdit(false);
    },
    onError: async (error) => {
      console.error("Error update guide video form", error);
      await message.error(tMessage("errorAddSuggestion"));
    },
  });

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showDrawerEdit = (item) => {
    setEditVideoData(item);
    setOpenVideoEdit(true);
  };
  const onCloseEdit = () => {
    setOpenVideoEdit(false);
  };

  console.log("data data data", data);

  return (
    <div className="profile-form">
      <GuideVideoList
        data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        showDrawer={showDrawer}
        showDrawerEdit={showDrawerEdit}
        lng={lng}
      />
      <Drawer
        title={tDefault("addSuggestion")}
        width={720}
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
        <Form
          form={form}
          name="validateOnlyVideo"
          layout="vertical"
          onFinish={onSubmitForm}
        >
          <Form.Item
            name="url"
            label={tForm("videoLink")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input addonBefore="https://" addonAfter="" />
          </Form.Item>
          <div className="form-row">
            <div className="form-item">
              <Form.Item
                name="typeEx"
                label={tForm("priceForWhat")}
                rules={[
                  {
                    required: true,
                    message: tForm("requiredField"),
                  },
                ]}
              >
                <Select
                  placeholder={tForm("choosePriceForWhat")}
                  allowClear
                  options={
                    !isLoadingTypeEx &&
                    isSuccessTypeEx &&
                    dataTypeEx?.length &&
                    dataTypeEx.map(({ id, name }) => {
                      return {
                        value: id,
                        label: name,
                      };
                    })
                  }
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <Form.Item
                name="price"
                label={tForm("price")}
                rules={[
                  {
                    required: true,
                    message: tForm("requiredField"),
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="descriptionVideoKz"
            label={tForm("descriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="descriptionVideoRu"
            label={tForm("descriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="descriptionVideoEn"
            label={tForm("descriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="descriptionVideoCn"
            label={tForm("descriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
            }}
            htmlType="submit"
          >
            {tForm("add")}
          </Button>
        </Form>
      </Drawer>

      <Drawer
        title={tDefault("changeSuggestion")}
        width={720}
        onClose={onCloseEdit}
        open={openVideoEdit}
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
        <Form
          form={form}
          name="validateOnlyEditVideo"
          layout="vertical"
          onFinish={onUpdateForm}
        >
          <Form.Item
            name="urlEdit"
            label={tForm("videoLink")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input addonBefore="https://" addonAfter="" />
          </Form.Item>
          <div className="form-row">
            <div className="form-item">
              <Form.Item
                name="typeExEdit"
                label={tForm("priceForWhat")}
                rules={[
                  {
                    required: true,
                    message: tForm("requiredField"),
                  },
                ]}
              >
                <Select
                  placeholder={tForm("choosePriceForWhat")}
                  allowClear
                  options={
                    !isLoadingTypeEx &&
                    isSuccessTypeEx &&
                    dataTypeEx?.length &&
                    dataTypeEx.map(({ id, name }) => {
                      return {
                        value: id,
                        label: name,
                      };
                    })
                  }
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <Form.Item
                name="priceEdit"
                label={tForm("price")}
                rules={[
                  {
                    required: true,
                    message: tForm("requiredField"),
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="descriptionVideoKzEdit"
            label={tForm("descriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="descriptionVideoRuEdit"
            label={tForm("descriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="descriptionVideoEnEdit"
            label={tForm("descriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="descriptionVideoCnEdit"
            label={tForm("descriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
            }}
            htmlType="submit"
          >
            {tForm("save")}
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default FormGuideVideo;
