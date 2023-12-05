"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  DeleteFilled,
  EditTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "@/app/i18n/client";
import EmptyBlock from "@/components/server/EmptyBlock";
import React from "react";

const GuideVideoList = ({
  data,
  isLoading,
  isSuccess,
  showDrawer,
  showDrawerEdit,
  showDrawerDelete,
  lng,
}) => {
  const { t: tDefault } = useTranslation(lng, "default");
  const { data: session } = useSession();

  return session?.user && session?.user?.volunteer_id ? (
    <>
      <div className="video-item-add" onClick={() => showDrawer()}>
        <div className="video-item-add__btn">
          <PlusCircleTwoTone twoToneColor="#e3871c" />
          <div className="video-item-add__text">{tDefault("addImage")}</div>
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
                <div
                  className="comments-item__delete video-item-delete"
                  onClick={() => showDrawerDelete(item?.id)}
                >
                  <DeleteFilled
                    style={{
                      color: "#ff4d4d",
                    }}
                  />
                </div>
                <div className="video-item-img">
                  <Image
                    quality={75}
                    src={item?.image}
                    alt={item?.created_at}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  ) : (
    <EmptyBlock description={tDefault("toAddGallery")} />
  );
};

export default GuideVideoList;
