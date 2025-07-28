import { Pencil, Trash2, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionGridView({ 
  subscriptions = [], 
  onEdit, 
  onDelete,
}) {
  const navigate = useNavigate()

  const handleEdit = (e, subId) => {
    e.stopPropagation();
    onEdit(subId);
  };

  const handleDelete = (e, subscription) => {
    e.stopPropagation();
    onDelete(subscription);
  };

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
          <TrendingUp className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No subscriptions yet</h3>
        <p className="text-slate-500 text-center max-w-md">
          Start tracking your subscriptions to get insights into your spending patterns.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {subscriptions.map((sub) => (
        <div
          key={sub?.id}
          className="group relative bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-slate-300/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer overflow-hidden"
         onClick={() => navigate(`/subscription/${sub?.id}`)}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => handleEdit(e, sub.id)}
              className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 shadow-sm"
              title="Edit subscription"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => handleDelete(e, sub)}
              title="Delete subscription"
              className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-600 hover:text-red-600 hover:bg-red-50/80 transition-all duration-200 shadow-sm"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="flex justify-between items-start mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                sub.status === "active"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : sub.status === "upcoming"
                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                sub.status === "active" ? "bg-emerald-500" : 
                sub.status === "upcoming" ? "bg-amber-500" : "bg-red-500"
              }`}></div>
              {sub.status}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-slate-700 transition-colors">
              {sub.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              {sub.category}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                ₦{new Intl.NumberFormat("en-NG").format(sub.price)}
              </span>
              <span className="text-sm font-medium text-slate-500">
                /{sub.cycle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
            <Calendar size={14} className="text-slate-400" />
            <span className="font-medium">Renews {sub.renewDate}</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
        </div>
      ))}
    </div>
  );
}