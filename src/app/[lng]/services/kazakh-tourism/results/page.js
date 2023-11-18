import { useTranslation } from "@/app/i18n";
import BackLink from "@/components/client/BackLink";
import KazakhTourismResultsClient from "@/components/client/Services/KazakhTourismResults.client";

export default async function KazakhTourismResults({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish services-page__container services-page__container--form">
      <div className="container container-content">
        <div className="services-page">
          <div className="services-page__head">
            <BackLink lng={lng} small />
            <h2 className="title text-low title-left title-h2 services-page__title publish__title">
              {t("surveyResults")}
            </h2>
          </div>
          <KazakhTourismResultsClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
