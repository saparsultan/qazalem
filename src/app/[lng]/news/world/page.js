import { useTranslation } from "@/app/i18n";
import NewsWorldClient from "@/components/client/Blogs/NewsWorld.client";

export default async function NewsWorld({ params: { lng } }) {
  const { t } = await useTranslation(lng, "home");
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            {t("worldEvents")}
          </h2>
          <NewsWorldClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
