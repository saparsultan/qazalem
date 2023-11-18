import { App } from "antd";

export default function ServicesLayout({ children, params: { lng } }) {
  return <App>{children}</App>;
}
