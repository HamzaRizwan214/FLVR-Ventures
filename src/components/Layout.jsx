import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import FloatingNav from "./FloatingNav";
import ScrollManager from "./ScrollManager";
import Footer from "./Footer";
import { ConceptModalProvider } from "@/contexts/ConceptModalContext";

export default function Layout() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  return (
    <ScrollManager>
      <ConceptModalProvider>
      <div className="relative min-h-screen w-full overflow-x-clip bg-[var(--bg-page)]">
        <FloatingNav />
        {/* Spacer for the fixed nav: bar height + its top offset. Home has none: its hero runs under the nav. */}
        {!home && (
          <div
            aria-hidden="true"
            className="h-[72px] md:h-[88px]"
          />
        )}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      </ConceptModalProvider>
    </ScrollManager>
  );
}
