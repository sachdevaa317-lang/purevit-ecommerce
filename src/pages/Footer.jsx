import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 px-6 sm:px-8 md:px-16 py-10 text-sm">
      {/* BRAND & TAGLINE SECTION */}
      <div className="mb-8 text-left">
        <div
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1 cursor-pointer"
        >
          <span className="text-2xl font-extrabold italic tracking-tight text-gray-900">
            itsPurevit
          </span>
          <span className="text-blue-500 text-2xl font-black">⚡</span>
        </div>
        <p className="mt-2 text-gray-600 font-medium">
          Your trusted health & wellness partner.
        </p>
      </div>

      {/* FOOTER LINKS GRID - ALL LEFT ALIGNED */}
      <div className="grid grid-cols-1 gap-8 text-left sm:grid-cols-2 md:grid-cols-4">
        {/* QUICK LINKS */}
        <div>
          <h4 className="font-bold text-gray-900 text-base mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li
              onClick={() => navigate("/shop")}
              className="cursor-pointer hover:text-blue-600"
            >
              Shop
            </li>
            <li
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-blue-600"
            >
              About Us
            </li>
            <li
              onClick={() => navigate("/faq")}
              className="cursor-pointer hover:text-blue-600"
            >
              FAQ
            </li>
          </ul>
        </div>

        {/* CUSTOMER HELP */}
        <div>
          <h4 className="font-bold text-gray-900 text-base mb-3">Help</h4>
          <ul className="space-y-2 text-gray-600">
            <li
              onClick={() => navigate("/support")}
              className="cursor-pointer hover:text-blue-600"
            >
              Support
            </li>
            <li
              onClick={() => navigate("/terms")}
              className="cursor-pointer hover:text-blue-600"
            >
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="font-bold text-gray-900 text-base mb-3">Contact</h4>
          <div className="space-y-1 text-gray-600">
            <p>orders@Purevitshop.in</p>
            <p>+91 7065089185</p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 border-t border-gray-200 pt-6 text-left sm:text-center text-xs text-gray-500">
        © 2026 Purevit. All rights reserved.
      </div>
    </footer>
  );
}