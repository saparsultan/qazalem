import { App } from "antd";
export default async function GuideLayout({ children, params: { lng } }) {
  return <App>{children}</App>;
}
