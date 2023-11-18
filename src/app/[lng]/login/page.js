"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Alert, Button, ConfigProvider, Form, Input } from "antd";
import { useTranslation } from "@/app/i18n/client";
import theme from "@/theme/themeConfig";
import { LINK_URLS } from "@/utils/constants";

const Login = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "auth");
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tlayout } = useTranslation(lng, "layout");
  const router = useRouter();
  const [form] = Form.useForm();
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
          router.push(`/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`);
        }
        setLoading(false);
      })
      .catch((e) => {
        return setErrorMessage(true);
      });
  };

  return (
    <ConfigProvider theme={theme}>
      <section className="section login__container">
        <div className="container">
          <div className="login">
            <h2 className="title title-h2 login__title">
              {t("authorization")}
            </h2>
            <div className="form-login">
              <div className="container container-small">
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
                      <Input.Password
                        placeholder={tForm("placeholderEnterPassword")}
                      />
                    </Form.Item>
                    <div style={{ position: "absolute", top: "0", right: "0" }}>
                      <Link href={`/${lng}/${LINK_URLS.login}`}>
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
                    {tForm("or")}&nbsp;
                    <Link href={`/${lng}/${LINK_URLS.signUp}`}>
                      {tForm("register")}
                    </Link>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Login;
