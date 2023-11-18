"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, Input, Button, Pagination } from "antd";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import NewsService from "@/services/NewsService";
import EmptyBlock from "@/components/server/EmptyBlock";

import { Collapse } from "antd";

const { Search } = Input;

const FaqClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation(lng, "form");
  const { t: tDefault } = useTranslation(lng, "default");

  // STATE
  const [direction, setDirection] = useState("");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const directionQuery =
    searchParams.get("direction") && searchParams.get("direction") !== null
      ? searchParams.get("direction")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (directionQuery && directionQuery !== "") {
      setDirection(+directionQuery);
    }
  }, [searchQuery, directionQuery]);

  const faqDirection = useQuery({
    queryKey: ["faqDirection"],
    queryFn: async () => {
      const { data } = await NewsService.getFaqDirection(lng);
      return data;
    },
  });

  const { isLoading, isSuccess, data } = useInfiniteQuery({
    queryKey: ["blogFaq", searchQuery, directionQuery, pagination, lng],
    queryFn: async () => {
      const getData = {
        direction: directionQuery,
        search: searchQuery,
        published_date: "",
        page: pagination,
        lang: lng,
      };
      const { data } = await NewsService.getFaq(getData);
      return data;
    },
  });

  const getDirectionLabel = (value) => {
    return (
      faqDirection?.data?.length &&
      faqDirection?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  // -- Применить фильтр -- //
  const onSubmitFilter = () => {
    router.push(`${pathname}?search=${search}&direction=${direction}`);
  };

  // -- Поиск -- //
  const onSearch = (value) => {
    setSearch(value);
    if (directionQuery !== "") {
      router.push(`${pathname}?search=${search}&direction=${direction}`);
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  // -- Изменить поиск -- //
  const onChangeSearch = (e) => {
    const target = e.target.value;
    if (target === "" && searchQuery !== "") {
      if (directionQuery !== "" || directionQuery !== null) {
        router.push(`${pathname}?search=${target}&direction=${direction}`);
      } else {
        router.push(`${pathname}?search=${target}`);
      }
      setSearch("");
    }
    setSearch(target);
  };

  // -- Изменить категорию -- //
  const onChangeDirection = (value) => {
    if (value && !isNaN(value)) {
      setDirection(value);
      if (
        directionQuery !== "" ||
        directionQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(`${pathname}?search=${search}&direction=${direction}`);
      } else {
        router.push(`${pathname}?direction=${direction}`);
      }
    } else {
      setDirection("");
      if (
        directionQuery !== "" ||
        directionQuery !== null ||
        searchQuery !== "" ||
        searchQuery !== null
      ) {
        router.push(`${pathname}?search=${search}&direction=`);
      } else {
        router.push(`${pathname}?direction=`);
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
        <Select
          allowClear
          placeholder={t("activityCategory")}
          value={
            direction && direction !== ""
              ? {
                  value: direction,
                  label: getDirectionLabel(direction),
                }
              : null
          }
          onChange={onChangeDirection}
          options={
            faqDirection?.data?.length &&
            faqDirection?.data.map(({ id, name }) => {
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
          {t("apply")}
        </Button>
      </div>
      <div className="publish-grid-wrap">
        <div className="publish-search">
          <Search
            placeholder={`${t("search")}...`}
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
          <div className="publish-grid publish-grid--one nogap publish-item">
            {data &&
              data?.pages[0]?.results.map(({ id, body_text, title }) => (
                <Collapse
                  key={id}
                  size="large"
                  defaultActiveKey={["1"]}
                  items={[
                    {
                      key: id,
                      label: title,
                      children: (
                        <div
                          dangerouslySetInnerHTML={{ __html: body_text }}
                          className="inner-html"
                        />
                      ),
                    },
                  ]}
                />
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

export default FaqClient;
