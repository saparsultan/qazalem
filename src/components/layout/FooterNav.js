import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { LINK_URLS } from "@/utils/constants";

export default async function FooterNav({ lng }) {
  const { t } = await useTranslation(lng, "layout");
  return (
    <ul className="list-reset footer-item__list">
      <li className="footer-item__item">
        <Link href={`/${lng}/${LINK_URLS.about}`} className="footer-item__link">
          {t("aboutPortal")}
        </Link>
      </li>
      <li className="footer-item__item">
        <Link
          href={`/${lng}#${LINK_URLS.services}`}
          className="footer-item__link"
        >
          {t("services")}
        </Link>
      </li>
      <li className="footer-item__item">
        <Link href={`/${lng}/${LINK_URLS.news}`} className="footer-item__link">
          {t("news")}
        </Link>
      </li>
      <li className="footer-item__item">
        <Link
          href={`/${lng}/${LINK_URLS.interview}`}
          className="footer-item__link"
        >
          {t("interview")}
        </Link>
      </li>
      <li className="footer-item__item">
        <Link href={`/${lng}/${LINK_URLS.faq}`} className="footer-item__link">
          {t("bloodRelativeSupport")}
        </Link>
      </li>
    </ul>
  );
}
