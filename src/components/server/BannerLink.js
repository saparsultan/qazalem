import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import banner from "@/assets/img/banner-link.jpg";
import { LINK_URLS } from "@/utils/constants";

const bannerStyle = {
  backgroundImage: `url("${banner.src}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default async function BannerLink({ lng }) {
  const { t } = await useTranslation(lng, "home");
  return (
    <section className="section banner-link__container">
      <div className="container">
        <div className="banner-link" style={bannerStyle}>
          <h3 className="title-banner banner-link__title ex-bold">
            {t("callCenterKazakhstan")}
          </h3>
          <Link
            href={`/${lng}/${LINK_URLS.callCenters}`}
            className="btn btn-link btn-prime banner-link__link"
          >
            {t("learnMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
