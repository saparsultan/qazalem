import React from "react";
import Link from "next/link";

const MoreLink = ({ link, target, children, clasName }) => {
  return (
    <div className="more-link__wrap">
      <Link
        href={link}
        target={target ? "_blank" : ""}
        className={clasName ? `more-link ${clasName}` : "more-link"}
      >
        {children}
      </Link>
    </div>
  );
};

export default MoreLink;
