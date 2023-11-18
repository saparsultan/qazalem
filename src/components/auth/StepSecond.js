"use client";
import { Form, Input, Select, DatePicker, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import InputMask from "react-input-mask";
import AuthService from "@/services/AuthService";
import { useTranslation } from "@/app/i18n/client";

const StepSecond = ({
  lng,
  form,
  onFinish,
  onBack,
  setBirthDate,
  setInn,
  setCountry,
  setPhone,
  setCitizenShip,
  setCity,
  setActivity,
  setCourse,
  setSpeciality,
  setStudies,
}) => {
  const { t } = useTranslation(lng, "form");
  const configs = useQuery({
    queryKey: ["configRegister"],
    queryFn: async () => {
      const { data } = await AuthService.config(lng);
      return data;
    },
  });

  // const onChange = (date, dateString) => {
  //   console.log("date", date);
  //   console.log("dateString", dateString);
  // };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="form-row">
        <div className="form-item">
          <Form.Item name="birthDate" label={t("labelBirth")}>
            <DatePicker
              onChange={(date) => setBirthDate(date)}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="country" label={t("labelCountry")}>
            <Select
              placeholder={t("placeholderSelectCountry")}
              allowClear
              onChange={(name) => setCountry(name)}
              options={
                configs?.data?.country.length &&
                configs?.data?.country.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item name="natonality" label={t("labelCitizenship")}>
            <Select
              placeholder={t("placeholderSelectCitizenship")}
              style={{
                width: "100%",
              }}
              onChange={(name) => setCitizenShip(name)}
              allowClear
              options={
                configs?.data?.citizenship.length &&
                configs?.data?.citizenship.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item name="scopeActivity" label={t("labelFieldActivity")}>
            <Select
              placeholder={t("placeholderSelectArea")}
              style={{
                width: "100%",
              }}
              allowClear
              onChange={(name) => setActivity(name)}
              options={
                configs?.data?.field_of_activity.length &&
                configs?.data?.field_of_activity.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item name="speciality" label={t("labelSpeciality")}>
            <Input
              placeholder={t("placeholderSpecialty")}
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item
            name="iin"
            label={t("labelIin")}
            rules={[
              {
                pattern: /^\d{12}$/,
                message: t("requiredField"),
              },
            ]}
          >
            <InputMask
              mask="999999999999"
              maskChar="_"
              onChange={(e) => setInn(e.target.value)}
            >
              {() => <Input placeholder="____________" />}
            </InputMask>
          </Form.Item>
          <Form.Item name="phone" label={t("labelPhone")}>
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              onChange={(e) => setPhone(e.target.value)}
            >
              {() => <Input placeholder="+7 (___) ___-__-__" />}
            </InputMask>
          </Form.Item>
          <Form.Item name="city" label={t("labelCity")}>
            <Input
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("placeholderCityResidence")}
            />
          </Form.Item>
          <Form.Item
            name="course"
            label={t("labelCourse")}
            rules={[
              {
                pattern: /^\d+$/,
                message: t("rulesNumericValue"),
              },
            ]}
          >
            <Input
              onChange={(e) => setCourse(e.target.value)}
              placeholder={t("placeholderEnterCourse")}
            />
          </Form.Item>
          <Form.Item name="studies" label="Учеба">
            <Input
              onChange={(e) => setStudies(e.target.value)}
              placeholder={t("placeholderEnterEducation")}
            />
          </Form.Item>
        </div>
      </div>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
        <Button onClick={onBack}>{t("prev")}</Button>
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          {t("next")}
        </Button>
      </div>
    </Form>
  );
};

export default StepSecond;
