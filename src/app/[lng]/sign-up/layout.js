import AntdAppProvider from "@/providers/AntdAppProvider";

export default function SignUpLayout({ children, params: { lng } }) {
  return <AntdAppProvider>{children}</AntdAppProvider>;
}
