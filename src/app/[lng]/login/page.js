import { ConfigProvider } from "antd";
import { useTranslation } from "@/app/i18n";
import theme from "@/theme/themeConfig";
import LoginClient from "@/components/auth/Login.client";

export default async function Login({ params: { lng } }) {
  const { t } = await useTranslation(lng, "auth");
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
                <LoginClient lng={lng} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
