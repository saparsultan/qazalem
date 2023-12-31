import React from "react";
import { Skeleton } from "antd";
import BlogItem from "@/components/client/Blogs/BlogItem";
const BlogList = ({ data, isLoading, isSuccess, link, lng }) => {
  return (
    <div className="blog-list">
      {!isLoading && isSuccess && data?.results.length > 0
        ? data?.results.map(
            ({ id, image, published_date, title, subcategory }) => (
              <BlogItem
                key={id}
                id={id}
                image={image}
                date={published_date}
                title={title}
                subcategory={subcategory}
                link={link}
                lng={lng}
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
  );
};

export default BlogList;
