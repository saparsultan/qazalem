"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import InformationService from "@/services/InformationService";

const BookingClient = ({ lng }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["bookingList"],
    queryFn: async () => {
      const { data } = await InformationService.getBookingList(lng);
      return data;
    },
  });
  return (
    <div>
      {!isLoading && isSuccess && data ? (
        data?.results.map(({ id, continent, countries }) => {
          return (
            <Fragment key={id}>
              <div className="booking">
                <div className="booking__heading">{continent}</div>
                <ul className="booking__list">
                  {countries?.map(({ id, country, url }) => {
                    return (
                      <li key={id} className="booking__item">
                        <Link
                          href={`${url}`}
                          className="booking__link"
                          target="_blank"
                        >
                          <span>{country}</span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.825 8.48301L6.925 19.383C6.74167 19.5663 6.50833 19.658 6.225 19.658C5.94167 19.658 5.70833 19.5663 5.525 19.383C5.34167 19.1997 5.25 18.9663 5.25 18.683C5.25 18.3997 5.34167 18.1663 5.525 17.983L16.425 7.08301H10.825C10.5417 7.08301 10.3042 6.98717 10.1125 6.79551C9.92083 6.60384 9.825 6.36634 9.825 6.08301C9.825 5.79967 9.92083 5.56217 10.1125 5.37051C10.3042 5.17884 10.5417 5.08301 10.825 5.08301H18.825C19.1083 5.08301 19.3458 5.17884 19.5375 5.37051C19.7292 5.56217 19.825 5.79967 19.825 6.08301V14.083C19.825 14.3663 19.7292 14.6038 19.5375 14.7955C19.3458 14.9872 19.1083 15.083 18.825 15.083C18.5417 15.083 18.3042 14.9872 18.1125 14.7955C17.9208 14.6038 17.825 14.3663 17.825 14.083V8.48301Z" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Fragment>
          );
        })
      ) : (
        <Skeleton paragraph={{ rows: 8 }} />
      )}
    </div>
  );
};

export default BookingClient;
