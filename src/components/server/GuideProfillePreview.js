import Image from "next/image";
import { Button, Rate } from "antd";
import { useTranslation } from "@/app/i18n/client";
import userLogo from "@/assets/img/icons/user.svg";
import locationLogo from "@/assets/img/icons/location.svg";

const GuideProfillePreview = ({ data, lng, infoConnect }) => {
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const getReviewWord = (count) => {
    count = Math.abs(count) % 100;
    const num = count % 10;
    if (count > 10 && count < 20) return tDefault("reviewMore");
    if (num > 1 && num < 5) return tDefault("reviewTwoFive");
    if (num === 1) return tDefault("reviewOne");
    return tDefault("reviewMore");
  };

  const getVisitorWord = (count) => {
    count = Math.abs(count) % 100;
    const num = count % 10;
    if (count > 10 && count < 20) return tDefault("visitorMore");
    if (num > 1 && num < 5) return tDefault("visitorTwoFive");
    if (num === 1) return tDefault("visitor");
    return tDefault("visitorMore");
  };

  return (
    <div className="blog-profile-preview">
      <div className="blog-profile-preview__img">
        <Image
          src={data?.guide?.image}
          alt={data?.guide?.firstname}
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="blog-profile-preview__content">
        <div className="blog-profile-preview__title">
          {data?.guide?.lastname} {data?.guide?.firstname}{" "}
          {data?.guide?.middlename}
        </div>
        <div className="blog-profile-head">
          <div className="star-grid blog-profile-preview__star">
            <Rate allowHalf disabled value={data?.stars} />
          </div>
          <div className="blog-profile-head__reviews">
            {data?.comments_count} {getReviewWord(data?.comments_count)}
          </div>
        </div>
        <div className="blog-profile-info__item">
          <Image
            src={userLogo}
            alt="dsds"
            className="blog-profile-info__item-logo"
          />
          <div className="blog-profile-info__item-text">
            {data?.count_view} {getVisitorWord(data?.count_view)}
          </div>
        </div>
        <div className="blog-profile-preview__text">{data?.description}</div>
        <div className="blog-profile-footer">
          <div className="blog-profile-info__item">
            <Image
              src={locationLogo}
              alt="dsds"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.guide?.personal_data?.city}
            </div>
          </div>
          <Button
            type="primary"
            block
            className="blog-profile-footer__btn"
            onClick={() =>
              infoConnect(data?.guide?.personal_data?.phone_number)
            }
          >
            {tMessage("contact")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuideProfillePreview;
