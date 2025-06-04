import React from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout simples para páginas de marketing - sem dashboard sidebar
  return <>{children}</>;
}
