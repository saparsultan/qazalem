"use client";
import React, { useState } from "react";
import { App, Button, Form, Input, Radio, Select } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import InformationService from "@/services/InformationService";
import { useTranslation } from "@/app/i18n/client";

const HelpClient = ({ lng }) => {
  const { t } = useTranslation(lng, "form");
  const { t: tMess } = useTranslation(lng, "message");
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [valueRadio, setValueRadio] = useState(0);

  const sosCountry = useQuery({
    queryKey: ["sosCountry"],
    queryFn: async () => {
      const { data } = await InformationService.getSOSCountry(lng);
      return data;
    },
  });

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const data = {
        county: values?.consulCountry,
        country_of_stay: values?.hostCountry,
        where_are_you: values?.yourLocation,
        tel_or_email: valueRadio === 0 ? values?.phone : values?.email,
        description:
          values?.situation !== undefined && values?.situation !== null
            ? values?.situation
            : "",
      };
      await InformationService.SOSRegister(data);
    },
    onSuccess: async () => {
      await message.success(tMess("successSubmitted"));
      await form.setFieldsValue({
        consulCountry: null,
        hostCountry: "",
        yourLocation: "",
        phone: "",
        email: "",
        situation: "",
      });
    },
    onError: async (error) => {
      console.log("Error help form", error);
      await message.error(tMess("errorSubmitted"));
    },
  });

  const onChange4 = ({ target: { value } }) => {
    setValueRadio(value);
  };

  const optionsConnect = [
    {
      label: t("labelPhone"),
      value: 0,
    },
    {
      label: "Email",
      value: 1,
    },
  ];
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      onFinish={onSubmitForm}
    >
      <Form.Item
        name="consulCountry"
        label={t("labelContactConsulate")}
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <Select
          placeholder={t("placeholderSelectConsulate")}
          style={{
            width: "100%",
          }}
          allowClear
          options={
            !sosCountry.isLoading &&
            sosCountry.isSuccess &&
            sosCountry?.data.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            })
          }
        />
      </Form.Item>
      <Form.Item
        label={t("labelHostCountry")}
        name="hostCountry"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <Input placeholder={t("placeholderCountryResidence")} />
      </Form.Item>
      <Form.Item
        label={t("labelWhereAreYou")}
        name="yourLocation"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <Input placeholder={t("placeholderLocation")} />
      </Form.Item>

      <Form.Item label={t("labelHowContact")} required>
        <Radio.Group
          options={optionsConnect}
          onChange={onChange4}
          value={valueRadio}
          optionType="button"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
          }}
        />
      </Form.Item>
      {valueRadio === 0 ? (
        <Form.Item
          name="phone"
          rules={[
            {
              pattern: /^[0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
              message: t("placeholderCorrectFormat"),
            },
            {
              required: true,
              message: t("requiredField"),
            },
          ]}
        >
          <Input placeholder="+7 (999) 999-99-99" />
        </Form.Item>
      ) : (
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: t("requiredField"),
            },
            {
              type: "email",
              message: t("rulesEmail"),
            },
          ]}
        >
          <Input placeholder={t("placeholderEmail")} />
        </Form.Item>
      )}
      <Form.Item label={t("labelDescribeSituation")} name="situation">
        <Input.TextArea placeholder={t("placeholderLocation")} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginBottom: "8px" }}
        >
          {t("send")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HelpClient;
