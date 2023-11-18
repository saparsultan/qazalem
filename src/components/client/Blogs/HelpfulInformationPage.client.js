import React from "react";
import BlogFullContentPageClient from "@/components/client/Blogs/BlogFullContentPage.client";
import { useQuery } from "@tanstack/react-query";
import InformationService from "@/services/InformationService";

const HelpfulInformationPageClient = ({ lng, slug }) => {
  const { data } = useQuery({
    queryKey: ["helpfulInformationPage"],
    queryFn: async () => {
      const { data } = await InformationService.getHelpfulInformationContent(
        slug,
        lng,
      );
      return data;
    },
  });
  return <BlogFullContentPageClient data={data} />;
};

export default HelpfulInformationPageClient;
