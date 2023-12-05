import Image from "next/image";
import { Button } from "antd";
import { useTranslation } from "@/app/i18n/client";
import locationLogo from "@/assets/img/icons/location.svg";
import vkLogo from "@/assets/img/icons/vk-filled.svg";
import instaLogo from "@/assets/img/icons/insta-filled.svg";
import fbLogo from "@/assets/img/icons/facebook-filled.svg";
import twitterLogo from "@/assets/img/icons/twitterx-filled.svg";
import tiktokLogo from "@/assets/img/icons/tiktok-filled.svg";
import discordLogo from "@/assets/img/icons/discord-filled.svg";
import youtubeLogo from "@/assets/img/icons/youtube-filled.svg";
import linkedinLogo from "@/assets/img/icons/linkedin-filled.svg";

const VolunteerProfillePreview = ({ data, lng, infoConnect }) => {
  const { t: tMessage } = useTranslation(lng, "message");

  return (
    <div className="blog-profile-preview">
      <div className="blog-profile-preview__img">
        <Image
          src={data?.volunteer?.image}
          alt={data?.volunteer?.firstname}
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="blog-profile-preview__content">
        <div className="blog-profile-preview__title">
          {data?.volunteer?.lastname} {data?.volunteer?.firstname}{" "}
          {data?.volunteer?.middlename}
        </div>
        <div className="blog-profile-preview__text" style={{ marginTop: "0" }}>
          {data?.description}
        </div>
        <div className="blog-profile-info__list">
          <div className="blog-profile-info__item">
            <Image
              src={instaLogo}
              alt="insta logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.instagram}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={vkLogo}
              alt="vk logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.vk}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={fbLogo}
              alt="facebook logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.facebook}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={twitterLogo}
              alt="twitterx logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.twitter}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={tiktokLogo}
              alt="tiktok logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.tiktok}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={youtubeLogo}
              alt="youtube logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.youtube}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={discordLogo}
              alt="discord logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.discord}
            </div>
          </div>
          <div className="blog-profile-info__item">
            <Image
              src={linkedinLogo}
              alt="linkedin logog"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer.social_network?.linkedin}
            </div>
          </div>
        </div>
        <div className="blog-profile-footer">
          <div className="blog-profile-info__item">
            <Image
              src={locationLogo}
              alt="loaction logo"
              className="blog-profile-info__item-logo"
            />
            <div className="blog-profile-info__item-text">
              {data?.volunteer?.personal_data?.city}
            </div>
          </div>
          <Button
            type="primary"
            block
            className="blog-profile-footer__btn"
            onClick={() =>
              infoConnect(data?.volunteer?.personal_data?.phone_number)
            }
          >
            {tMessage("contact")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfillePreview;
