import { useTranslation } from "@/app/i18n";
import ResetPasswordClient from "@/components/auth/ResetPassword.client";

export default async function ResetPassword({ params: { lng } }) {
  const { t } = await useTranslation(lng, "auth");
  return (
    <section className="section reset-psw__container">
      <div className="container">
        <div className="reset-psw">
          <h2 className="title title-h2 reset-psw__title">
            {t("resetPassword")}
          </h2>
          <div className="container container-middle">
            <div className="form-reset-psw">
              <ResetPasswordClient lng={lng} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
