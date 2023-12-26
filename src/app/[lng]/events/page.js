import { useTranslation } from "@/app/i18n";
import EventsClient from "@/components/client/Blogs/Events.client";
import Link from "next/link";
import { LINK_URLS } from "@/utils/constants";

export default async function Events({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <div className="news-world__head">
            <h2 className="title title-left text-low title-h2 news-world__title">
              {t("titleAnnounce")}
            </h2>
            <Link
              href={`/${lng}/${LINK_URLS.events}/archive`}
              className="news-world__subtitle"
            >
              {t("titleArchiveAnnounce")}
            </Link>
          </div>
          <EventsClient lng={lng} archive={false} />
        </div>
      </div>
    </section>
  );
}
