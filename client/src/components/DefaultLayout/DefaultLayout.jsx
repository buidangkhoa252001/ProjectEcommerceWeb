import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <header className="header mb-2">
        <Header />
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
           <Footer/>
      </footer>
    </div>
  );
};