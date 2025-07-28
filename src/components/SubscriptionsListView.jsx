import { Pencil, Trash2, Calendar, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function SubscriptionListView({ subscriptions = [], onEdit, onDelete, onRowClick }) {
    const navigate = useNavigate();

  const handleEdit = (e, subId) => {
    e.stopPropagation()
    onEdit(subId)
  }

  const handleDelete = (e, subscription) => {
    e.stopPropagation()
    onDelete(subscription)
  }

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-6">
            <TrendingUp className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No subscriptions found</h3>
          <p className="text-slate-500 text-center max-w-md text-sm">
            Your subscription list will appear here once you start adding services.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60 min-w-max">
          <div
            className="grid gap-4 px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider w-full"
            style={{
              gridTemplateColumns:
                "minmax(180px, 2fr) minmax(120px, 1fr) minmax(140px, 1.5fr) minmax(150px, 1.5fr) minmax(120px, 1fr) minmax(100px, 1fr)",
              minWidth: "800px",
            }}
          >
            <div>Service</div>
            <div>Category</div>
            <div>Price</div>
            <div>Next Renewal</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 min-w-max">
          {subscriptions.map((sub, index) => (
            <div
              key={sub?.id}
              className="group grid gap-4 px-6 py-5 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent transition-all duration-200 cursor-pointer relative w-full"
              style={{
                gridTemplateColumns:
                  "minmax(180px, 2fr) minmax(120px, 1fr) minmax(140px, 1.5fr) minmax(150px, 1.5fr) minmax(120px, 1fr) minmax(100px, 1fr)",
                minWidth: "800px",
              }}
              onClick={() => navigate(`/subscription/${sub?.id}`)}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

              <div className="flex items-center min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors truncate">
                    {sub.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60 whitespace-nowrap">
                  {sub.category}
                </span>
              </div>

              <div className="flex items-center">
                <div>
                  <div className="font-bold text-slate-900 text-lg whitespace-nowrap">
                    ₦{new Intl.NumberFormat("en-NG").format(sub.price)}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">per {sub.cycle}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 whitespace-nowrap">{sub.renewDate}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${
                    sub.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : sub.status === "upcoming"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 ${
                      sub.status === "active"
                        ? "bg-emerald-500"
                        : sub.status === "upcoming"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  {sub.status}
                </span>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => handleEdit(e, sub.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex-shrink-0"
                    title="Edit subscription"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, sub)}
                    title="Delete subscription"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50/50 border-t border-slate-200/60 px-6 py-3">
        <div className="text-xs text-slate-500 font-medium">
          Showing {subscriptions.length} subscription{subscriptions.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="md:hidden bg-slate-100/50 px-6 py-2 text-center">
        <div className="text-xs text-slate-400 font-medium">← Swipe to see more details →</div>
      </div>
    </div>
  )
}
