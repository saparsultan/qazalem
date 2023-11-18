"use client";
import { useSession } from "next-auth/react";
import { App, Button, Form, Input, Skeleton } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const ChangePassword = ({ lng }) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        old_password:
          values.changePassword !== null && values.changePassword !== undefined
            ? values.changePassword
            : "",
        new_password:
          values.newPassword !== null && values.newPassword !== undefined
            ? values.newPassword
            : "",
      };
      const sessionId =
        session && session?.user && session?.user?.id ? session?.user?.id : "";
      await UserService.updatePassword(
        sessionId,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await notification.success({
        message: tMessage("success"),
        description: tMessage("successChangePassword"),
        placement: "topRight",
      });
      await form.setFieldsValue({
        changePassword: "",
        newPassword: "",
        confirm: "",
      });
    },
    onError: async (error) => {
      console.log("Error change password", error);
      if (error.response.status === 400) {
        await notification.error({
          message: tMessage("error"),
          description: tMessage("errorCurrentPassword"),
          placement: "topRight",
        });
      } else if (error.response.status === 403) {
        await notification.error({
          message: tMessage("error"),
          description: tMessage("errorAnotherPassword"),
          placement: "topRight",
        });
      } else {
        await notification.error({
          message: tMessage("error"),
          description: tMessage("errorChangePassword"),
          placement: "topRight",
        });
      }
    },
  });

  return (
    <div className="profile-form">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onSubmitForm}
      >
        {!session?.user && status === "unauthenticated" ? (
          <Skeleton
            paragraph={{
              rows: 8,
            }}
          />
        ) : (
          <>
            <Form.Item
              label={tForm("labelCurrentPassword")}
              name="changePassword"
              rules={[
                {
                  required: true,
                  message: tForm("requiredField"),
                },
              ]}
            >
              <Input.Password
                autoComplete="off"
                placeholder={tForm("placeholderEnterPassword")}
              />
            </Form.Item>
            <Form.Item
              label={tForm("labelNewPassword")}
              name="newPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: tForm("requiredField"),
                },
                {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message: tForm("rulesCheckTryPassword"),
                },
              ]}
            >
              <Input.Password
                autoComplete="off"
                placeholder={tForm("placeholderEnterPassword")}
              />
            </Form.Item>

            <Form.Item
              label={tForm("labelNewConfirmPassword")}
              name="confirm"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: tForm("rulesEnterConfirmPassword"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(tForm("passwordDontMatch")),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={tForm("placeholderEnterConfirmPassword")}
              />
            </Form.Item>
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              htmlType="submit"
            >
              {tForm("change")}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default ChangePassword;
