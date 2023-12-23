"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { YA_METRIC_ID } from "@/utils/yametric";

export default function YandexMetrikaParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    ym(YA_METRIC_ID, "hit", url);
  }, [pathname, searchParams]);

  return null;
}
