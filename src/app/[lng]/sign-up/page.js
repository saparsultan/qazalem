import { ConfigProvider } from "antd";
import { useTranslation } from "@/app/i18n";
import theme from "@/theme/themeConfig";
import SignupClient from "@/components/auth/Signup.client";

export default async function SignUp({ params: { lng } }) {
  const { t } = await useTranslation(lng, "layout");
  return (
    <ConfigProvider theme={theme}>
      <section className="section signup__container">
        <div className="container">
          <div className="signup">
            <h2 className="title title-h2 signup__title">
              {t("registration")}
            </h2>
            <div className="form-signup">
              <SignupClient lng={lng} />
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
