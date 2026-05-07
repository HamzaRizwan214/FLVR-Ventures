import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import HowItWorks from "./pages/HowItWorks";
import Funds from "./pages/Funds";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import NextWave from "./pages/NextWave";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="funds" element={<Funds />} />
          <Route path="contact" element={<Contact />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies/:id" element={<CaseStudies />} />
          <Route path="next-wave/:id" element={<NextWave />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <LanguageProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </LanguageProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
