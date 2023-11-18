import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { ALEM_META } from "@/utils/constants";
import banner from "@/assets/img/banner.jpg";

const bannerStyle = {
  backgroundImage: `url("${banner.src}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default async function BannerBlock({ lng }) {
  const { t } = await useTranslation(lng, "home");
  return (
    <section className="section section--full banner__container">
      <div className="container container--banner">
        <div className="banner" style={bannerStyle}>
          <span className="banner__label bold">QAZALEM</span>
          <h3 className="banner__title bold">
            <div dangerouslySetInnerHTML={{ __html: t("virtualOffice") }} />
          </h3>
          <div className="banner__desc">{t("virtualOfficeDesc")}</div>
          <Link
            href={ALEM_META}
            target="_blank"
            className="btn btn-link btn-dark"
          >
            {t("virtualOfficeLink")}
          </Link>
        </div>
      </div>
      <div className="banner__background"></div>
    </section>
  );
}
