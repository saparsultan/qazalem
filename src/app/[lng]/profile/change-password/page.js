import { useTranslation } from "@/app/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChangePassword from "@/components/client/Profile/ChangePassword";

export default async function ProfileChangePassword({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("security")}
      </h2>
      <ChangePassword lng={lng} session={session} />
    </>
  );
}
