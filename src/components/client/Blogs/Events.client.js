"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DatePicker, Select, Input, Button, Skeleton, Pagination } from "antd";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import * as dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
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

const EventsClient = ({ lng, archive }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const link = `/${lng}/${LINK_URLS.events}`;

  // STATE
  const { t: tForm } = useTranslation(lng, "form");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startEndDate, setStartEndDate] = useState([]);
  const [country, setCountry] = useState("");
  const [eventType, setEventType] = useState("");
  const [pagination, setPagination] = useState(1);

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const startDateQuery =
    searchParams.get("start_date") && searchParams.get("start_date") !== null
      ? searchParams.get("start_date")
      : "";
  const endDateQuery =
    searchParams.get("end_date") && searchParams.get("end_date") !== null
      ? searchParams.get("end_date")
      : "";
  const countryQuery =
    searchParams.get("country") && searchParams.get("country") !== null
      ? searchParams.get("country")
      : "";
  const typeQuery =
    searchParams.get("type") && searchParams.get("type") !== null
      ? searchParams.get("type")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (
      startDateQuery &&
      startDateQuery !== "" &&
      endDateQuery &&
      endDateQuery !== ""
    ) {
      const dateQueryFirst = dayjs(new Date(startDateQuery));
      const dateQuerySecond = dayjs(new Date(endDateQuery));
      setStartEndDate([dateQueryFirst, dateQuerySecond]);
    }
    if (countryQuery && countryQuery !== "") {
      setCountry(+countryQuery);
    }
    if (typeQuery && typeQuery !== "") {
      setEventType(+typeQuery);
    }
  }, [searchQuery, startDateQuery, endDateQuery, countryQuery, typeQuery]);

  const eventsCountry = useQuery({
    queryKey: ["eventsCountry"],
    queryFn: async () => {
      const { data } = await NewsService.getEventsCountry(lng);
      return data;
    },
  });

  const eventsType = useQuery({
    queryKey: ["eventsType"],
    queryFn: async () => {
      const { data } = await NewsService.getEventsType(lng);
      return data;
    },
  });

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: [
      "blogEvents",
      searchQuery,
      startDateQuery,
      endDateQuery,
      countryQuery,
      typeQuery,
      pagination,
      lng,
    ],
    queryFn: async () => {
      const getData = {
        event_date_start: startDateQuery,
        event_date_end: endDateQuery,
        type_of_event: typeQuery,
        countries: countryQuery,
        search: searchQuery,
        archive: archive,
        page: pagination,
        lang: lng,
      };
      const { data } = await NewsService.getEvents(getData);
      return data;
    },
  });

  console.log({ data });

  const getCountryLabel = (value) => {
    return (
      eventsCountry?.data?.length &&
      eventsCountry?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  const getEventsTypeLabel = (value) => {
    return (
      eventsType?.data?.length &&
      eventsType?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  // -- Поиск -- //
  const onSearch = (value) => {
    setSearch(value);
    if (
      startDateQuery !== "" ||
      endDateQuery !== "" ||
      countryQuery !== "" ||
      typeQuery !== ""
    ) {
      router.push(
        `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
      );
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  // -- Изменить поиск -- //
  const onChangeSearch = (e) => {
    const target = e.target.value;
    if (target === "" && searchQuery !== "") {
      if (
        startDateQuery !== "" ||
        startDateQuery !== null ||
        endDateQuery !== "" ||
        endDateQuery !== null ||
        countryQuery !== "" ||
        countryQuery !== null ||
        typeQuery !== "" ||
        typeQuery !== null
      ) {
        router.push(
          `${pathname}?search=${target}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
        );
      } else {
        router.push(`${pathname}?search=${target}`);
      }
      setSearch("");
    }
    setSearch(target);
  };

  // -- Применить фильтр -- //
  const onSubmitFilter = () => {
    router.push(
      `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
    );
  };

  // -- Изменить дату -- //
  const onChangeDate = (value) => {
    if (value) {
      const startDateSrc = dayjs(new Date(value[0])).format("YYYY-MM-DD");
      const endDateSrc = dayjs(new Date(value[1])).format("YYYY-MM-DD");
      setStartDate(startDateSrc);
      setEndDate(endDateSrc);
    } else if (
      value === null ||
      value === undefined ||
      !startDateQuery ||
      !endDateQuery
    ) {
      setStartDate("");
      setEndDate("");
      if (
        startDateQuery !== "" ||
        startDateQuery !== null ||
        endDateQuery !== "" ||
        endDateQuery !== null ||
        countryQuery !== "" ||
        countryQuery !== null ||
        typeQuery !== "" ||
        typeQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&start_date=&end_date=&country=${country}&type=${eventType}`,
        );
      } else {
        router.push(`${pathname}?start_date=&end_date=`);
      }
    }
    setStartEndDate(value);
  };

  // -- Изменить страну -- //
  const onChangeCountry = (value) => {
    if (value && !isNaN(value)) {
      setCountry(value);
      if (
        startDateQuery !== "" ||
        startDateQuery !== null ||
        endDateQuery !== "" ||
        endDateQuery !== null ||
        countryQuery !== "" ||
        countryQuery !== null ||
        typeQuery !== "" ||
        typeQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
        );
      } else {
        router.push(`${pathname}?country=${country}`);
      }
    } else {
      setCountry("");
      if (
        startDateQuery !== "" ||
        startDateQuery !== null ||
        endDateQuery !== "" ||
        endDateQuery !== null ||
        countryQuery !== "" ||
        countryQuery !== null ||
        typeQuery !== "" ||
        typeQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=&type=${eventType}`,
        );
      } else {
        router.push(`${pathname}?country=`);
      }
    }
  };

  // -- Изменить тип мероприятия -- //
  const onChangeEventType = (value) => {
    if (value && !isNaN(value)) {
      setEventType(value);
      if (
        startDateQuery !== "" ||
        startDateQuery !== null ||
        endDateQuery !== "" ||
        endDateQuery !== null ||
        countryQuery !== "" ||
        countryQuery !== null ||
        typeQuery !== "" ||
        typeQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
        );
      } else {
        router.push(`${pathname}?country=${country}`);
      }
    } else {
      setEventType("");
      if (
        startDateQuery !== "" ||
        startDateQuery !== null ||
        endDateQuery !== "" ||
        endDateQuery !== null ||
        countryQuery !== "" ||
        countryQuery !== null ||
        typeQuery !== "" ||
        typeQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(
          `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=`,
        );
      } else {
        router.push(`${pathname}?type=`);
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
          placeholder={tForm("hostCountry")}
          value={
            country && country !== ""
              ? {
                  value: country,
                  label: getCountryLabel(country),
                }
              : null
          }
          onChange={onChangeCountry}
          options={
            eventsCountry?.data?.length &&
            eventsCountry?.data.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            })
          }
        />
        <Select
          allowClear
          placeholder={tForm("eventType")}
          value={
            eventType && eventType !== ""
              ? {
                  value: eventType,
                  label: getEventsTypeLabel(eventType),
                }
              : null
          }
          onChange={onChangeEventType}
          options={
            eventsType?.data?.length &&
            eventsType?.data.map(({ id, name }) => {
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
                  ({ id, event_date, event_date_end, image, slug, title }) => (
                    <BlogItem
                      key={id}
                      id={id}
                      event_date={event_date}
                      event_date_end={event_date_end}
                      image={image}
                      slug={slug}
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
            <EmptyBlock description="Результатов не найдено" />
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

export default EventsClient;
