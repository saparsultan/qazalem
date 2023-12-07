"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Rate, Modal, Pagination } from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import InformationService from "@/services/InformationService";
import { LINK_URLS } from "@/utils/constants";
import EmptyBlock from "@/components/server/EmptyBlock";
import emptyLogo from "@/assets/img/default.png";
import userLogo from "@/assets/img/icons/user.svg";
import locationLogo from "@/assets/img/icons/location.svg";

const GuideClient = ({ lng }) => {
  const [modal, contextHolder] = Modal.useModal();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tHome } = useTranslation(lng, "home");
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tDefault } = useTranslation(lng, "default");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [rate, setRate] = useState("");
  const [pagination, setPagination] = useState(1);

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const cityQuery =
    searchParams.get("city") && searchParams.get("city") !== null
      ? searchParams.get("city")
      : "";
  const rateQuery =
    searchParams.get("rate") && searchParams.get("rate") !== null
      ? searchParams.get("rate")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (cityQuery && cityQuery !== "") {
      setCity(cityQuery);
    }
    if (rateQuery && rateQuery !== "") {
      setRate(+rateQuery);
    }
  }, [searchQuery, cityQuery, rateQuery]);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "blogGuideList",
      searchQuery,
      cityQuery,
      rateQuery,
      pagination,
      lng,
    ],
    queryFn: async () => {
      const formData = {
        lang: lng,
        search: searchQuery,
        city: cityQuery,
        min_average_stars: rateQuery,
        page: pagination,
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

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeRate = (value) => {
    setRate(value);
  };

  const onSubmitFilter = () => {
    router.push(`${pathname}?search=${search}&city=${city}&rate=${rate}`);
  };

  const onResetFilter = () => {
    setSearch("");
    setCity("");
    setRate(0);
    router.push(`${pathname}`);
  };

  const onChangeSize = (current) => {
    setPagination(current);
  };

  return (
    <>
      <div className="publish publish--one">
        <div className="publish-filter publish-filter--horizontal">
          <div className="publish-filter__search">
            <Input
              addonBefore={<SearchOutlined />}
              placeholder={`${tForm("search")}...`}
              allowClear
              value={search}
              onChange={onChangeSearch}
            />
          </div>
          <div className="publish-filter__select">
            <Input
              placeholder={tForm("searchCity")}
              allowClear
              value={city}
              onChange={onChangeCity}
            />
          </div>
          <div className="publish-filter__rate">
            <Rate allowHalf value={rate} onChange={onChangeRate} />
            {rate > 0 && <div className="publish-filter__rate-sum">{rate}</div>}
          </div>
          <div className="publish-filter__action">
            <div className="publish-filter__submit">
              <Button type="primary" onClick={onSubmitFilter}>
                {tForm("apply")}
              </Button>
            </div>
            <div className="publish-filter__submit">
              <Button onClick={onResetFilter}>{tForm("reset")}</Button>
            </div>
          </div>
        </div>
        {!isLoading && isSuccess && data?.results.length > 0 ? (
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
                          src={guide?.image ? guide?.image : emptyLogo}
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
        ) : (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        )}
        {!isLoading && isSuccess && data?.results.length > 0 && (
          <div className="publish-pagination">
            <Pagination
              onChange={onChangeSize}
              defaultCurrent={pagination}
              total={data?.count}
            />
          </div>
        )}
      </div>
      {contextHolder}
    </>
  );
};

export default GuideClient;
