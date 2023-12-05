import { useTranslation } from "@/app/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterVolunteer from "@/components/client/Profile/Volunteer/RegisterVolunteer";

export default async function ProfileRegisterVolunteer({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "layout");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("registerVolunteer")}
      </h2>
      <RegisterVolunteer lng={lng} session={session} />
    </>
  );
}
