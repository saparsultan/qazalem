"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";

export default function Nav({ lng }) {
  const { t } = useTranslation(lng, "layout");
  const pathname = usePathname();
  const defaultLink = "nav__link";
  const activeLink = "nav__link active";
  return (
    <nav className="header-nav nav">
      <Link
        href={`/${lng}/${LINK_URLS.about}`}
        className={
          pathname === `/${lng}/${LINK_URLS.about}` ? activeLink : defaultLink
        }
      >
        {t("aboutPortal")}
      </Link>
      <Link
        href={`/${lng}#${LINK_URLS.services}`}
        className={pathname === `/${lng}}` ? activeLink : defaultLink}
      >
        {t("services")}
      </Link>
      <Link
        href={`/${lng}/${LINK_URLS.news}`}
        className={
          pathname === `/${lng}/${LINK_URLS.news}` ? activeLink : defaultLink
        }
      >
        {t("news")}
      </Link>
      <Link
        href={`/${lng}/${LINK_URLS.interview}`}
        className={
          pathname === `/${lng}/${LINK_URLS.interview}`
            ? activeLink
            : defaultLink
        }
      >
        {t("interview")}
      </Link>
      <Link
        href={`/${lng}/${LINK_URLS.faq}`}
        className={
          pathname === `/${lng}/${LINK_URLS.faq}` ? activeLink : defaultLink
        }
      >
        {t("bloodRelativeSupport")}
      </Link>
    </nav>
  );
}
