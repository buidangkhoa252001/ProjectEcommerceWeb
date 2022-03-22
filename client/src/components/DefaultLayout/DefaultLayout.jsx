import React from "react";
import Header from "../Header/Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <header className="header mb-2">
        <Header />
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
           footer
      </footer>
    </div>
  );
};