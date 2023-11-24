import HeaderClient from "@/components/layout/Header.client";
import Nav from "@/components/layout/Nav";

export default async function Header({ lng, session }) {
  return (
    <HeaderClient lng={lng} session={session}>
      <Nav lng={lng} />
    </HeaderClient>
  );
}
