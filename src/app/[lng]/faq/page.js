import { useTranslation } from "@/app/i18n";
import FaqClient from "@/components/client/Blogs/Faq.client";
export default async function AllFaq({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish faq__container">
      <div className="container">
        <div className="faq">
          <h2 className="title title-left text-low title-h2 publish__title">
            {t("titleInfoSupport")}
          </h2>
          <p className="publish__desc">{t("titleInfoSupportDesc")}</p>
          <FaqClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
