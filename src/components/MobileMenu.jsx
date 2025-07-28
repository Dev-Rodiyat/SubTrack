import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu({ onClose, navLinks }) { 
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
      <div className="bg-white h-full w-72 max-w-[90vw] p-6 shadow-lg flex flex-col animate-slide-in">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-gray-900">Menu</span>
          <button onClick={onClose}>
            <X size={24} className="text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={onClose}
              className={`text-base font-medium ${location.pathname === link.href
                ? "text-teal-600 font-semibold"
                : "text-gray-700 hover:text-teal-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}