import { useTranslation } from "@/app/i18n";
import RegionsClient from "@/components/client/Information/Regions.client";

export default async function AboutKazakhstan({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish about-country__container">
      <div className="container">
        <div className="about-country">
          <h2 className="title title-h2">{t("regions")}</h2>
          <RegionsClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
