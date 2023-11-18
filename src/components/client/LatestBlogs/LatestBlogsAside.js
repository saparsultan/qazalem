"use client";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";
import { Skeleton } from "antd";
import { RedableFormat } from "@/utils/dayjs";

export default function LatestBlogsAside({ data, link, lng }) {
  return (
    <ul className="list-reset publdet-list">
      {data?.isLoading && !data?.isSuccess
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton
                  className="skeleton-latestNews__date"
                  paragraph={{
                    rows: 0,
                  }}
                  active
                  round
                />
                <Skeleton
                  className="skeleton-latestNews__text"
                  paragraph={{
                    rows: 1,
                  }}
                  active
                  round
                />
              </div>
            ))
        : data?.isSuccess &&
          data?.data?.data?.results?.length > 0 &&
          data?.data?.data?.results.map(({ id, published_date, title }) => {
            return (
              <li key={id} className="publdet-list__item">
                <div className="publdet-list__head">
                  <div className="publdet-list__date">
                    <RedableFormat
                      date={published_date}
                      lng={lng}
                      format="D MMMM YYYY"
                    />
                  </div>
                </div>
                <Link
                  href={`/${lng}/${link}/${id}`}
                  className="publdet-list__link"
                >
                  <LinesEllipsis
                    text={title}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Link>
              </li>
            );
          })}
    </ul>
  );
}
