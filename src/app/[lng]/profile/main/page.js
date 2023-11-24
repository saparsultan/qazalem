import { useTranslation } from "@/app/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MainInfo from "@/components/client/Profile/MainInfo";

export default async function ProfileMain({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleMainData")}
      </h2>
      <MainInfo lng={lng} session={session} />
    </>
  );
}
