"use client";
import React, { useCallback, useState } from "react";
import { App, Form, Steps } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import beforeUpload from "@/utils/beforeUpload";
import AuthService from "@/services/AuthService";
import StepFirst from "@/components/auth/StepFirst";
import StepSecond from "@/components/auth/StepSecond";
import StepThird from "@/components/auth/StepThird";
import StepFourth from "@/components/auth/StepFourth";
const SignupClient = ({ lng }) => {
  const { t: tDef } = useTranslation(lng, "default");
  const { t: tMessage } = useTranslation(lng, "message");
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [emailCheck, setEmailCheck] = useState(false);

  // Basic
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarForm, setAvatarForm] = useState(null);

  // Personal
  const [birthDate, setBirthDate] = useState(null);
  const [iin, setInn] = useState("");
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState("");
  const [citizenShip, setCitizenShip] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState();
  const [course, setCourse] = useState();
  const [speciality, setSpeciality] = useState("");
  const [studies, setStudies] = useState("");

  // Social
  const [facebook, setFacebook] = useState("");
  const [twit, setTwit] = useState("");
  const [insta, setInsta] = useState("");
  const [youTube, setYouTube] = useState("");
  const [tikTok, setTikTok] = useState("");
  const [discord, setDiscord] = useState("");
  const [vk, setVk] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  // Additional
  const [relocate, setRelocate] = useState("");
  const [ability, setAbility] = useState("");
  const [instrument, setInstrument] = useState("");
  const [benefit, setBenefit] = useState("");
  const [volunteer, setVolunteer] = useState("");

  const steps = [
    {
      title: tDef("titleMainData"),
      content: "basic",
    },
    {
      title: tDef("titlePersonalData"),
      content: "personal",
    },
    {
      title: tDef("titleSocialData"),
      content: "social",
    },
    {
      title: tDef("titleAdditionalData"),
      content: "additional",
    },
  ];

  const handleChangeEmail = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value = e.target.value;
    setEmail(value);
    if (emailRegex.test(value)) {
      try {
        await AuthService.emailExists(value);
        setEmailCheck(true);
      } catch (e) {
        if (e.response.status === 404) {
          setEmailCheck(false);
        }
      }
    }
  };
  const onChangeAvatar = (imageList) => {
    if (imageList && imageList.length) {
      beforeUpload(message, imageList[0]?.file).then((res) => {
        if (res === true) {
          setAvatar(imageList);
          const formData = new FormData();
          formData.append("image", imageList[0].file);
          setAvatarForm(formData.get("image"));
        }
      });
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleNextStep = useCallback(() => {
    setCurrent(current + 1);
  }, [current]);

  const handlePrevStep = useCallback(() => {
    setCurrent(current - 1);
  }, [current]);

  const formatDateYear = birthDate?.$y;
  const formatDateMonth =
    birthDate?.$M + 1 < 10 ? `0${birthDate?.$M + 1}` : birthDate?.$M + 1;
  const formatDateDay =
    birthDate?.$D < 10 ? `0${birthDate?.$D}` : birthDate?.$D;
  const newformatDate =
    !birthDate || !birthDate === null
      ? null
      : `${formatDateYear}-${formatDateMonth}-${formatDateDay}`;

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async () => {
      const { data } = await AuthService.registerStepFirst(
        name,
        surname,
        middlename,
        email,
        gender,
        password,
        avatarForm,
      );
      await AuthService.registerStepSecond(
        data?.access,
        iin,
        citizenShip,
        activity,
        country,
        newformatDate,
        city,
        phone,
        speciality,
        course,
        studies,
      );
      await AuthService.registerStepThird(
        data?.access,
        facebook,
        insta,
        tikTok,
        vk,
        twit,
        youTube,
        discord,
        linkedIn,
      );
      await AuthService.registerStepFourth(
        data?.access,
        relocate,
        instrument,
        volunteer,
        ability,
        benefit,
      );
    },
    onSuccess: async () => {
      await notification.success({
        message: tMessage("success"),
        description: tMessage("registerSuccess"),
        placement: "topRight",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("registerError"),
        placement: "topRight",
      });
      console.error("Error registration", error);
    },
  });

  return (
    <>
      <Steps current={current} items={items} className="form-steps" />
      <div className="signup-content">
        <div className="container container-form">
          {steps[current].content === "basic" && (
            <StepFirst
              lng={lng}
              form={form}
              onChangeAvatar={onChangeAvatar}
              onFinish={handleNextStep}
              setName={setName}
              setSurname={setSurname}
              setMiddlename={setMiddlename}
              setGender={setGender}
              setEmail={handleChangeEmail}
              setPassword={setPassword}
              avatar={avatar}
              emailCheck={emailCheck}
            />
          )}
          {steps[current].content === "personal" && (
            <StepSecond
              lng={lng}
              form={form}
              onFinish={handleNextStep}
              onBack={handlePrevStep}
              setBirthDate={setBirthDate}
              setInn={setInn}
              setCountry={setCountry}
              setPhone={setPhone}
              setCitizenShip={setCitizenShip}
              setCity={setCity}
              setActivity={setActivity}
              setCourse={setCourse}
              setSpeciality={setSpeciality}
              setStudies={setStudies}
            />
          )}
          {steps[current].content === "social" && (
            <StepThird
              lng={lng}
              form={form}
              onFinish={handleNextStep}
              onBack={handlePrevStep}
              setFacebook={setFacebook}
              setTwit={setTwit}
              setInsta={setInsta}
              setYouTube={setYouTube}
              setTikTok={setTikTok}
              setDiscord={setDiscord}
              setVk={setVk}
              setLinkedIn={setLinkedIn}
            />
          )}
          {steps[current].content === "additional" && (
            <StepFourth
              lng={lng}
              form={form}
              onFinish={onSubmitForm}
              onBack={handlePrevStep}
              setRelocate={setRelocate}
              setAbility={setAbility}
              setInstrument={setInstrument}
              setBenefit={setBenefit}
              setVolunteer={setVolunteer}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SignupClient;
