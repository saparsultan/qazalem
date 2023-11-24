import { useTranslation } from "@/app/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PersonalInfo from "@/components/client/Profile/PersonalInfo";

export default async function ProfilePersonal({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titlePersonalData")}
      </h2>
      <PersonalInfo lng={lng} session={session} />
    </>
  );
}
