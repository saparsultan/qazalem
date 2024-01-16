import AntdAppProvider from "@/providers/AntdAppProvider";

export default function HelpLayout({ children, params: { lng } }) {
  return <AntdAppProvider>{children}</AntdAppProvider>;
}
