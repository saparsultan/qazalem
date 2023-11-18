import { useTranslation } from "@/app/i18n";
import MainInfo from "@/components/client/Profile/MainInfo";

export default async function ProfileMain({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleMainData")}
      </h2>
      <MainInfo lng={lng} />
    </>
  );
}
