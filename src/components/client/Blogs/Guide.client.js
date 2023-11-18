"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Rate, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import InformationService from "@/services/InformationService";
import { LINK_URLS } from "@/utils/constants";

const { Search } = Input;
import userLogo from "@/assets/img/icons/user.svg";
import locationLogo from "@/assets/img/icons/location.svg";

const GuideClient = ({ lng }) => {
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tHome } = useTranslation(lng, "home");
  const { t } = useTranslation(lng, "form");
  const { t: tDefault } = useTranslation(lng, "default");
  const [modal, contextHolder] = Modal.useModal();
  const { data } = useQuery({
    queryKey: ["blogGuideList", lng],
    queryFn: async () => {
      const formData = {
        lang: lng,
        search: "",
        city: "",
        min_average_stars: "",
        page: 1,
        page_size: "",
      };
      const { data } = await InformationService.getGuideList(formData);
      return data;
    },
  });

  const infoConnect = async (phone) => {
    await modal.info({
      title: tMessage("contact"),
      content: phone,
      icon: <InfoCircleOutlined />,
    });
  };

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
    <>
      <div className="publish publish--one">
        <div className="publish-filter publish-filter--vertical">
          <div className="publish-search">
            <Search
              placeholder={`${t("search")}...`}
              // onSearch={onSearch}
              // value={search}
              // onChange={onChangeSearch}
              className="publish-search__input"
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="publish-grid publish-grid--three">
          {data &&
            data?.results.map(
              ({ id, comments_count, count_view, guide, stars }) => {
                return (
                  <div className="blog-profile" key={id}>
                    <div className="blog-profile-head">
                      <div className="star-grid blog-profile-head__star">
                        <Rate allowHalf disabled value={stars} />
                      </div>
                      <div className="blog-profile-head__reviews">
                        {comments_count} {getReviewWord(comments_count)}
                      </div>
                    </div>
                    <div className="blog-profile-image">
                      <Image
                        src={guide?.image}
                        alt={guide?.firstname}
                        priority
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="blog-profile__title">
                      {guide?.lastname} {guide?.firstname} {guide?.middlename}
                    </div>
                    <div className="blog-profile-info">
                      <div className="blog-profile-info__item">
                        <Image
                          src={userLogo}
                          alt="dsds"
                          className="blog-profile-info__item-logo"
                        />
                        <div className="blog-profile-info__item-text">
                          {count_view} {getVisitorWord(count_view)}
                        </div>
                      </div>
                      <div className="blog-profile-info__item">
                        <Image
                          src={locationLogo}
                          alt="dsds"
                          className="blog-profile-info__item-logo"
                        />
                        <div className="blog-profile-info__item-text">
                          {guide?.personal_data?.city}
                        </div>
                      </div>
                    </div>
                    <div className="blog-profile-footer">
                      <Button
                        type="primary"
                        block
                        className="blog-profile-footer__btn"
                        onClick={() =>
                          infoConnect(guide?.personal_data?.phone_number)
                        }
                      >
                        {tMessage("contact")}
                      </Button>
                      <Link
                        href={`/${lng}/${LINK_URLS.guide}/${id}`}
                        className="blog-profile-footer__btn"
                      >
                        {tHome("learnMore")}
                      </Link>
                    </div>
                  </div>
                );
              },
            )}
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default GuideClient;
