import AdditionalInfo from "@/components/client/Profile/AdditionalInfo";
import { useTranslation } from "@/app/i18n";

export default async function ProfileAdditional({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleAdditionalData")}
      </h2>
      <AdditionalInfo lng={lng} />
    </>
  );
}
