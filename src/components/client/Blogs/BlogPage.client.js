import React from "react";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import LatestBlogsAside from "@/components/client/LatestBlogs/LatestBlogsAside";

const BlogPageClient = ({ lng, data, latestBlogs, link }) => {
  return (
    <section className="section publdet__container">
      <div className="container">
        <div className="publdet">
          <h2 className="title title-left title-h2 text-low bold publdet__title">
            {data?.title}
          </h2>
          <div className="publdet-wrap">
            <BlogContentPageClient data={data} lng={lng} />
            <aside className="publdet-aside">
              <div className="publdet-aside-wrapper">
                <h3 className="title title-h3 mdm publdet-aside__title">
                  {t("latestNews")}
                </h3>
                <LatestBlogsAside data={latestBlogs} link={link} lng={lng} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPageClient;
