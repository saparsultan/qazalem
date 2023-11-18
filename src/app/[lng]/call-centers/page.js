import { useTranslation } from "@/app/i18n";
import CallCentersClient from "@/components/client/Information/CallCenters.client";

export default async function CallCenters({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish call__container">
      <div className="container">
        <div className="call">
          <h2 className="title text-low title-h2 call__title">
            {t("titleCallCenter")}
          </h2>
          <CallCentersClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
