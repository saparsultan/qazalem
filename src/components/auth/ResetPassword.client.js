"use client";
import { useState } from "react";
import Link from "next/link";
import { App, Button, Form, Input, Result, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";
import AuthService from "@/services/AuthService";
import smsNotification from "@/assets/img/icons/sms-notification.svg";
import Image from "next/image";

const { Paragraph, Text } = Typography;

const ResetPasswordClient = ({ lng }) => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { t: tAuth } = useTranslation(lng, "auth");
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const [isSubmit, setIsSubmit] = useState(false);

  const { mutate: onSubmitForm, isLoading } = useMutation({
    mutationFn: async (values) => {
      await AuthService.resetPassword(values?.email);
    },
    onSuccess: async () => {
      await setIsSubmit(true);
      await form.setFieldsValue({
        email: "",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("errorResetPassword"),
        placement: "topRight",
      });
      console.error("Error reset password", error);
    },
  });

  return !isSubmit ? (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      onFinish={onSubmitForm}
    >
      <p
        style={{
          marginBottom: "1.5em",
        }}
      >
        {tAuth("resetPasswordInfo")}
      </p>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: tForm("rulesEmail"),
          },
        ]}
      >
        <Input placeholder={tForm("placeholderEmail")} size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginBottom: "8px" }}
        >
          {!isLoading ? tDefault("titleChangePassword") : ""}
        </Button>
        {tForm("or")}&nbsp;
        <Link href={`/${lng}/${LINK_URLS.login}`}>{tAuth("logIn")}</Link>
      </Form.Item>
    </Form>
  ) : (
    <Result
      icon={
        <Image
          src={smsNotification}
          alt="sms-notification"
          width={84}
          height={84}
        />
      }
      status="success"
      title={tAuth("checkEmail")}
      subTitle={tAuth("subTitleCheckEmail")}
    >
      <div className="result-desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            {tAuth("didntReceiveEmail")}
          </Text>
        </Paragraph>
        <Paragraph>
          {tAuth("retryDesc")}
          <br />
          <div
            className="result-desc__action"
            onClick={() => setIsSubmit(false)}
          >
            {tAuth("retry")}
          </div>
        </Paragraph>
      </div>
    </Result>
  );
};

export default ResetPasswordClient;
