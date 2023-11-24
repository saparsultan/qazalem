import { useTranslation } from "@/app/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SocialInfo from "@/components/client/Profile/SocialInfo";
export default async function ProfileSocial({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleSocialData")}
      </h2>
      <SocialInfo lng={lng} session={session} />
    </>
  );
}
