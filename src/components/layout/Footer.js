import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import FooterClient from "@/components/layout/Footer.client";
import FooterNav from "@/components/layout/FooterNav";

export default async function Footer({ lng }) {
  const { t } = await useTranslation(lng, "layout");
  return (
    <footer className="footer__container">
      <div className="container">
        <div className="footer">
          <FooterClient lng={lng}>
            <FooterNav lng={lng} />
          </FooterClient>
          <div className="footer-bottom">
            <div className="copy footer-bottom__copy">
              © QazAlem, 2023. &nbsp;{t("allRightsReserved")}
            </div>
            <div className="dev footer-bottom__dev">
              Created with ❤️ at&nbsp;
              <Link href="https://www.ziz.kz/" target="_blank">
                ZIZ Inc.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
