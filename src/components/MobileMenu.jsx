import { X } from "lucide-react";

export default function MobileMenu({ onClose, navLinks }) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xl font-semibold text-slate-800">Menu</span>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      <nav className="flex flex-col space-y-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-slate-700 text-lg font-medium hover:text-teal-600"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
