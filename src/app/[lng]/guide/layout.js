import AntdAppProvider from "@/providers/AntdAppProvider";
export default function GuideLayout({ children, params: { lng } }) {
  return <AntdAppProvider>{children}</AntdAppProvider>;
}
