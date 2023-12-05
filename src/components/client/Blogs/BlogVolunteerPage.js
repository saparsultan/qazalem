"use client";
import Image from "next/image";
import { Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "@/app/i18n/client";
import BackLink from "@/components/client/BackLink";
import VolunteerProfillePreview from "@/components/server/VolunteerProfillePreview";
import EmptyBlock from "@/components/server/EmptyBlock";

const BlogVolunteerPage = ({ data, lng }) => {
  const { t: tMessage } = useTranslation(lng, "message");
  const { t: tDefault } = useTranslation(lng, "default");
  const { t: tForm } = useTranslation(lng, "form");
  const [modal, contextHolder] = Modal.useModal();
  const infoConnect = async (phone) => {
    await modal.info({
      title: tMessage("contact"),
      content: phone,
      icon: <InfoCircleOutlined />,
    });
  };
  return (
    data && (
      <>
        <div className="blog-profile-preview__back">
          <BackLink lng={lng} small />
        </div>
        <VolunteerProfillePreview
          data={data}
          lng={lng}
          infoConnect={infoConnect}
        />
        {contextHolder}
        <div className="blog-profile-preview__head-block">
          <h3 className="title title-h3">{tDefault("skills")}</h3>
          <div className="blog-profile-preview__head-list">
            {data?.skills &&
              data?.skills.map(({ id, name }) => {
                return <span key={id}>{name}</span>;
              })}
          </div>
        </div>
        {!data?.education_description ? (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        ) : (
          <div className="blog-profile-preview__text-block">
            {data?.skills_description}
          </div>
        )}
        <div className="blog-profile-preview__head-block">
          <h3 className="title title-h3">{tForm("education")}</h3>
          <div className="blog-profile-preview__head-list">
            {data?.education &&
              data?.education.map(({ id, name }) => {
                return <span key={id}>{name}</span>;
              })}
          </div>
        </div>
        {!data?.education_description ? (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        ) : (
          <div className="blog-profile-preview__text-block">
            {data?.skills_description}
          </div>
        )}
        <div className="blog-profile-preview__head-block">
          <h3 className="title title-h3">Стали участниками</h3>
        </div>
        {!data?.becameparticipants ? (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        ) : (
          <div className="blog-profile-preview__text-block">
            <ol>
              {data?.becameparticipants &&
                data?.becameparticipants.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
            </ol>
          </div>
        )}
        <h3 className="title title-h3 blog-profile-preview__title-block">
          {tDefault("gallery")}
        </h3>
        {data?.gallery && data?.gallery.length < 1 ? (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        ) : (
          <div className="blog-profile-preview__video">
            {data?.gallery.map(({ id, image, created_at }) => {
              return (
                <div className="video-item" key={id}>
                  <div className="video-item-img">
                    <Image
                      quality={75}
                      src={image}
                      alt={created_at}
                      fill
                      sizes="(min-width: 808px) 50vw, 100vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    )
  );
};

export default BlogVolunteerPage;
