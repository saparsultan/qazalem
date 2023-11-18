"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Alert,
  App,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Space,
} from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "@/app/i18n/client";
import { ServicesService } from "@/services/InformationService";

const CheckboxGroup = Checkbox.Group;

const KazakhTourismClient = ({ lng }) => {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const [captcha, setCaptcha] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [yourVersionVisited, setYourVersionVisited] = useState("");
  const [yourAttracts, setYourAttracts] = useState("");
  const [yourBrands, setYourBrands] = useState("");
  const [yourFuture, setYourFuture] = useState("");

  const valueVisit = Form.useWatch("visitedKazakhstan", {
    form,
    preserve: true,
  });
  const valueBrand = Form.useWatch("haveYouHeardBrands", {
    form,
    preserve: true,
  });
  const valueFuture = Form.useWatch("futureVisiting", {
    form,
    preserve: true,
  });

  const valueAttracts = Form.useWatch("whatAttracts", {
    form,
    preserve: true,
  });

  const langCaptchaFunc = (lng) => {
    switch (lng) {
      case "en":
        return lng;
      case "ru":
        return lng;
      case "kk":
        return "ru";
      case "cn":
        return "zh-CN";
      default:
        return "en";
    }
  };

  const langCaptcha = langCaptchaFunc(lng);

  const visitedKazakhstan = useQuery({
    queryKey: ["visitedKazakhstanSelect"],
    queryFn: async () => {
      const { data } = await ServicesService.getVisitedKazakhstan(lng);
      return data;
    },
  });

  const attractsKazakhstan = useQuery({
    queryKey: ["attractsKazakhstanSelect"],
    queryFn: async () => {
      const { data } = await ServicesService.getKazakhstanAttracts(lng);
      return data;
    },
  });

  const cultureKazakhstan = useQuery({
    queryKey: ["cultureKazakhstanSelect"],
    queryFn: async () => {
      const { data } = await ServicesService.getKazakhstanCulture(lng);
      return data;
    },
  });

  const brandsKazakhstan = useQuery({
    queryKey: ["brandsKazakhstanSelect"],
    queryFn: async () => {
      const { data } = await ServicesService.getKazakhstanBrands(lng);
      return data.reverse();
    },
  });

  const futureKazakhstan = useQuery({
    queryKey: ["futureKazakhstanSelect"],
    queryFn: async () => {
      const { data } = await ServicesService.getVisitedKazakhstanFuture(lng);
      return data.reverse();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      await ServicesService.kazakhTourismRegister(data?.formData);
    },
    onSuccess: async () => {
      await notification.success({
        message: tMessage("success"),
        description: tMessage("successSubmitted"),
        placement: "topRight",
      });
      setYourFuture("");
      setYourBrands("");
      setYourAttracts("");
      setYourVersionVisited("");
      await form.setFieldsValue({
        visitedKazakhstan: null,
        whatAttracts: null,
        yourLocation: "",
        whatHistory: null,
        haveYouHeardBrands: null,
        futureVisiting: null,
        countryLive: "",
        cityOrRegion: "",
        whatAssociations: "",
        whatOpinion: "",
        infoAboutEvents: "",
        haveComments: "",
        infoContacts: "",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("errorSubmitted"),
        placement: "topRight",
      });
      console.error("Error submit form", error);
    },
  });

  const onSubmitForm = async (values) => {
    if (captcha) {
      const formData = {
        visited_kazakhstan: values?.visitedKazakhstan,
        attracts_in_kazakhstan: values?.whatAttracts,
        culture_and_history_kazakhstan: values?.whatHistory,
        kazakhstani_brands_or_products: values?.haveYouHeardBrands,
        visiting_Kazakhstan_in_the_future: values?.futureVisiting,
        country: values?.countryLive,
        region: values?.cityOrRegion,
        is_kazakhstan: values?.whatAssociations,
        visited_kazakhstan_your: yourVersionVisited,
        attracts_in_kazakhstan_your: yourAttracts,
        kazakhstan_world_media: values?.whatOpinion,
        kazakhstani_brands_or_products_yours: yourBrands,
        achievements_related_to_kazakhstan: values?.infoAboutEvents,
        visiting_Kazakhstan_in_the_future_yours: yourFuture,
        comments: values?.haveComments,
        contacts: values?.infoContacts,
      };
      setCaptchaError(false);
      await mutate({ formData });
    } else {
      setCaptchaError(true);
    }
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      onFinish={onSubmitForm}
      className="services-page-form"
    >
      <div className="services-page-form__field">
        <Form.Item
          name="countryLive"
          label={tForm("countryLive")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Form.Item
          name="cityOrRegion"
          label={tForm("cityOrRegion")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Form.Item
          name="whatAssociations"
          label={tForm("whatAssociations")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Alert message={tForm("reasonNotVisited")} type="info" />
        <Form.Item
          name="visitedKazakhstan"
          label={tForm("haveVisited")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Radio.Group>
            {!visitedKazakhstan.isLoading &&
              visitedKazakhstan.isSuccess &&
              visitedKazakhstan?.data.map(({ id, value }) => {
                return (
                  <Radio value={id} key={id}>
                    {value}
                  </Radio>
                );
              })}
          </Radio.Group>
        </Form.Item>
        {valueVisit && (
          <Input.TextArea
            className="services-page-form__input"
            onChange={(e) => setYourVersionVisited(e.target.value)}
          />
        )}
      </div>

      <div className="services-page-form__field">
        <Alert message={tForm("selectAllApply")} type="info" />
        <Form.Item
          name="whatAttracts"
          label={tForm("whatAttracts")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <CheckboxGroup>
            {attractsKazakhstan?.data &&
              attractsKazakhstan?.data.map(({ id, value }) => {
                return (
                  <Col key={id} span={24}>
                    <Checkbox value={id}>{value}</Checkbox>
                  </Col>
                );
              })}
          </CheckboxGroup>
        </Form.Item>
        {valueAttracts &&
          valueAttracts?.length > 0 &&
          valueAttracts.includes(7) && (
            <Input.TextArea
              className="services-page-form__input"
              onChange={(e) => setYourAttracts(e.target.value)}
            />
          )}
      </div>

      <div className="services-page-form__field">
        <Form.Item
          name="whatOpinion"
          label={tForm("whatOpinionMedia")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Form.Item
          name="whatHistory"
          label={tForm("howCulture")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              {cultureKazakhstan?.data &&
                cultureKazakhstan?.data.map(({ id, value }) => {
                  return (
                    <Radio key={id} value={id}>
                      {value}
                    </Radio>
                  );
                })}
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Alert message={tForm("indicateBrands")} type="info" />
        <Form.Item
          name="haveYouHeardBrands"
          label={tForm("youHeardBrands")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Radio.Group>
            {!brandsKazakhstan.isLoading &&
              brandsKazakhstan.isSuccess &&
              brandsKazakhstan?.data.reverse().map(({ id, value }) => {
                return (
                  <Radio value={id} key={id}>
                    {value}
                  </Radio>
                );
              })}
          </Radio.Group>
        </Form.Item>
        {valueBrand && (valueBrand === 1 || valueBrand === 3) && (
          <Input.TextArea
            className="services-page-form__input"
            onChange={(e) => setYourBrands(e.target.value)}
          />
        )}
      </div>

      <div className="services-page-form__field">
        <Form.Item
          name="infoAboutEvents"
          label={tForm("infoRecentEvents")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Alert message={tForm("beforeVisiting")} type="info" />
        <Form.Item
          name="futureVisiting"
          label={tForm("notExperience")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Radio.Group>
            {!futureKazakhstan.isLoading &&
              futureKazakhstan.isSuccess &&
              futureKazakhstan?.data.map(({ id, value }) => {
                return (
                  <Radio value={id} key={id}>
                    {value}
                  </Radio>
                );
              })}
          </Radio.Group>
        </Form.Item>
        {valueFuture && (valueFuture === 1 || valueFuture === 3) && (
          <Input.TextArea
            className="services-page-form__input"
            onChange={(e) => setYourFuture(e.target.value)}
          />
        )}
      </div>

      <div className="services-page-form__field">
        <Form.Item
          name="haveComments"
          label={tForm("haveComments")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <div className="services-page-form__field">
        <Alert message={tForm("emailOrSocial")} type="info" />
        <Form.Item
          name="infoContacts"
          label={tForm("yourContacts")}
          rules={[
            {
              required: true,
              message: tForm("requiredField"),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <ReCAPTCHA
        hl={langCaptcha}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={setCaptcha}
      />
      {captchaError && (
        <div className="form-captcha">{tForm("fillCaptcha")}</div>
      )}
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        style={{ width: "100%", marginBottom: "8px" }}
      >
        {tForm("send")}
      </Button>
    </Form>
  );
};

export default KazakhTourismClient;
