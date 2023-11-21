import NewsService from "@/services/NewsService";
import { SITE_URL } from "@/utils/constants";

export async function generateMetadata({ params, searchParams }, parent) {
  const slug = params.slug;
  const lng = params.lng;
  const item = await NewsService.getOneNewsWorld(slug, lng);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    metadataBase: new URL(SITE_URL),
    title: item?.data?.title,
    description: item?.data?.title,
    openGraph: {
      title: item?.data?.title,
      description: item?.data?.title,
      images: [item.data?.image, ...previousImages],
    },
  };
}

export default async function NewsWorldSlugLayout({ children }) {
  return children;
}
