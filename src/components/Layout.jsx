import React from "react";
import { Outlet } from "react-router-dom";
import FloatingNav from "./FloatingNav";
import ScrollManager from "./ScrollManager";
import Footer from "./Footer";

export default function Layout() {
  return (
    <ScrollManager>
      <div className="relative min-h-screen w-full overflow-x-clip bg-[var(--bg-page)]">
        <FloatingNav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollManager>
  );
}
