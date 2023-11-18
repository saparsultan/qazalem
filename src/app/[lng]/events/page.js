import { useTranslation } from "@/app/i18n";
import EventsClient from "@/components/client/Blogs/Events.client";

export default async function Events({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            {t("titleAnnounce")}
          </h2>
          <EventsClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
