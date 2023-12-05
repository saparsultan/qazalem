import { App } from "antd";
export default async function VolunteerLayout({ children, params: { lng } }) {
  return <App>{children}</App>;
}
