import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { PageProvider } from "../PageContext";

export default function PageWrapper({ children }) {
  return (
    <>
      <PageProvider>
        <Header />
        {children}
        <Footer />
      </PageProvider>
    </>
  );
}
