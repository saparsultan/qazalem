import { useTranslation } from "@/app/i18n";
import RegisterGuide from "@/components/client/Profile/Guide/RegisterGuide";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfileGuide({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "layout");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("infoGuide")}
      </h2>
      <RegisterGuide lng={lng} session={session} />
    </>
  );
}
