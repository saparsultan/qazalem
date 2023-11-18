import React from "react";
import { Raleway } from "next/font/google";
import { dir } from "i18next";
import { ConfigProvider } from "antd";
import kkKZ from "antd/es/locale/kk_KZ";
import ruRU from "antd/es/locale/ru_RU";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { useTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import theme from "@/theme/themeConfig";
import TanstackProvider from "@/providers/TanstackProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import StyledComponentsRegistry from "@/providers/AntdProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";
import "@/scss/main.scss";

const inter = Raleway({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({ params: { lng } }) {
  async function GenerateMetadata() {
    const { t } = await useTranslation(lng, "default");
    return {
      title: t("homeMetaTitle"),
      description: t("homeMetaDesc"),
    };
  }

  return GenerateMetadata();
}

const RootLayout = async ({ children, params: { lng } }) => {
  let locale;
  switch (lng) {
    case "kk":
      locale = kkKZ;
      break;
    case "ru":
      locale = ruRU;
      break;
    case "en":
      locale = enUS;
      break;
    case "cn":
      locale = zhCN;
      break;
    default:
      locale = kkKZ;
  }

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <NextAuthProvider>
          <TanstackProvider>
            <Header lng={lng} />
            <StyledComponentsRegistry>
              <ConfigProvider theme={theme} locale={locale} key="custom-locale">
                <main>{children}</main>
              </ConfigProvider>
            </StyledComponentsRegistry>
            <Footer lng={lng} />
          </TanstackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
