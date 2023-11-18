import { useTranslation } from "@/app/i18n";
import GuideClient from "@/components/client/Blogs/Guide.client";
export default async function Guide({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish guide__container">
      <div className="container">
        <div className="guide">
          <h2 className="title title-left text-low title-h2 guide__title">
            Список Гид-ов
            {/*{t("titleInfoSupport")}*/}
          </h2>
          <GuideClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
