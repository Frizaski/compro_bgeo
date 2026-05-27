"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultSiteContent, type SiteContent } from "@/data/site-content";

const SiteContentContext = createContext<SiteContent>(defaultSiteContent);

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}
