import React from "react";
import { Outlet } from "react-router-dom";
import FloatingNav from "./FloatingNav";
import ScrollManager from "./ScrollManager";
import Footer from "./Footer";

export default function Layout() {
  return (
    <ScrollManager>
      <div className="relative overflow-hidden w-full min-h-screen selection:bg-[var(--brand-primary)] selection:text-white">
        {/* Subtle unified background base */}
        <FloatingNav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollManager>
  );
}
