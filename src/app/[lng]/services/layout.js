import AntdAppProvider from "@/providers/AntdAppProvider";

export default function ServicesLayout({ children, params: { lng } }) {
  return <AntdAppProvider>{children}</AntdAppProvider>;
}
