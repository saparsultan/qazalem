"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import Social from "@/components/layout/Social";
import HomeService from "@/services/HomeServices";
import { LINK_URLS } from "@/utils/constants";
import logoIcon from "@/assets/img/logo-primary.png";

const FooterClient = ({ children, lng }) => {
  const { t } = useTranslation(lng, "layout");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const socilalList = useQuery({
    queryKey: ["socialList"],
    queryFn: async () => {
      const { data } = await HomeService.getSocial(3);
      return data;
    },
  });
  return (
    <div className="footer-top">
      <div className="footer-item">
        <Link href="/" className="logo footer__logo">
          <div className="logo__icon">
            <Image src={logoIcon} alt="Footer logo" />
          </div>
          <div className="logo__text">QAZALEM</div>
        </Link>
        <p className="footer-item__desc">{isClient && t("portalDesc")}</p>
        <Social data={socilalList} />
      </div>
      <div className="footer-item">
        <h3 className="footer-item__title mdm">{isClient && t("menu")}</h3>
        {children}
      </div>
      <div className="footer-item">
        <h3 className="footer-item__title mdm">{isClient && t("document")}</h3>
        <ul className="list-reset footer-item__list">
          <li className="footer-item__item">
            <Link href="/" className="footer-item__link">
              {isClient && t("privacyPolicy")}
            </Link>
          </li>
          <li className="footer-item__item">
            <Link href="/" className="footer-item__link">
              {isClient && t("apiConnection")}
            </Link>
          </li>
          <li className="footer-item__item">
            <Link href="/" className="footer-item__link">
              {isClient && t("callCenter")}
            </Link>
          </li>
          <li className="footer-item__item">
            <Link
              href={`/${lng}/${LINK_URLS.help}`}
              className="footer-item__link"
            >
              {isClient && t("help")}
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-item">
        <h3 className="footer-item__title mdm">
          {isClient && t("notification")}
        </h3>
        <form action="" className="subscr">
          <input className="subscr__input" type="email" placeholder="Email" />
          <button className="btn-reset subscr__btn">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.07532 20.062C5.2236 20.1391 5.39009 20.1744 5.55692 20.1641C5.72374 20.1538 5.8846 20.0982 6.02223 20.0034L17.9389 11.7534C18.0607 11.669 18.1602 11.5564 18.2289 11.4251C18.2976 11.2939 18.3335 11.148 18.3335 10.9999C18.3335 10.8517 18.2976 10.7058 18.2289 10.5746C18.1602 10.4433 18.0607 10.3307 17.9389 10.2464L6.02223 1.99635C5.88471 1.9012 5.72378 1.84547 5.55686 1.83522C5.38993 1.82497 5.22339 1.86057 5.07525 1.93818C4.92712 2.01579 4.80303 2.13245 4.71644 2.27552C4.62985 2.41859 4.58404 2.58262 4.58398 2.74985V19.2499C4.58396 19.4172 4.62973 19.5813 4.71634 19.7245C4.80295 19.8677 4.92709 19.9844 5.07532 20.062Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FooterClient;
