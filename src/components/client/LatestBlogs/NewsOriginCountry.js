"use client";
import { useNewsOriginCountry } from "@/hooks/useQuery";
import LatestBlogsAside from "@/components/client/LatestBlogs/LatestBlogsAside";

export default function NewsOriginCountryQuery({
  queryKey,
  queryParams,
  link,
  lng,
}) {
  const data = useNewsOriginCountry(queryKey, queryParams);
  return <LatestBlogsAside data={data} link={link} lng={lng} />;
}
