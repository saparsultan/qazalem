"use client";
import { App } from "antd";

export default function AntdAppProvider({ children }) {
  return <App>{children}</App>;
}
