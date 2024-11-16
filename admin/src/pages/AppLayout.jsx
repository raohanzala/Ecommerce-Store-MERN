import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useState } from "react";

function AppLayout({ children }) {

  const [title, setTitle] = useState('')

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixed to the left side */}
      <SideBar />

      {/* Main content area */}
      <main className="flex flex-col w-full h-full">
        {/* Header fixed at the top */}
        <Header title={title} />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto bg-[#FAFAFA] py-10 px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
