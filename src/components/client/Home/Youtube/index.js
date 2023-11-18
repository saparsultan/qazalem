"use client";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import HomeService from "@/services/HomeServices";
import YouTubePlayer from "@/components/client/Home/Youtube/YoutubePlayer";
import MoreLink from "@/components/layout/MoreLink";
import { GOOGlE_API_KEY, YOUTUBE_CHANNEL_ID } from "@/utils/constants";

const Youtube = ({ lng }) => {
  const { t } = useTranslation(lng, "home");
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["yotubeVideos"],
    queryFn: async () => {
      const part = "snippet";
      const maxResults = 3;
      const order = "date";
      const { data } = await HomeService.getYoutubeVideos(
        part,
        YOUTUBE_CHANNEL_ID,
        maxResults,
        order,
        GOOGlE_API_KEY,
      );
      return data;
    },
    staleTime: Infinity,
  });

  return (
    <div className="video-content">
      <div className="video-content__list">
        {!isLoading &&
          isSuccess &&
          data &&
          data?.items.map((video, id) => {
            return (
              <div
                key={video.id.videoId + id}
                className={`video-content__thumbnail video-content__thumbnail--${id}`}
                style={{
                  backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
                }}
              >
                <YouTubePlayer
                  className={`video-content__item video-content__item--${id}`}
                  videoId={video.id.videoId}
                />
              </div>
            );
          })}
      </div>
      <MoreLink
        link={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`}
        target
      >
        {t("allVideo")}
      </MoreLink>
    </div>
  );
};

export default Youtube;
