import Link from "next/link";
import { LINK_URLS } from "@/utils/constants";

const InformationCard = ({ id, name, image, link, lng }) => {
  return (
    <Link
      href={`${link}/${id}`}
      className="about-country__link bold"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="about-country__text">{name}</div>
    </Link>
  );
};

export default InformationCard;
