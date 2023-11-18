"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LINK_URLS } from "@/utils/constants";
import InformationCard from "@/components/client/Information/InformationCard";
import AboutCountryAside from "@/components/client/Information/AboutCountryAside";
import InformationService from "@/services/InformationService";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const RegionsPageClient = ({ lng }) => {
  const { slug } = useParams();
  const router = useRouter();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["infoRegionsContent"],
    queryFn: async () => {
      const { data } = await InformationService.getRegionsContent(slug, lng);
      return data;
    },
  });

  const galleryImages = data?.dynamic_images.map(({ id, image, content }) => {
    return {
      key: id,
      original: image,
      thumbnail: image,
    };
  });
  return (
    <>
      <div className="about-country-page__head">
        <div
          className="article-widget__back article-widget__back--small"
          onClick={() => router.back()}
        >
          <svg
            className="article-widget__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.8248 10.0008L10.7248 12.9008C10.9248 13.1008 11.0206 13.3341 11.0123 13.6008C11.004 13.8674 10.9081 14.1008 10.7248 14.3008C10.5248 14.5008 10.2915 14.6049 10.0248 14.6133C9.75814 14.6216 9.5248 14.5258 9.3248 14.3258L4.6998 9.70078C4.5998 9.60078 4.52897 9.49245 4.4873 9.37578C4.44564 9.25911 4.4248 9.13411 4.4248 9.00078C4.4248 8.86745 4.44564 8.74245 4.4873 8.62578C4.52897 8.50911 4.5998 8.40078 4.6998 8.30078L9.2748 3.72578C9.4748 3.52578 9.7123 3.42578 9.9873 3.42578C10.2623 3.42578 10.4998 3.52578 10.6998 3.72578C10.8998 3.92578 10.9998 4.15911 10.9998 4.42578C10.9998 4.69245 10.8998 4.92578 10.6998 5.12578L7.8248 8.00078H16.9998C17.5498 8.00078 18.0206 8.19661 18.4123 8.58828C18.804 8.97995 18.9998 9.45078 18.9998 10.0008V19.0008C18.9998 19.2841 18.904 19.5216 18.7123 19.7133C18.5206 19.9049 18.2831 20.0008 17.9998 20.0008C17.7165 20.0008 17.479 19.9049 17.2873 19.7133C17.0956 19.5216 16.9998 19.2841 16.9998 19.0008V10.0008H7.8248Z"
              fill="#1C1B1F"
            />
          </svg>
          <span>Назад</span>
        </div>
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
        <AboutCountryAside />
      </div>
    </>
  );
};

export default RegionsPageClient;
