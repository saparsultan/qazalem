import { useTranslation } from "@/app/i18n";
import VolunteerClient from "@/components/client/Blogs/Volunteer.client";

export default async function Guide({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish guide__container">
      <div className="container">
        <div className="guide">
          <h2 className="title title-left text-low title-h2 guide__title">
            {t("listVolunteer")}
          </h2>
          <VolunteerClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
