
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

/* ======================================
   LAZY LOADED PAGES
====================================== */

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Industries = lazy(() => import("./pages/Industries"));
const Quality = lazy(() => import("./pages/Quality"));

/* ======================================
   LIGHTWEIGHT PAGE LOADER
====================================== */

function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[55vh] items-center justify-center bg-white px-5"
    >
      <div className="flex flex-col items-center gap-4">

        {/* SIMPLE CSS SPINNER */}
        <div className="relative h-11 w-11">
          <div className="absolute inset-0 rounded-full border-[3px] border-[#E9AC12]/20" />

          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#E66A16] motion-reduce:animate-none" />
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#202A38]">
          Loading...
        </p>
      </div>
    </div>
  );
}

/* ======================================
   APP COMPONENT
====================================== */

function App() {
  return (
    <BrowserRouter>

      {/* SCROLL MANAGEMENT */}
      <ScrollToTop />

      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main
        id="main-content"
        className="relative min-h-[50vh]"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/products"
              element={<Product />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/industries"
              element={<Industries />}
            />

            <Route
              path="/quality"
              element={<Quality />}
            />

          </Routes>
        </Suspense>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
