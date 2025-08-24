"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + searchParams.toString();
    // Track page views
    window.gtag?.("config", "G-EBVL3K8WM7", {
      page_path: url,
    });
  }, [pathname, searchParams]);
}
