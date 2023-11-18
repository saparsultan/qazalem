import { useTranslation } from "@/app/i18n";
import SocialInfo from "@/components/client/Profile/SocialInfo";
export default async function ProfileSocial({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleSocialData")}
      </h2>
      <SocialInfo lng={lng} />
    </>
  );
}
