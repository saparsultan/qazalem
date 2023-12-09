import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Skeleton,
  Space,
  Tabs,
} from "antd";
import {
  DeleteFilled,
  EditTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const FormEducationName = ({ lng }) => {
  const { data: session } = useSession();
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [educationId, setEducationId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["myVolunteerEducationName", session?.accessToken],
    queryFn: async () => {
      const { data } = await UserService.getVolunteerEducationName(
        session?.accessToken,
      );
      return data;
    },
  });

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        nameFilledKz: editData?.name_kk,
        nameFilledRu: editData?.name_ru,
        nameFilledEn: editData?.name_en,
        nameFilledCn: editData?.name_cn,
      });
    }
  }, [editData, form]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        name_kk: values.nameKz,
        name_en: values.nameEn,
        name_ru: values.nameRu,
        name_cn: values.nameCn,
      };
      await UserService.createVolunteerEducationName(
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["myVolunteerEducationName"]);
      await message.success(tMessage("successAddEducationName"));
      await form.setFieldsValue({
        nameKz: "",
        nameEn: "",
        nameRu: "",
        nameCn: "",
      });
    },
    onError: async (error) => {
      console.error("Error create volunteer education name", error);
      if (error.response.status === 400) {
        await message.error(tMessage("errorAddEducationName"));
      } else {
        await message.error(tMessage("registerError"));
      }
    },
  });

  const { mutate: onUpdateForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        name_kk: value?.nameFilledKz,
        name_ru: value?.nameFilledRu,
        name_en: value?.nameFilledEn,
        name_cn: value?.nameFilledCn,
      };
      await UserService.updateVolunteerEducationName(
        editData?.id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["myVolunteerEducationName"]);
      await message.success(tMessage("successUpdateEducationName"));
    },
    onError: async (error) => {
      console.error("Error update volunteer education name", error);
      await message.error(tMessage("errorUpdateEducationName"));
    },
  });

  const { mutate: onDeleteForm } = useMutation({
    mutationFn: async (id) => {
      await UserService.deleteVolunteerEducationName(id, session?.accessToken);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["myVolunteerEducationName"]);
      await message.success(tMessage("successDeleteEducationName"));
    },
    onError: async (error) => {
      console.error("Error delete volunteer education name", error);
      await message.error(tMessage("errorDeleteEducationName"));
    },
  });

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showDrawerEdit = (item) => {
    setEditData(item);
    setOpenEdit(true);
  };
  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const showDrawerDelete = async (id) => {
    await setEducationId(id);
    await setIsModalOpen(true);
  };

  const handleDelete = async () => {
    await onDeleteForm(educationId);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="profile-form">
        {!session?.user ? (
          <Skeleton />
        ) : (
          <>
            <div className="video-item-add" onClick={() => showDrawer()}>
              <div className="video-item-add__btn">
                <PlusCircleTwoTone twoToneColor="#e3871c" />
                <div className="video-item-add__text">
                  {tDefault("addEducationName")}
                </div>
              </div>
            </div>
            <div className="profile-text-list">
              {!isLoading &&
                isSuccess &&
                data.map((item) => {
                  return (
                    <div className="profile-text-item" key={item?.id}>
                      <Tabs
                        rootClassName="video-item-tab"
                        defaultActiveKey="1"
                        items={[
                          {
                            key: "1",
                            label: "Kz",
                            children: item?.name_kk,
                          },
                          {
                            key: "2",
                            label: "Ru",
                            children: item?.name_ru,
                          },
                          {
                            key: "3",
                            label: "En",
                            children: item?.name_en,
                          },
                          {
                            key: "4",
                            label: "Cn",
                            children: item?.name_cn,
                          },
                        ]}
                      />
                      <div
                        className="video-item-edit"
                        onClick={() => showDrawerEdit(item)}
                      >
                        <EditTwoTone />
                      </div>
                      <div
                        className="comments-item__delete video-item-delete"
                        onClick={() => showDrawerDelete(item?.id)}
                      >
                        <DeleteFilled
                          style={{
                            color: "#ff4d4d",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
        <Drawer
          title={tDefault("addEducationName")}
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
              <Button onClick={onCloseEdit}>{tForm("cancel")}</Button>
            </Space>
          }
        >
          <Form
            form={form}
            name="validateOnlyEducationName"
            layout="vertical"
            onFinish={onSubmitForm}
          >
            <Form.Item
              name="nameKz"
              label={tForm("nameKz")}
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
              name="nameRu"
              label={tForm("nameRu")}
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
              name="nameEn"
              label={tForm("nameEn")}
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
              name="nameCn"
              label={tForm("nameCn")}
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
          title={tDefault("changeEducationName")}
          className="ant-form__drawer"
          width={500}
          onClose={onCloseEdit}
          open={openEdit}
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
            name="validateOnlyUpdateEducationName"
            layout="vertical"
            onFinish={onUpdateForm}
          >
            <Form.Item
              name="nameFilledKz"
              label={tForm("nameKz")}
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
              name="nameFilledRu"
              label={tForm("nameRu")}
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
              name="nameFilledEn"
              label={tForm("nameEn")}
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
              name="nameFilledCn"
              label={tForm("nameCn")}
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
      <Modal
        title={tForm("deleteEducationName")}
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
        <p>{tForm("deleteConfirmEducationName")}</p>
      </Modal>
    </>
  );
};

export default FormEducationName;
