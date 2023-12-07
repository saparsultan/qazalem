"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Alert, Button, Form, Input } from "antd";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";

const LoginClient = ({ lng }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tlayout } = useTranslation(lng, "layout");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmitAuth = async (values) => {
    setLoading(true);
    signIn("credentials", {
      username: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    })
      .then((res) => {
        if (res?.error) {
          console.error("Error login", res);
          setErrorMessage(true);
        } else {
          setErrorMessage(false);
          router.push(
            `/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`,
            undefined,
            { shallow: false },
          );
          router.refresh();
        }
        setLoading(false);
      })
      .catch((e) => {
        return setErrorMessage(true);
      });
  };
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      onFinish={onSubmitAuth}
    >
      {errorMessage && (
        <Alert
          message={tForm("invalidAuth")}
          type="error"
          showIcon
          style={{
            marginBottom: "1.5em",
          }}
        />
      )}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: tForm("rulesEmail"),
          },
          {
            required: true,
            message: tForm("requiredField"),
          },
        ]}
      >
        <Input placeholder={tForm("placeholderEmail")} />
      </Form.Item>
      <Form.Item>
        <Form.Item
          label={tForm("password")}
          name="password"
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
          style={{ marginBottom: "0px" }}
        >
          <Input.Password placeholder={tForm("placeholderEnterPassword")} />
        </Form.Item>
        <div
          style={{ position: "absolute", top: "0", right: "0" }}
          className="login-form__text-info"
        >
          <Link href={`/${lng}/${LINK_URLS.resetPassword}`}>
            {tForm("forgotPassword")}
          </Link>
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          size="middle"
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginBottom: "8px" }}
        >
          {!loading ? tlayout("login") : ""}
        </Button>
        <div className="login-form__text-info">
          {tForm("or")}&nbsp;
          <Link href={`/${lng}/${LINK_URLS.signUp}`}>{tForm("register")}</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginClient;
