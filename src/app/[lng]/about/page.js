import { useTranslation } from "@/app/i18n";
import AboutUsClient from "@/components/client/Information/AboutUs.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AboutUs({ params: { lng } }) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "layout");
  console.log("session session session", session);
  return (
    <section className="section section--publish about__container">
      <div className="container container-content">
        <div className="about">
          <h2 className="title title-h2 about__title">{t("aboutPortal")}</h2>
          <div className="about-content">
            <AboutUsClient lng={lng} />
          </div>
        </div>
      </div>
    </section>
  );
}
