import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import MobileMenu from "./MobileMenu";
import LOGO from "./../assets/SubTrack.png";
import { Link, useLocation } from "react-router-dom";
import Notifications from "./Notifications";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Subscriptions", href: "/subscriptions" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-12 py-3 border-b shadow-sm bg-white sticky top-0 z-50 print:hidden">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={LOGO} alt="Subtrack Logo" className="w-full h-12" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-teal-600 font-semibold"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative text-slate-600 hover:text-teal-600"
          >
            <Bell className="w-6 h-6" />
            {/* Optional badge */}
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Mobile Menu Icon */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </header>

      {/* Notifications Sidebar */}
      <Notifications
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu onClose={() => setMenuOpen(false)} navLinks={navLinks} />
      )}
    </>
  );
}
