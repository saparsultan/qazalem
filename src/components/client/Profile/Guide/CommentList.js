import Image from "next/image";
import { Rate } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import InformationService from "@/services/InformationService";
import { RedableFormatExactly } from "@/utils/dayjs";
import { useTranslation } from "@/app/i18n/client";
import EmptyBlock from "@/components/server/EmptyBlock";
import userFillLogo from "@/assets/img/icons/user-fill.svg";

const CommentList = ({ lng, infoGuide }) => {
  const { data: session } = useSession();
  const { t: tDefault } = useTranslation(lng, "default");
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["myGuideComments", session?.user?.guide_id],
    queryFn: async ({ signal }) => {
      const { data } = await InformationService.getGuideComments(
        session?.user?.guide_id,
        signal,
      );
      return data;
    },
  });
  return (
    <>
      {!isLoading && isSuccess && data?.results.length < 1 ? (
        <div className="publish-empty">
          <EmptyBlock description={tDefault("noResultsFound")} />
        </div>
      ) : (
        <div className="profile-comments">
          <div className="profile-comments-info">
            <div className="profile-comments-info__star">
              {infoGuide?.stars}
            </div>
            <div className="profile-comments-info__rate">
              <Rate disabled allowHalf value={infoGuide?.stars} />
            </div>
            <div className="profile-comments-info__count">
              —&nbsp;&nbsp;&nbsp;{tDefault("ratings")}: {infoGuide?.comments}
            </div>
          </div>
          <div className="comments-list">
            {!isLoading &&
              isSuccess &&
              data?.results.map(({ id, comments, created_at, stars, user }) => {
                return (
                  <div className="comments-item" key={id}>
                    <div className="comments-item__top">
                      <div className="comments-item__top-image">
                        <Image
                          src={user?.image ? user?.image : userFillLogo}
                          alt={user?.firstname}
                          width={54}
                          height={54}
                        />
                      </div>
                      <div className="comments-item__top-info">
                        <div className="comments-item__top-header">
                          <div className="comments-item__top-name">
                            {user?.firstname}
                          </div>
                          <Rate allowHalf disabled value={stars ? stars : 0} />
                        </div>
                        <div className="comments-item__top-date">
                          <RedableFormatExactly date={created_at} lng={lng} />
                        </div>
                      </div>
                    </div>
                    <div className="comments-item__bottom">
                      <div className="comments-item__bottom-text">
                        {comments}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default CommentList;
