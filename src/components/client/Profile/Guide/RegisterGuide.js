"use client";
import { useState } from "react";
import { Tabs } from "antd";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/app/i18n/client";
import FormGuide from "@/components/client/Profile/Guide/FormGuide";
import FormGuideVideo from "@/components/client/Profile/Guide/FormGuideVideo";
import CommentList from "@/components/client/Profile/Guide/CommentList";

const RegisterGuide = ({ lng }) => {
  const { data: session } = useSession();
  const { t: tDefault } = useTranslation(lng, "default");
  const [infoGuide, setInfoGuide] = useState(null);
  const items = [
    {
      key: "1",
      label: session?.user?.guide_id
        ? tDefault("description")
        : tDefault("formRegistration"),
      children: <FormGuide setInfoGuide={setInfoGuide} lng={lng} />,
    },
    {
      key: "2",
      label: tDefault("mySuggestions"),
      children: <FormGuideVideo lng={lng} />,
    },
    {
      key: "3",
      label: tDefault("reviews"),
      children: <CommentList infoGuide={infoGuide} lng={lng} />,
    },
  ];

  return (
    <Tabs
      rootClassName="ant-form__tab-info"
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default RegisterGuide;
