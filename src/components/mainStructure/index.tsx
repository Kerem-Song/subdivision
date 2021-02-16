import React, { ReactChild, ReactChildren } from "react";
import Header from "../../components/header";
import Footer from "../footer";
import { SideBar } from "../sidebar/sideBar";

interface IChildren {
  children: ReactChild;
}
const MainStructure = ({ children }: IChildren) => {
  return (
    <main className="flex">
      <SideBar />
      <section className="p-2 bg-gray-200 w-full">
        <Header />
        {children}
        <Footer />
      </section>
    </main>
  );
};

export default MainStructure;
