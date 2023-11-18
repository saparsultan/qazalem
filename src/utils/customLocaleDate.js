// customLocale.js
import dayjs from "dayjs";

const locale = {
  name: "custom",
  weekdays: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  // ... другие настройки локализации ...
};

dayjs.locale(locale, null, true);
