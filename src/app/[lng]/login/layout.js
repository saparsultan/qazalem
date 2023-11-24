import { useTranslation } from "@/app/i18n";

export async function generateMetadata({ params: { lng } }) {
  async function GenerateMetadata() {
    const { t } = await useTranslation(lng, "auth");
    return {
      title: t("authorization"),
    };
  }

  return GenerateMetadata();
}

export default async function LoginLayout({ children }) {
  return children;
}
