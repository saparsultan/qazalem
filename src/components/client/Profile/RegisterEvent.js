"use client";
import { useSession } from "next-auth/react";
import { App, Button, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";

const RegisterEvent = ({ lng }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");

  const selectEvents = useQuery({
    queryKey: ["selectEvents"],
    queryFn: async () => {
      const { data } = await UserService.getSelectEvents(lng);
      return data;
    },
  });

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        events:
          values.eventType !== null &&
          values.eventType !== undefined &&
          values.eventType,
        format_event:
          values.eventFormat !== null && values.eventFormat !== undefined
            ? values.eventFormat
            : "",
        passport:
          values.passport !== null &&
          values.passport !== undefined &&
          values.passport,
        reviews:
          values.comments !== null && values.comments !== undefined
            ? values.comments
            : "",
        organization:
          values.organization !== null &&
          values.organization !== undefined &&
          values.organization,
        job_title:
          values.position !== null &&
          values.position !== undefined &&
          values.position,
      };
      await UserService.registerEvents(session?.accessToken, formData);
    },
    onSuccess: async () => {
      await message.success(tMessage("registerSuccessEvent"));
      await form.setFieldsValue({
        eventType: null,
        eventFormat: null,
        passport: null,
        comments: "",
        organization: "",
        position: "",
      });
    },
    onError: async (error) => {
      console.log("Error register event form", error);
      if (error.response.status === 409) {
        await message.error(error?.response?.data?.events);
      } else {
        await message.error(tMessage("registerError"));
      }
    },
  });

  return (
    <div className="profile-form">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        onFinish={onSubmitForm}
      >
        <Form.Item
          name="eventType"
          label={tForm("labelWhatEventTake")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Select
            placeholder={tForm("placeholderWhatEventTake")}
            style={{
              width: "100%",
            }}
            allowClear
            options={
              selectEvents?.data?.length &&
              selectEvents.data.map(({ id, title }) => {
                return {
                  value: id,
                  label: title,
                };
              })
            }
          />
        </Form.Item>
        <Form.Item
          name="organization"
          label={tForm("labelOrganization")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input placeholder={tForm("placeholderOrganization")} />
        </Form.Item>
        <Form.Item
          name="eventFormat"
          label={tForm("labelFormatEvent")}
          rules={[{ required: true, message: tForm("requiredField") }]}
        >
          <Select
            placeholder={tForm("placeholderFormatEvent")}
            style={{
              width: "100%",
            }}
            allowClear
            options={[
              {
                value: "ONLINE",
                label: tForm("online"),
              },
              {
                value: "OFFLINE",
                label: tForm("offline"),
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="position"
          label={tForm("labelPosition")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input placeholder={tForm("placeholderPosition")} />
        </Form.Item>
        <Form.Item
          name="passport"
          label={tForm("labelHavePassport")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Select
            placeholder={tForm("placeholderVariant")}
            style={{
              width: "100%",
            }}
            allowClear
            options={[
              {
                value: "YES",
                label: tForm("yes"),
              },
              {
                value: "NO",
                label: tForm("no"),
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="comments" label={tForm("labelComments")}>
          <Input placeholder={tForm("placeholderComments")} />
        </Form.Item>
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          {tForm("sendRequest")}
        </Button>
      </Form>
    </div>
  );
};

export default RegisterEvent;
