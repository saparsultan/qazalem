import { useTranslation } from "@/app/i18n";
import RegisterGuide from "@/components/client/Profile/Guide/RegisterGuide";

export default async function ProfileRegisterGuide({ params: { lng } }) {
  const { t } = await useTranslation(lng, "layout");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("registerGuide")}
      </h2>
      <RegisterGuide lng={lng} />
    </>
  );
}
