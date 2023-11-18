"use client";
import Image from "next/image";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";
import { RedableFormat } from "@/utils/dayjs";
const BlogItem = ({
  id,
  image,
  event_date,
  event_date_end,
  date,
  title,
  subcategory,
  link,
  lng,
}) => {
  return (
    <div className="blog-item">
      <div className="blog-item__img blog-item__img--big">
        <Image
          sizes="(max-width: 768px) 100vw"
          src={image}
          alt={title}
          width={100}
          height={100}
          placeholder="empty"
        />
      </div>
      <div className="blog-item__content">
        {subcategory && (
          <div className="blog-item__tag">
            {subcategory && subcategory?.name}
          </div>
        )}
        {event_date && event_date && (
          <div className="blog-item__tag">
            <RedableFormat date={event_date} lng={lng} format="D MMMM" />
            &nbsp;―&nbsp;
            <RedableFormat date={event_date_end} lng={lng} format="D MMMM" />
          </div>
        )}
        <Link href={`${link}/${id}`} className="blog-item__text sm-bold">
          {title}
        </Link>
        {date && (
          <div className="blog-item__date">
            <RedableFormat date={date} lng={lng} format="D MMMM, YYYY" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
