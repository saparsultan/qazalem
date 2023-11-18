import React from "react";
import { AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "@/assets/img/icons/chevron-down.svg";
import Image from "next/image";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <Image className="chevron-down" src={chevronDown} alt="Chevron Down" />
      </>
    }
    className="accordion-item"
    buttonProps={{
      className: ({ isEnter }) =>
        `btn-reset accordion-btn ${isEnter && "accordion-btn--active"}`,
    }}
    contentProps={{ className: "accordion-content-wrap" }}
    panelProps={{ className: "accordion-content" }}
  />
);

export default AccordionItem;
