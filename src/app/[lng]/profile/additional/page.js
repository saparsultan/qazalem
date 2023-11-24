import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useTranslation } from "@/app/i18n";
import AdditionalInfo from "@/components/client/Profile/AdditionalInfo";

export default async function ProfileAdditional({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "default");
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        {t("titleAdditionalData")}
      </h2>
      <AdditionalInfo lng={lng} session={session} />
    </>
  );
}
