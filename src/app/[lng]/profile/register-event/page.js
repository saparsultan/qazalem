import { useTranslation } from "@/app/i18n";
import RegisterEvent from "@/components/client/Profile/RegisterEvent";

export default async function ProfileRegisterEvent({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleRegisterEventReverse")}
      </h2>
      <RegisterEvent lng={lng} />
    </>
  );
}
