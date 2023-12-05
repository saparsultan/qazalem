import { useTranslation } from "@/app/i18n";
import InterviewClient from "@/components/client/Blogs/Interview.client";

export default async function Interview({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 publish__title">
            {t("interview")}
          </h2>
          <p className="publish__desc">{t("interviewDesc")}</p>
          <InterviewClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
