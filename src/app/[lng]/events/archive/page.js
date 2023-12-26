import { useTranslation } from "@/app/i18n";
import EventsClient from "@/components/client/Blogs/Events.client";

export default async function EventsArchive({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            {t("titleArchiveAnnounce")}
          </h2>
          <EventsClient lng={lng} archive={true} />
        </div>
      </div>
    </section>
  );
}
