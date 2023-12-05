"use client";
import { useState } from "react";
import { Tabs } from "antd";
import { useTranslation } from "@/app/i18n/client";
import FormVolunteer from "@/components/client/Profile/Volunteer/FormVolunteer";
import FormGallery from "@/components/client/Profile/Volunteer/FormGallery";
import FormEducationName from "@/components/client/Profile/Volunteer/FormEducationName";
import FormEvent from "@/components/client/Profile/Volunteer/FormEvent";

const RegisterGuide = ({ lng, session }) => {
  const { t: tDefault } = useTranslation(lng, "default");
  const [infoGuide, setInfoGuide] = useState(null);
  const items = [
    {
      key: "1",
      label: session?.user?.guide_id
        ? tDefault("description")
        : tDefault("formRegistration"),
      children: (
        <FormVolunteer
          setInfoGuide={setInfoGuide}
          lng={lng}
          session={session}
        />
      ),
    },
    {
      key: "2",
      label: tDefault("gallery"),
      children: <FormGallery lng={lng} session={session} />,
    },
    {
      key: "3",
      label: tDefault("events"),
      children: <FormEvent lng={lng} session={session} />,
    },
    {
      key: "4",
      label: tDefault("educationName"),
      children: <FormEducationName lng={lng} session={session} />,
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
