"use client";
import { useSession } from "next-auth/react";
import { Tabs } from "antd";
import ReactPlayer from "react-player/lazy";
import { EditTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { useTranslation } from "@/app/i18n/client";
import EmptyBlock from "@/components/server/EmptyBlock";

const GuideVideoList = ({
  data,
  isLoading,
  isSuccess,
  showDrawer,
  showDrawerEdit,
  lng,
}) => {
  const { t: tDefault } = useTranslation(lng, "default");
  const { data: session } = useSession();

  return session?.user && session?.user?.guide_id ? (
    <>
      <div className="video-item-add" onClick={() => showDrawer()}>
        <div className="video-item-add__btn">
          <PlusCircleTwoTone twoToneColor="#e3871c" />
          <div className="video-item-add__text">
            {tDefault("addSuggestion")}
          </div>
        </div>
      </div>
      <div className="video-list">
        {!isLoading &&
          isSuccess &&
          data.map((item) => {
            return (
              <div className="video-item" key={item?.id}>
                <div
                  className="video-item-edit"
                  onClick={() => showDrawerEdit(item)}
                >
                  <EditTwoTone />
                </div>
                <div className="video-item-head">
                  <div className="player-wrapper">
                    <ReactPlayer
                      className="react-player"
                      controls
                      url={item.url}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
                <div className="video-item-text">
                  <Tabs
                    rootClassName="video-item-tab"
                    defaultActiveKey="1"
                    items={[
                      {
                        key: "1",
                        label: "Kz",
                        children: item?.description_kk,
                      },
                      {
                        key: "2",
                        label: "Ru",
                        children: item?.description_ru,
                      },
                      {
                        key: "3",
                        label: "En",
                        children: item?.description_en,
                      },
                      {
                        key: "4",
                        label: "Cn",
                        children: item?.description_cn,
                      },
                    ]}
                  />
                  <div className="video-item-text__footer">
                    <div className="video-item-text__footer-type">
                      {item?.type_ex?.name}
                    </div>
                    <div className="video-item-text__footer-price">
                      {item?.price} тг.
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  ) : (
    <EmptyBlock description={tDefault("toAddSuggestion")} />
  );
};

export default GuideVideoList;
