"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { App, Button, DatePicker, Form, Input, Select, Skeleton } from "antd";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useTranslation } from "@/app/i18n/client";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
const PersonalInfo = ({ lng }) => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const queryClient = useQueryClient();
  const [date, setDate] = useState("");

  const configs = useQuery({
    queryKey: ["configRegister"],
    queryFn: async () => {
      const { data } = await AuthService.config(lng);
      return data;
    },
  });

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["userPersonal", session?.user?.id, session?.accessToken],
    queryFn: async () => {
      const sessionId =
        session && session?.user && session?.user?.id ? session?.user?.id : "";
      const { data } = await UserService.getUserPersonal(
        sessionId,
        session?.accessToken,
      );
      return data;
    },
  });
  const dateLocal = dayjs(new Date(data?.pages[0]?.date_of_birth));

  useEffect(() => {
    form.setFieldsValue({
      iin: data?.pages[0]?.iin_p_d,
      birthDate: dateLocal,
      country: data?.pages[0]?.country,
      city: data?.pages[0]?.city,
      natonality: data?.pages[0]?.citizenship,
      scopeActivity: data?.pages[0]?.field_of_activity,
      phone: data?.pages[0]?.phone_number,
      course: data?.pages[0]?.course,
      studies: data?.pages[0]?.education,
      speciality: data?.pages[0]?.profession,
    });
  }, [isSuccess]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const startDateSrc = date
        ? dayjs(new Date(date)).format("YYYY-MM-DD")
        : null;
      const formData = {
        iin_p_d: value?.iin,
        citizenship: value?.natonality,
        field_of_activity: value?.scopeActivity,
        country: value?.country,
        date_of_birth: startDateSrc,
        city: value?.city,
        phone_number: value?.phone,
        profession: value?.speciality,
        course: value?.course,
        education: value?.studies,
      };
      await UserService.updatePersonal(
        session?.user?.id,
        session?.accessToken,
        formData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["userPersonal"]);
      await notification.success({
        message: tMessage("success"),
        description: tMessage("updateProfileSuccess"),
        placement: "topRight",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("updateProfileError"),
        placement: "topRight",
      });
      console.error("Error update personal info", error);
    },
  });
  return (
    <div className="profile-form">
      <Form layout="vertical" form={form} onFinish={onSubmitForm}>
        {isLoading && !isSuccess ? (
          <Skeleton
            paragraph={{
              rows: 8,
            }}
          />
        ) : (
          <>
            <div className="form-row">
              <div className="form-item">
                <Form.Item name="birthDate" label={tForm("labelBirth")}>
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    value={date}
                    onChange={(e) => setDate(e)}
                  />
                </Form.Item>
                <Form.Item name="country" label={tForm("labelCountry")}>
                  <Select
                    placeholder={tForm("placeholderSelectCountry")}
                    allowClear
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
                <Form.Item
                  name="natonality"
                  label={tForm("labelCitizenship")}
                  rules={[
                    {
                      required: true,
                      message: tForm("required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={tForm("placeholderSelectCitizenship")}
                    style={{
                      width: "100%",
                    }}
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
                <Form.Item
                  name="scopeActivity"
                  label={tForm("labelFieldActivity")}
                  className="ddd"
                >
                  <Select
                    placeholder={tForm("placeholderSelectArea")}
                    style={{
                      width: "100%",
                    }}
                    allowClear
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
                <Form.Item name="speciality" label={tForm("labelSpeciality")}>
                  <Input placeholder={tForm("placeholderSpecialty")} />
                </Form.Item>
              </div>

              <div className="form-item">
                <Form.Item
                  name="iin"
                  label={tForm("labelIin")}
                  rules={[
                    {
                      required: true,
                      pattern: /^\d{12}$/,
                      message: tForm("requiredIin"),
                    },
                  ]}
                >
                  <Input placeholder="____________" />
                </Form.Item>

                <Form.Item name="phone" label={tForm("labelPhone")}>
                  <Input placeholder="+7 (___) ___-__-__" />
                </Form.Item>

                <Form.Item name="city" label={tForm("labelCity")}>
                  <Input placeholder={tForm("placeholderCityResidence")} />
                </Form.Item>

                <Form.Item
                  name="course"
                  label={tForm("labelCourse")}
                  rules={[
                    {
                      pattern: /^\d+$/,
                      message: tForm("rulesNumericValue"),
                    },
                  ]}
                >
                  <Input placeholder={tForm("placeholderCourse")} />
                </Form.Item>

                <Form.Item name="studies" label={tForm("labelStudies")}>
                  <Input placeholder={tForm("placeholderStudios")} />
                </Form.Item>
              </div>
            </div>
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              htmlType="submit"
            >
              {tForm("save")}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default PersonalInfo;
