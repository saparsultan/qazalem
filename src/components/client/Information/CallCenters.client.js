"use client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import InformationService from "@/services/InformationService";

const CallCentersClient = ({ lng }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["callCenters"],
    queryFn: async () => {
      const { data } = await InformationService.getCallCenters(lng);
      return data;
    },
  });
  return isLoading ? (
    <Skeleton paragraph={{ rows: 8 }} />
  ) : (
    <div className="call__content">
      <div
        className="inner-html"
        dangerouslySetInnerHTML={{
          __html: !isLoading && isSuccess && data && data[0].content,
        }}
      />
    </div>
  );
};

export default CallCentersClient;
