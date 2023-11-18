"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Checkbox, Button } from "antd";
import { useTranslation } from "@/app/i18n/client";

const StepFourth = ({
  lng,
  form,
  onFinish,
  onBack,
  setRelocate,
  setAbility,
  setInstrument,
  setBenefit,
  setVolunteer,
}) => {
  const { t } = useTranslation(lng, "form");
  const valuesForm = Form.useWatch([], form);
  const personalValue = valuesForm?.personal;
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    personalValue === true ? setSubmittable(true) : setSubmittable(false);
  }, [personalValue]);
  const onChangePersonal = (e) => {
    setSubmittable(e.target.checked);
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item name="relocate" label={t("doYouWantMove")}>
        <Input
          onChange={(e) => setRelocate(e.target.value)}
          placeholder={t("youAnswer")}
        />
      </Form.Item>
      <Form.Item name="ability" label={t("whatAbilities")}>
        <Input
          onChange={(e) => setAbility(e.target.value)}
          placeholder={t("youAnswer")}
        />
      </Form.Item>
      <Form.Item name="instrument" label={t("whatInstrumentPlay")}>
        <Input
          onChange={(e) => setInstrument(e.target.value)}
          placeholder={t("youAnswer")}
        />
      </Form.Item>
      <Form.Item name="benefit" label={t("whatBringEvents")}>
        <Input
          onChange={(e) => setBenefit(e.target.value)}
          placeholder={t("youAnswer")}
        />
      </Form.Item>
      <Form.Item name="volunteer" label={t("youVolunteer")}>
        <Radio.Group onChange={(e) => setVolunteer(e.target.value)}>
          <Radio value={true}>{t("yes")}</Radio>
          <Radio value={false}>{t("no")}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="personal"
        valuePropName="checked"
        rules={[
          {
            required: true,
            message: t("requiredField"),
          },
        ]}
      >
        <Checkbox onChange={onChangePersonal}>{t("agreePersonal")}</Checkbox>
      </Form.Item>
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
          disabled={!submittable}
        >
          {t("signup")}
        </Button>
      </div>
    </Form>
  );
};

export default StepFourth;
