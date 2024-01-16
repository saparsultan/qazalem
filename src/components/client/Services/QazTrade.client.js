"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Pagination, Select, Skeleton } from "antd";
import { useTranslation } from "@/app/i18n/client";
import { ServicesService } from "@/services/InformationService";
import EmptyBlock from "@/components/server/EmptyBlock";

const QazTradeClient = ({ lng }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(lng, "form");
  const { t: tDefault } = useTranslation(lng, "default");
  const [region, setRegion] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [bin, setBin] = useState("");
  const [industry, setIndustry] = useState("");
  const [exportedProducts, setExportedProducts] = useState("");
  const [productCode, setProductCode] = useState("");
  const [salesGeolocation, setSalesGeolocation] = useState("");
  const [pagination, setPagination] = useState(1);

  const { data: dataRegion } = useQuery({
    queryKey: ["qazTradeRegions"],
    queryFn: async () => {
      const { data } = await ServicesService.getQazTradeRegion(lng);
      return data;
    },
  });

  const { data: dataIndustry } = useQuery({
    queryKey: ["qazTradeIndustry"],
    queryFn: async () => {
      const { data } = await ServicesService.getQazTradeIndustry(lng);
      return data;
    },
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "qazTradeContent",
      region,
      companyName,
      bin,
      industry,
      exportedProducts,
      productCode,
      salesGeolocation,
      pagination,
    ],
    queryFn: async () => {
      const queryParams = {
        lang: lng,
        region: region,
        industry: industry,
        code__icontains: productCode,
        manufacture_name__icontains: companyName,
        bin__icontains: bin,
        bin: "",
        export_products__icontains: exportedProducts,
        export_products: "",
        gelocation__icontains: salesGeolocation,
        gelocation: "",
        search: "",
        page: pagination,
        page_size: 25,
      };
      const { data } = await ServicesService.getQazTradeContent(queryParams);
      return data;
    },
  });

  const onFinish = (value) => {
    if (value.region !== undefined) {
      setRegion(value.region);
    }
    if (value.companyName !== undefined) {
      setCompanyName(value.companyName);
    }
    if (value.bin !== undefined) {
      setBin(value.bin);
    }
    if (value.industry !== undefined) {
      setIndustry(value.industry);
    }
    if (value.exportedProducts !== undefined) {
      setExportedProducts(value.exportedProducts);
    }
    if (value.productCode !== undefined) {
      setProductCode(value.productCode);
    }
    if (value.salesGeolocation !== undefined) {
      setSalesGeolocation(value.salesGeolocation);
    }
  };

  const onReset = () => {
    setRegion("");
    setCompanyName("");
    setBin("");
    setIndustry("");
    setExportedProducts("");
    setProductCode("");
    setSalesGeolocation("");
  };
  const onChangeSize = (current) => {
    setPagination(current);
  };

  return (
    <div className="services-page__content">
      <div className="filter-content">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="form-row">
            <div className="form-item">
              <Form.Item name="region" label={t("cityOrRegion")}>
                <Select
                  placeholder={t("placeholderSelectRegion")}
                  style={{
                    width: "100%",
                  }}
                  allowClear
                  options={
                    dataRegion &&
                    dataRegion?.length &&
                    dataRegion.map(({ id, region }) => {
                      return {
                        value: id,
                        label: region,
                      };
                    })
                  }
                />
              </Form.Item>
              <Form.Item name="companyName" label={t("companyName")}>
                <Input placeholder={t("placeholderCompanyName")} />
              </Form.Item>
              <Form.Item name="bin" label={t("bin")}>
                <Input placeholder={t("placeholderBin")} />
              </Form.Item>
              <Form.Item name="industry" label={t("industry")}>
                <Select
                  placeholder={t("placeholderIndustry")}
                  style={{
                    width: "100%",
                  }}
                  allowClear
                  options={
                    dataIndustry &&
                    dataIndustry?.length &&
                    dataIndustry.map(({ id, name }) => {
                      return {
                        value: id,
                        label: name,
                      };
                    })
                  }
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <Form.Item name="exportedProducts" label={t("exportedProducts")}>
                <Input placeholder={t("placeholderExportedProducts")} />
              </Form.Item>
              <Form.Item name="productCode" label={t("productCode")}>
                <Input placeholder={t("placeholderProductCode")} />
              </Form.Item>
              <Form.Item name="salesGeolocation" label={t("salesGeolocation")}>
                <Input placeholder={t("placeholderSalesGeolocation")} />
              </Form.Item>
            </div>
          </div>

          <div
            className="form-btns"
            style={{
              gap: "12px",
              margin: "24px 0",
            }}
          >
            <Button
              type="primary"
              style={{
                marginLeft: "auto",
              }}
              htmlType="submit"
            >
              {t("apply")}
            </Button>
            <Button onClick={onReset}>{t("reset")}</Button>
          </div>
        </Form>
      </div>
      {isLoading && <Skeleton />}
      {!isLoading && isSuccess && data && data.results.length > 0 ? (
        <div className="table-content__wrap">
          <div className="table-content">
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Регион</th>
                  <th>Наименование предприятия</th>
                  <th>БИН</th>
                  <th>Отрасль</th>
                  <th>Контактная информация</th>
                  <th>Номера телефонов</th>
                  <th>Email</th>
                  <th>Экспортируемая продукция</th>
                  <th>Код товара ТНВЭД/ОКЭД</th>
                  <th>Геолокация сбыта</th>
                  <th>Экспортирует?</th>
                  <th>Количество работников</th>
                </tr>
              </thead>
              <tbody>
                {isSuccess &&
                  data &&
                  data?.results.map((item, i) => {
                    return (
                      <tr key={item.id + i.toString()}>
                        <td>{item?.id}</td>
                        <td>{item?.region?.region}</td>
                        <td>{item?.manufacture_name}</td>
                        <td>{item?.bin}</td>

                        <td>{item?.industry?.name}</td>
                        <td>{item?.contact_information}</td>
                        <td>{item?.phone_numbers}</td>
                        <td>{item?.email}</td>
                        <td>{item?.export_products}</td>
                        <td>{item?.code}</td>
                        <td>{item?.gelocation}</td>
                        <td>{item?.has_export === true ? "Да" : ""}</td>
                        <td>{item?.count_empoyee}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="publish-empty">
            <EmptyBlock description={tDefault("noResultsFound")} />
          </div>
        )
      )}
      {!isLoading && isSuccess && data?.results.length > 0 && (
        <div className="publish-pagination">
          <Pagination
            onChange={onChangeSize}
            defaultCurrent={pagination}
            total={data?.count}
            pageSize={25}
          />
        </div>
      )}
    </div>
  );
};

export default QazTradeClient;
