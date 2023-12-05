import { useTranslation } from "@/app/i18n";
import AboutUsClient from "@/components/client/Information/AboutUs.client";

export default async function AboutUs({ params: { lng } }) {
  const { t } = await useTranslation(lng, "layout");
  return (
    <section className="section section--publish about__container">
      <div className="container container-content">
        <div className="about">
          <h2 className="title title-h2 about__title">{t("aboutPortal")}</h2>
          <div className="about-content">
            <AboutUsClient lng={lng} />
          </div>
        </div>
      </div>
    </section>
  );
}
