"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";
import logoPrimaryIcon from "@/assets/img/logo-primary.png";
import Social from "@/components/layout/Social";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";

const MobileMenu = ({ lng, showMenu, setShowMenu }) => {
  const { t } = useTranslation(lng, "layout");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const socilalList = useQuery({
    queryKey: ["socialListHeader"],
    queryFn: async () => {
      const { data } = await HomeService.getSocial(null);
      return data;
    },
  });

  return (
    <div
      className={cx("mobile-menu", {
        active: showMenu,
      })}
    >
      <div className="mobile-menu-content">
        <div className="mobile-menu-content__header">
          <Link href={`/${lng}`} className="header-logo logo">
            <div className="logo__icon">
              <Image src={logoPrimaryIcon} alt="logo" />
            </div>
            <div className="logo__text">QazAlem</div>
          </Link>
          <div
            className="mobile-menu-content__close"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9744 13.723L8.07441 18.623C7.89108 18.8064 7.65775 18.898 7.37441 18.898C7.09108 18.898 6.85775 18.8064 6.67441 18.623C6.49108 18.4397 6.39941 18.2064 6.39941 17.923C6.39941 17.6397 6.49108 17.4064 6.67441 17.223L11.5744 12.323L6.67441 7.42305C6.49108 7.23971 6.39941 7.00638 6.39941 6.72305C6.39941 6.43971 6.49108 6.20638 6.67441 6.02305C6.85775 5.83971 7.09108 5.74805 7.37441 5.74805C7.65775 5.74805 7.89108 5.83971 8.07441 6.02305L12.9744 10.923L17.8744 6.02305C18.0577 5.83971 18.2911 5.74805 18.5744 5.74805C18.8577 5.74805 19.0911 5.83971 19.2744 6.02305C19.4577 6.20638 19.5494 6.43971 19.5494 6.72305C19.5494 7.00638 19.4577 7.23971 19.2744 7.42305L14.3744 12.323L19.2744 17.223C19.4577 17.4064 19.5494 17.6397 19.5494 17.923C19.5494 18.2064 19.4577 18.4397 19.2744 18.623C19.0911 18.8064 18.8577 18.898 18.5744 18.898C18.2911 18.898 18.0577 18.8064 17.8744 18.623L12.9744 13.723Z"
                fill="#1C1B1F"
              />
            </svg>
          </div>
        </div>
        <ul className="list-reset mobile-menu-content__list mobile-nav">
          <li className="mobile-nav__item">
            <Link href={`/${lng}/about`} className="mobile-nav__link">
              {isClient && t("aboutPortal")}
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href={`/${lng}/${LINK_URLS.services}`}
              className="mobile-nav__link"
            >
              {isClient && t("services")}
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href={`/${lng}/${LINK_URLS.news}`}
              className="mobile-nav__link"
            >
              {isClient && t("news")}
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href={`/${lng}/${LINK_URLS.interview}`}
              className="mobile-nav__link"
            >
              {isClient && t("interview")}
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href={`/${lng}/${LINK_URLS.faq}`}
              className="mobile-nav__link"
            >
              {isClient && t("bloodRelativeSupport")}
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href={`/${lng}/${LINK_URLS.events}`}
              className="mobile-nav__link"
            >
              {isClient && t("events")}
            </Link>
          </li>
        </ul>
        <div className="mobile-menu-content__social">
          <Social data={socilalList} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
