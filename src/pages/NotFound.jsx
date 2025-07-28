import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const hasHistory = useRef(window.history.length > 1);

  const handleGoBack = () => {
    if (hasHistory.current) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-slate-800 mb-2">Page Not Found</p>
      <p className="text-slate-600 mb-6 max-w-md">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md transition"
      >
        Go Back
      </button>
    </div>
  );
}
