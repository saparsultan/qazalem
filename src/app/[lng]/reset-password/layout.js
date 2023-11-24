import { App } from "antd";

export default async function ResetPasswordLayout({
  children,
  params: { lng },
}) {
  return <App>{children}</App>;
}
