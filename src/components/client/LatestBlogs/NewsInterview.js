"use client";
import { useInterview } from "@/hooks/useQuery";
import LatestBlogsAside from "@/components/client/LatestBlogs/LatestBlogsAside";

export default function NewsInterviewQuery({
  queryKey,
  queryParams,
  link,
  lng,
}) {
  const data = useInterview(queryKey, queryParams);
  return <LatestBlogsAside data={data} link={link} lng={lng} />;
}
