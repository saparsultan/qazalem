import HeaderClient from "@/components/layout/Header.client";
import Nav from "@/components/layout/Nav";

export default function Header({ lng }) {
  return (
    <HeaderClient lng={lng}>
      <Nav lng={lng} />
    </HeaderClient>
  );
}
