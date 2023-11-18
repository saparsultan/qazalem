"use client";
import { useQuery } from "@tanstack/react-query";
import InformationService from "@/services/InformationService";
import InformationCard from "@/components/client/Information/InformationCard";
import { LINK_URLS } from "@/utils/constants";

const RegionsClient = ({ lng }) => {
  const link = `/${lng}/${LINK_URLS.regions}`;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["infoRegionsCategory"],
    queryFn: async () => {
      const { data } = await InformationService.getRegionsCategory(lng);
      return data;
    },
  });

  return (
    <div className="about-country__grid grid grid-4">
      {!isLoading &&
        isSuccess &&
        data.map(({ id, image, name }) => {
          return (
            <InformationCard
              key={id}
              id={id}
              image={image}
              name={name}
              link={link}
              lng={lng}
            />
          );
        })}
    </div>
  );
};

export default RegionsClient;
