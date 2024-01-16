import AntdAppProvider from "@/providers/AntdAppProvider";

export default function ResetPasswordLayout({ children, params: { lng } }) {
  return <AntdAppProvider>{children}</AntdAppProvider>;
}
