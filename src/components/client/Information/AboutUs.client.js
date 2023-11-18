"use client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import InformationService from "@/services/InformationService";

const AboutUsClient = ({ lng }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["infoAboutUs"],
    queryFn: async () => {
      const { data } = await InformationService.getAbout(lng);
      return data;
    },
  });
  return isLoading ? (
    <Skeleton paragraph={{ rows: 8 }} />
  ) : (
    <div
      className="inner-html"
      dangerouslySetInnerHTML={{
        __html: !isLoading && isSuccess && data && data[0].body_text,
      }}
    />
  );
};

export default AboutUsClient;
