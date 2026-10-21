import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const Search = async (value) => {
    setSearch(value);

    if (value === "") {
      setProducts([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7058/api/Address/GetProductsBySearch?productname=${value}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const ProfileShow = () => {
    const IsLogin = localStorage.getItem("IsLogin");
    if (IsLogin === "true") {
      navigate("/myaccount");
    } else {
      navigate("/login");
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative border-b bg-white">
      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">

        {/* LEFT SECTION: Hamburger Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="text-2xl focus:outline-none md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <Link to="/" className="flex items-center gap-1">
            <span className="text-xl font-extrabold italic tracking-tight sm:text-2xl">
              itsPurevit
            </span>
           
          </Link>
        </div>

        {/* CENTER SECTION: Desktop Nav Links */}
        <div className="hidden items-center gap-6 text-sm md:flex lg:gap-8 lg:text-base">
          {/* SHOP DROPDOWN */}
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="relative cursor-pointer py-2"
          >
            <span className="font-medium">Shop All ▾</span>

            {open && (
              <div className="absolute left-0 top-full z-50 mt-1 w-[700px] rounded-xl bg-white p-6 shadow-xl lg:w-[900px]">
                <div className="grid grid-cols-2 text-sm">
                  <div>
                    <p className="mb-3 font-semibold text-blue-600">Shop All</p>
                    <ul className="space-y-2 text-gray-600">
                      <li>Shop For</li>
                      <li>Women</li>
                      <li>Men</li>
                      <li>50+</li>
                    </ul>

                    <p className="mt-4 font-semibold text-blue-600">
                      Shop Supersaver Packs
                    </p>
                    <ul className="mt-2 space-y-2 text-gray-600">
                      <li>Shop Combos</li>
                      <li>Shop Triplets</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <img
                      src="/assets/bn1.jpeg"
                      alt="Banner"
                      className="h-48 w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="cursor-pointer hover:text-blue-600">About Us</span>
          <span className="cursor-pointer hover:text-blue-600">FAQ</span>
        </div>

        {/* RIGHT SECTION: Search (Desktop) + Profile + Cart */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Search Box - Hidden on Mobile, Visible on Desktop */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search Here..."
              className="w-48 rounded-full border px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none sm:w-60 lg:w-72 sm:text-sm"
              value={search}
              onChange={(e) => Search(e.target.value)}
            />

            {products.length > 0 && (
              <div className="absolute left-0 top-11 z-50 max-h-60 w-full overflow-y-auto rounded-lg bg-white shadow-lg">
                {products.map((item) => (
                  <div
                    key={item.productId}
                    className="p-2.5 text-xs hover:bg-gray-100 cursor-pointer sm:text-sm"
                    onClick={() => {
                      navigate(`/product/${item.productId}`);
                      setSearch("");
                      setProducts([]);
                    }}
                  >
                    {item.productName}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <button
            onClick={ProfileShow}
            className="p-1 text-xl sm:text-2xl focus:outline-none hover:opacity-75"
            aria-label="Profile"
          >
            👤
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-1">
            <span className="text-xl sm:text-2xl">🛒</span>

            {totalCartItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white sm:h-5 sm:w-5 sm:text-xs">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="border-t bg-white px-4 py-4 shadow-md md:hidden">
          {/* Mobile Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search Here..."
              className="w-full rounded-full border px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              value={search}
              onChange={(e) => Search(e.target.value)}
            />

            {products.length > 0 && (
              <div className="absolute left-0 top-9 z-50 max-h-48 w-full overflow-y-auto rounded-lg bg-white shadow-lg border">
                {products.map((item) => (
                  <div
                    key={item.productId}
                    className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${item.productId}`);
                      setSearch("");
                      setProducts([]);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.productName}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3 font-medium text-gray-700">
            <span className="cursor-pointer text-blue-600">Shop All</span>
            <span className="cursor-pointer pl-4 text-sm text-gray-500">
              Women / Men / 50+
            </span>
            <span className="cursor-pointer hover:text-blue-600">About Us</span>
            <span className="cursor-pointer hover:text-blue-600">FAQ</span>
          </div>
        </div>
      )}
    </div>
  );
}