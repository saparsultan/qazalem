import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, App, Button, Form, Input, Skeleton } from "antd";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const FormGuide = ({ lng, setInfoGuide }) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["guideDescription", session?.accessToken],
    queryFn: async () => {
      const { data } = await UserService.getDescriptionGuide(
        session?.accessToken,
      );
      const dataInfo = {
        view: data?.count_view,
        stars: data?.stars,
        comments: data?.comments_count,
      };
      setInfoGuide(dataInfo);
      return data;
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      descriptionFilledKz: data?.description_kk,
      descriptionFilledRu: data?.description_ru,
      descriptionFilledEn: data?.description_en,
      descriptionFilledCn: data?.description_cn,
    });
  }, [isLoading, isSuccess]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        description_kk:
          values.descriptionKz !== null &&
          values.descriptionKz !== undefined &&
          values.descriptionKz,
        description_en:
          values.descriptionEn !== null && values.descriptionEn !== undefined
            ? values.descriptionEn
            : "",
        description_ru:
          values.descriptionRu !== null &&
          values.descriptionRu !== undefined &&
          values.descriptionRu,
        description_cn:
          values.descriptionCn !== null && values.descriptionCn !== undefined
            ? values.descriptionCn
            : "",
      };
      await UserService.registerGuide(session?.accessToken, formData);
    },
    onSuccess: async () => {
      await message.success(tMessage("registerSuccessGuide"));
      await form.setFieldsValue({
        descriptionKz: "",
        descriptionEn: "",
        descriptionRu: "",
        descriptionCn: "",
      });
    },
    onError: async (error) => {
      console.error("Error register guide form", error);
      if (error.response.status === 400) {
        await message.error(tMessage("errorFilledProfile"));
      } else {
        await message.error(tMessage("registerError"));
      }
    },
  });

  const { mutate: onUpdateForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        description_kk: value?.descriptionFilledKz,
        description_ru: value?.descriptionFilledRu,
        description_en: value?.descriptionFilledEn,
        description_cn: value?.descriptionFilledCn,
      };
      await UserService.updateDescriptionGuide(
        session?.user?.guide_id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["guideDescription"]);
      await notification.success({
        message: tMessage("success"),
        description: tMessage("updateProfileSuccess"),
        placement: "topRight",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("updateProfileError"),
        placement: "topRight",
      });
      console.error("Error update additional info", error);
    },
  });

  return (
    <div className="profile-form">
      {!session?.user ? (
        <Skeleton />
      ) : session?.user?.guide_id ? (
        <Form
          form={form}
          name="validateOnlyGuide"
          layout="vertical"
          onFinish={onUpdateForm}
        >
          <Form.Item
            name="descriptionFilledKz"
            label={tForm("descriptionKz")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionFilledRu"
            label={tForm("descriptionRu")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionFilledEn"
            label={tForm("descriptionEn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="descriptionFilledCn"
            label={tForm("descriptionCn")}
            rules={[
              {
                required: true,
                message: tForm("requiredField"),
              },
            ]}
          >
            <Input.TextArea rows={4} />
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
      ) : (
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          onFinish={onSubmitForm}
        >
          {!session?.user?.guide_id && (
            <Alert
              className="ant-form__alert-info"
              message={`${tMessage("attention")}!`}
              description={tMessage("attentionDescGuide")}
              type="warning"
              showIcon
            />
          )}
          <Form.Item
            name="descriptionKz"
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
            name="descriptionRu"
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
            name="descriptionEn"
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
            name="descriptionCn"
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
            {tForm("sendRequest")}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default FormGuide;
