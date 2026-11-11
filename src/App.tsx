import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Repairs from "./pages/Repairs.jsx";
import Shop from "./pages/Shop.jsx";
import {
  CategoriesPage,
  NotFoundPage,
} from "./pages/Pages";

function ScrollToTopOnNavigation() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = scrollBehavior;
  }, [pathname, search]);

  return null;
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const storeProps = {
    cartCount,
    onAddToCart: () => setCartCount((count) => count + 1),
  };

  return (
    <>
      <ScrollToTopOnNavigation />
      <Routes>
        <Route path="/" element={<Home {...storeProps} />} />
        <Route path="/shop" element={<Shop {...storeProps} />} />
        <Route path="/categories" element={<CategoriesPage {...storeProps} />} />
        <Route path="/repairs" element={<Repairs {...storeProps} />} />
        <Route path="/about" element={<About {...storeProps} />} />
        <Route path="*" element={<NotFoundPage {...storeProps} />} />
      </Routes>
    </>
  );
}
