import AntdAppProvider from "@/providers/AntdAppProvider";
export default function VolunteerLayout({ children, params: { lng } }) {
  return <AntdAppProvider>{children}</AntdAppProvider>;
}
