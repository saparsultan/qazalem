import { useTranslation } from "@/app/i18n";
import NewsOriginCountryClient from "@/components/client/Blogs/NewsOriginCountry.client";

export default async function NewsOriginCountry({ params: { lng } }) {
  const { t } = await useTranslation(lng, "home");
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            {t("newsKazakhstan")}
          </h2>
          <NewsOriginCountryClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
