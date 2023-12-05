import { useEffect, useState } from "react";
import cx from "classnames";

export default function AboutCountryAside({ data }) {
  const [asideData, setAsideData] = useState([]);
  const [activeId, setActiveId] = useState("");
  const findElements = () => {
    const elements = document.querySelectorAll('[id^="mcetoc"]');
    const elementsArray = Array.from(elements);
    setAsideData(elementsArray);
  };

  const handleScroll = () => {
    let foundActive = false;
    asideData.forEach((item) => {
      if (foundActive) return;
      const element = document.getElementById(`${item.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top + window.scrollY < window.scrollY + window.innerHeight / 2 &&
          rect.bottom + window.scrollY > window.scrollY;
        if (isVisible) {
          setActiveId(item.id);
          foundActive = true;
        }
      }
    });
    if (!foundActive) {
      setActiveId(null);
    }
  };
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveId(id);
  };

  useEffect(() => {
    findElements();
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, asideData]);

  return (
    <aside className="about-country-aside">
      <ul className="list-reset about-country-list">
        {asideData &&
          asideData.map((item) => {
            return (
              <li
                key={item?.id}
                className={cx("about-country-list__item", {
                  active: activeId === item.id,
                })}
              >
                <div onClick={() => handleClick(item?.id)}>
                  {item?.innerText}
                </div>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
