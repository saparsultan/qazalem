"use client";
import { useNewsWorld } from "@/hooks/useQuery";
import LatestBlogsAside from "@/components/client/LatestBlogs/LatestBlogsAside";

export default function NewsWorldQuery({ queryKey, queryParams, link, lng }) {
  const data = useNewsWorld(queryKey, queryParams);
  return <LatestBlogsAside data={data} link={link} lng={lng} />;
}
