"use client";
import { ConfigProvider } from "antd";

export default function AntdConfigProvider({ theme, locale, children }) {
  return (
    <ConfigProvider theme={theme} locale={locale}>
      {children}
    </ConfigProvider>
  );
}
