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
        {/* Spacer for the fixed nav: bar height + its top offset */}
        <div
          aria-hidden="true"
          className="h-[calc(60px+0.5rem)] sm:h-[calc(60px+0.75rem)] md:h-[calc(68px+0.75rem)]"
        />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollManager>
  );
}
