import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Industries from "./pages/Industries";
import Quality from "./pages/Quality";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      {/* PAGE CONTENT */}
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/quality" element={<Quality />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
