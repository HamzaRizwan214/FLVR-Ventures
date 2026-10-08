import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Pages
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Funds from "./pages/Funds";
import Contact from "./pages/Contact";

// Keeps old /portfolio links working, including ?concept=
function LegacyStudioRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/studio${search}`} replace />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="funds" element={<Funds />} />
          <Route path="contact" element={<Contact />} />

          {/* Retired pages: send old links somewhere useful */}
          <Route path="portfolio" element={<LegacyStudioRedirect />} />
          <Route path="how-it-works" element={<Navigate to="/" replace />} />
          <Route path="about" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
