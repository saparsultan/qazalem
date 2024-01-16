import { useTranslation } from "@/app/i18n";
import BackLink from "@/components/client/BackLink";
import QazTradeClient from "@/components/client/Services/QazTrade.client";
export default async function QazTrade({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish services-page__container">
      <div className="container">
        <div className="services-page">
          <div className="services-page__head">
            <BackLink lng={lng} small />
            <h2 className="title text-low title-h2 services-page__title">
              {t("exportProducts")}
            </h2>
          </div>
          <QazTradeClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
