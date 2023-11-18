import NewsService from "@/services/NewsService";

export async function generateMetadata({ params, searchParams }, parent) {
  const slug = params.slug;
  const lng = params.lng;
  const item = await NewsService.getOneOriginCountry(slug, lng);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: item?.data?.title,
    description: item?.data?.title,
    openGraph: {
      title: item?.data?.title,
      description: item?.data?.title,
      images: [item.data?.image, ...previousImages],
    },
  };
}

export default async function NewsSlugLayout({ children }) {
  return children;
}
