import React from "react";

export function Page({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">{title}</h1>
        <div className="page__right">{right}</div>
      </header>

      <section className="page__content">{children}</section>
    </main>
  );
}
