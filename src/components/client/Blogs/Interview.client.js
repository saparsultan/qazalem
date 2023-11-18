"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DatePicker, Input, Button, Skeleton, Pagination } from "antd";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { LINK_URLS } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";
import NewsService from "@/services/NewsService";
import BlogItem from "@/components/client/Blogs/BlogItem";
import EmptyBlock from "@/components/server/EmptyBlock";
const { RangePicker } = DatePicker;
const { Search } = Input;

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const InterviewClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation(lng, "default");
  const { t: tForm } = useTranslation(lng, "form");
  const link = `/${lng}/${LINK_URLS.interview}`;

  // STATE
  const [isClient, setIsClient] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [startEndDate, setStartEndDate] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const publishDateQuery =
    searchParams.get("publish_date") &&
    searchParams.get("publish_date") !== null
      ? searchParams.get("publish_date")
      : "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (publishDateQuery && publishDateQuery !== "") {
      const dateQueryFirst = dayjs(new Date(publishDateQuery.split(" ")[0]));
      const dateQuerySecond = dayjs(new Date(publishDateQuery.split(" ")[1]));
      console.log({ dateQueryFirst });
      setStartEndDate([dateQueryFirst, dateQuerySecond]);
    }
  }, [publishDateQuery, searchQuery]);

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["blogInterview", searchQuery, publishDateQuery, pagination, lng],
    queryFn: async () => {
      const datesArray = publishDateQuery.split(" ");
      const firstDate =
        datesArray && datesArray.length > 1 ? datesArray[0] : "";
      const secondDate =
        datesArray && datesArray.length > 1 ? datesArray[1] : "";
      const getData = {
        published_date_start: firstDate,
        published_date_end: secondDate,
        search: searchQuery,
        page: pagination,
        lang: lng,
      };
      const { data } = await NewsService.getInterview(getData);
      return data;
    },
  });

  // -- Применить фильтр -- //
  const onSubmitFilter = () => {
    router.push(`${pathname}?search=${search}&publish_date=${publishDate}`);
  };

  // -- Поиск -- //
  const onSearch = (value) => {
    setSearch(value);
    if (publishDateQuery !== "") {
      router.push(`${pathname}?search=${search}&publish_date=${publishDate}`);
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  // -- Изменить поиск -- //
  const onChangeSearch = (e) => {
    const target = e.target.value;
    if (target === "" && searchQuery !== "") {
      if (publishDateQuery !== "" || publishDateQuery !== null) {
        router.push(`${pathname}?search=${target}&publish_date=${publishDate}`);
      } else {
        router.push(`${pathname}?search=${target}`);
      }
      setSearch("");
    }
    setSearch(target);
  };

  // -- Изменить дату -- //
  const onChangeDate = (value) => {
    if (value) {
      const startDateSrc = dayjs(new Date(value[0])).format("YYYY-MM-DD");
      const endDateSrc = dayjs(new Date(value[1])).format("YYYY-MM-DD");
      const publishDate = `${startDateSrc} ${endDateSrc}`;
      setPublishDate(publishDate);
    } else if (value === null || value === undefined || !publishDateQuery) {
      setPublishDate("");
      if (
        publishDateQuery ||
        publishDateQuery !== null ||
        publishDateQuery !== ""
      ) {
        router.push(`${pathname}?search=${search}&publish_date=`);
      } else {
        router.push(`${pathname}?search=${search}`);
      }
    }
    setStartEndDate(value);
  };

  // -- Изменить пагинацию -- //
  const onChangeSize = (current) => {
    setPagination(current);
  };

  return (
    isClient && (
      <section className="section section--publish news-world__container">
        <div className="container">
          <div className="news-world">
            <h2 className="title title-left text-low title-h2 publish__title">
              {t("interview")}
            </h2>
            <p className="publish__desc">{t("interviewDesc")}</p>
            <div className="publish publish--two">
              <div className="publish-filter publish-item">
                <RangePicker value={startEndDate} onChange={onChangeDate} />
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                  }}
                  onClick={onSubmitFilter}
                >
                  {tForm("apply")}
                </Button>
              </div>
              <div className="publish-grid-wrap">
                <div className="publish-search">
                  <Search
                    placeholder={`${tForm("search")}...`}
                    onSearch={onSearch}
                    value={search}
                    onChange={onChangeSearch}
                    className="publish-search__input"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                {!isLoading &&
                isSuccess &&
                data.pages[0]?.results.length > 0 ? (
                  <div className="publish-grid publish-grid--two publish-item">
                    {!isLoading && isSuccess && data
                      ? data?.pages[0]?.results.map(
                          ({
                            id,
                            published_date,
                            image,
                            title,
                            subcategory,
                          }) => (
                            <BlogItem
                              key={id}
                              id={id}
                              date={published_date}
                              image={image}
                              subcategory={subcategory}
                              title={title}
                              lng={lng}
                              link={link}
                            />
                          ),
                        )
                      : Array(4)
                          .fill(0)
                          .map((_, index) => (
                            <div key={index} className="skeleton-blogCard">
                              <Skeleton.Image
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                                active={true}
                                className="skeleton-blogCard__img"
                              />
                              <Skeleton
                                className="skeleton-blogCard__text"
                                active
                              />
                            </div>
                          ))}
                  </div>
                ) : (
                  <div className="publish-empty">
                    <EmptyBlock description={t("noResultsFound")} />
                  </div>
                )}
                {!isLoading &&
                  isSuccess &&
                  data.pages[0]?.results.length > 0 && (
                    <div className="publish-pagination">
                      <Pagination
                        onChange={onChangeSize}
                        defaultCurrent={pagination}
                        total={data?.pages[0].count}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default InterviewClient;
