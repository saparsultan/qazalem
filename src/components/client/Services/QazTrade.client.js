"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import InformationService from "@/services/InformationService";

const QazTradeClient = ({ lng }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["astanaHubContent"],
    queryFn: async () => {
      const { data } = await InformationService.getAstanaHubContent(lng);
      return data;
    },
  });
  return isLoading ? (
    <Skeleton paragraph={{ rows: 8 }} />
  ) : (
    <div className="services-page__content">
      <div
        className="inner-html"
        dangerouslySetInnerHTML={{
          __html: !isLoading && isSuccess && data && data[0]?.description,
        }}
      />
    </div>
  );
};

export default QazTradeClient;
