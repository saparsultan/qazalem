import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { useTranslation } from "@/app/i18n";
import HelpClient from "@/components/client/Information/Help.client";

export default async function HelpPage({ params: { lng } }) {
  const { t } = await useTranslation(lng, "home");
  return (
    <ConfigProvider theme={theme}>
      <section className="section under-header help__container">
        <div className="container">
          <div className="help">
            <h2 className="title title-h2 help__title">{t("help")}</h2>
            <p className="help__desc">
              {t("helpDescLabel")}
              <br />
              {t("helpDesc")}
            </p>
            <div className="form-help">
              <div className="container container-small">
                <HelpClient lng={lng} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
