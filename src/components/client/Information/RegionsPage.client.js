"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ImageGallery from "react-image-gallery";
import InformationService from "@/services/InformationService";
import AboutCountryAside from "@/components/client/Information/AboutCountryAside";
import BackLink from "@/components/client/BackLink";
import "react-image-gallery/styles/scss/image-gallery.scss";

const RegionsPageClient = ({ lng }) => {
  const { slug } = useParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["infoRegionsContent"],
    queryFn: async () => {
      const { data } = await InformationService.getRegionsContent(slug, lng);
      return data;
    },
  });

  const galleryImages = data?.dynamic_images.map(({ id, image }) => {
    return {
      key: id,
      original: image,
      thumbnail: image,
    };
  });

  return (
    <>
      <div className="about-country-page__head">
        <BackLink lng={lng} small />
        <h2 className="title title-h2">{data?.category[0]?.name}</h2>
      </div>
      <div className="about-country-wrap">
        <div className="about-country-content">
          {galleryImages?.length > 0 && (
            <ImageGallery items={galleryImages} showIndex />
          )}
          <div className="about-country-content__content">
            <div
              dangerouslySetInnerHTML={{ __html: data?.body_text }}
              className="inner-html"
            />
          </div>
        </div>
        <AboutCountryAside data={data} />
      </div>
    </>
  );
};

export default RegionsPageClient;
