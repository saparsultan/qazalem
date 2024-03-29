"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DatePicker, Select, Input, Button, Skeleton, Pagination } from "antd";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useTranslation } from "@/app/i18n/client";
import { LINK_URLS } from "@/utils/constants";
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

const NewsWorldClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tDefault } = useTranslation(lng, "default");
  const link = `/${lng}/${LINK_URLS.news}/${LINK_URLS.world}`;

  // STATE
  const [publishDate, setPublishDate] = useState("");
  const [startEndDate, setStartEndDate] = useState(null);
  const [category, setCategory] = useState("");
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
  const categoryQuery =
    searchParams.get("category") && searchParams.get("category") !== null
      ? searchParams.get("category")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (publishDateQuery && publishDateQuery !== "") {
      const dateQueryFirst = dayjs(new Date(publishDateQuery.split(" ")[0]));
      const dateQuerySecond = dayjs(new Date(publishDateQuery.split(" ")[1]));
      setStartEndDate([dateQueryFirst, dateQuerySecond]);
    }
    if (categoryQuery && categoryQuery !== "") {
      setCategory(+categoryQuery);
    }
  }, [searchQuery, categoryQuery, publishDateQuery]);

  const newsWorldCategory = useQuery({
    queryKey: ["newsWorldCategory"],
    queryFn: async () => {
      const { data } = await NewsService.getNewsWorldCategory(lng);
      return data;
    },
    staleTime: Infinity,
  });

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: [
      "blogNewsWorld",
      searchQuery,
      publishDateQuery,
      categoryQuery,
      pagination,
      lng,
    ],
    queryFn: async () => {
      const datesArray = publishDateQuery.split(" ");
      const firstDate = datesArray ? datesArray[0] : "";
      const secondDate =
          datesArray && datesArray.length > 1 ? datesArray[1] : "";
      const getData = {
        subcategory: categoryQuery,
        published_date_start: firstDate,
        published_date_end: secondDate,
        search: searchQuery,
        page: pagination,
        lang: lng,
      };
      const { data } = await NewsService.getNewsWorld(getData);
      return data;
    },
  });

  const getCategoryLabel = (value) => {
    return (
      newsWorldCategory?.data?.length &&
      newsWorldCategory?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  // -- Применить фильтр -- //
  const onSubmitFilter = () => {
    router.push(
      `${pathname}?search=${search}&publish_date=${publishDate}&category=${category}`,
    );
  };

  // -- Поиск -- //
  const onSearch = (value) => {
    setSearch(value);
    if (publishDateQuery !== "" || categoryQuery !== "") {
      router.push(
        `${pathname}?search=${search}&publish_date=${publishDate}&category=${category}`,
      );
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  // -- Изменить поиск -- //
  const onChangeSearch = (e) => {
    const target = e.target.value;
    if (target === "" && searchQuery !== "") {
      if (publishDateQuery !== "" || publishDateQuery !== null) {
        router.push(
          `${pathname}?search=${target}&publish_date=${publishDate}&category=${category}`,
        );
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
        publishDateQuery !== "" ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&publish_date=&category=${category}`,
        );
      } else {
        router.push(`${pathname}?publish_date=${publish_date}`);
      }
    }
    setStartEndDate(value);
  };

  // -- Изменить категорию -- //
  const onChangeCategory = (value) => {
    if (value && !isNaN(value)) {
      setCategory(value);
      if (
        publishDateQuery !== "" ||
        publishDateQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&publish_date=${publishDate}&category=${category}`,
        );
      } else {
        router.push(`${pathname}?category=${category}`);
      }
    } else {
      setCategory("");
      if (
        publishDateQuery !== "" ||
        publishDateQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&publish_date=${publishDate}&category=`,
        );
      } else {
        router.push(`${pathname}?category=`);
      }
    }
  };

  // -- Изменить пагинацию -- //
  const onChangeSize = (current) => {
    setPagination(current);
  };

  return (
    <div className="publish publish--two">
      <div className="publish-filter publish-item">
        <RangePicker value={startEndDate} onChange={onChangeDate} />

        <Select
          allowClear
          placeholder={tForm("activityCategory")}
          value={
            category && category !== ""
              ? {
                  value: category,
                  label: getCategoryLabel(category),
                }
              : null
          }
          onChange={onChangeCategory}
          options={
            newsWorldCategory?.data?.length &&
            newsWorldCategory?.data.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            })
          }
        />
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
        {!isLoading && isSuccess && data.pages[0]?.results.length > 0 ? (
          <div className="publish-grid publish-grid--two publish-item">
            {!isLoading && isSuccess && data
              ? data?.pages[0]?.results.map(
                  ({ id, published_date, image, title, subcategory }) => (
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
                      <Skeleton className="skeleton-blogCard__text" active />
                    </div>
                  ))}
          </div>
        ) : (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        )}
        {!isLoading && isSuccess && data.pages[0]?.results.length > 0 && (
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
  );
};

export default NewsWorldClient;
