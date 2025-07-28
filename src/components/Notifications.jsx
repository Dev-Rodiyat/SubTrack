import { X, Trash2 } from "lucide-react";
import { useState } from "react";

const dummyNotifications = [
  { id: 1, message: "Your Netflix subscription is due tomorrow." },
  { id: 2, message: "You added Spotify Premium to your subscriptions." },
  { id: 3, message: "Amazon Prime was successfully renewed." },
];

export default function Notifications({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleDeleteOne = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
    if (confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-slate-600 hover:text-slate-800" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          <div className="flex justify-end px-4 py-2">
            {notifications.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="flex items-center space-x-1 text-sm text-rose-600 hover:text-rose-700"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear all</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">
            {notifications.length === 0 ? (
              <p className="text-slate-500 text-center mt-10">No notifications.</p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.id}
                  className="bg-slate-50 border rounded-lg px-4 py-3 flex justify-between items-start shadow-sm"
                >
                  <p className="text-sm text-slate-700">{note.message}</p>
                  <button
                    onClick={() => handleDeleteOne(note.id)}
                    className="text-rose-500 hover:text-rose-600 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
