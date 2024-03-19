import {useTranslation} from "@/app/i18n";
import KazakhInvestClient from "@/components/client/Services/KazakhInvest.client";
import BackLink from "@/components/client/BackLink";
export default async function KazakhInvest({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish services-page__container">
      <div className="container">
        <div className="services-page">
          <div className="services-page__head">
            <BackLink lng={lng} small />
            <h2 className="title text-low title-h2 services-page__title">
              {t('kazakhInvest')}
            </h2>
          </div>
          <KazakhInvestClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
