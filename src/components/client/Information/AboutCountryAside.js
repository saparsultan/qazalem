"use client";
import React from "react";
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import cx from "classnames";

export default function AboutCountryAside(data) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const searchQuery = searchParams.get("paragraph");
  const onSubmitNav = (id, link) => {
    router.push(`${pathname}?paragraph=${id}#${link}`);
  };

  const dataArray = [
    {
      id: 0,
      link: "",
      title: "Сипаттама",
    },
    {
      id: 1,
      link: "mcetoc_1gre0ig6n2v",
      title: "Орналасуы",
    },
    {
      id: 2,
      link: "mcetoc_1gre0ig6n30",
      title: "Аумағы",
    },
    {
      id: 3,
      link: "mcetoc_1gre0ig6n31",
      title: "Шекаралары",
    },
    {
      id: 4,
      link: "mcetoc_1gre0ig6n33",
      title: "Климат",
    },
  ];

  return (
    <aside className="about-country-aside">
      <ul className="list-reset about-country-list">
        {dataArray &&
          dataArray.map(({ id, link, title }) => {
            return (
              <li
                key={id}
                className={cx("about-country-list__item", {
                  active: id === +searchQuery,
                })}
              >
                <div onClick={() => onSubmitNav(id, link)}>{title}</div>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
