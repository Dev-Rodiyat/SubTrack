import { useState } from "react";
import { List, Grid3X3, Download, X, Search } from "lucide-react";
import dayjs from "dayjs";
import DeleteModal from "../components/DeleteModal";
import { useSubscriptions } from "../context/SubscriptionsProvider";
import SubscriptionListView from "../components/SubscriptionsListView";
import SubscriptionGridView from "../components/SubscriptionsGridView";
import AddSubscriptionModal from "../components/AddSubscriptionModal";
import EditSubscriptionModal from "../components/EditSubscriptionModal";

export default function Subscriptions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState("list");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [subToDelete, setSubToDelete] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);

    const { subscriptions } = useSubscriptions();

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setDateFilter("all");
    };

    const handleSearchClear = () => {
        setSearchTerm("");
    };

    const handleEdit = (subId) => {
        setEditingSubscriptionId(subId);
        setIsEditModalOpen(true);
    };

    const handleDelete = (subscription) => {
        setSubToDelete(subscription);
        setIsDeleteOpen(true);
    };

    const applyFilters = () => {
        return subscriptions
            .filter(sub =>
                sub.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(sub => {
                if (statusFilter === "all") return true;
                return sub.status === statusFilter;
            })
            .filter(sub => {
                if (dateFilter === "all") return true;

                const renew = dayjs(sub.renewDate);
                const now = dayjs();

                if (dateFilter === "thisMonth") {
                    return renew.month() === now.month() && renew.year() === now.year();
                }

                if (dateFilter === "nextMonth") {
                    return (
                        renew.month() === now.add(1, "month").month() &&
                        renew.year() === now.add(1, "month").year()
                    );
                }

                return true;
            });
    };

    const exportToCSV = () => {
        if (filtered.length === 0) {
            alert("No subscriptions to export.");
            return;
        }

        const headers = ["Name", "Price", "Category", "Status", "Renew Date"];
        const rows = filtered.map(sub => [
            sub.name,
            `₦${parseFloat(sub.price).toLocaleString()}`,
            sub.category || "N/A",
            sub.status,
            dayjs(sub.renewDate).format("YYYY-MM-DD")
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `subscriptions-${dayjs().format("YYYY-MM-DD")}.csv`);
        link.click();
    };

    const filtered = applyFilters();

    return (
        <div className="px-4 md:px-12 lg:px-24 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">Subscriptions</h1>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                        >
                            Add Subscription
                        </button>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search subscriptions..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="border rounded-md pl-10 pr-8 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
                        {searchTerm && (
                            <button onClick={handleSearchClear} className="absolute right-2.5 top-2.5">
                                <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="border px-3 py-2 rounded-md focus:ring-teal-500"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="missed">Missed</option>
                </select>

                {/* Date Filter */}
                <select
                    value={dateFilter}
                    onChange={e => setDateFilter(e.target.value)}
                    className="border px-3 py-2 rounded-md focus:ring-teal-500"
                >
                    <option value="all">All Dates</option>
                    <option value="thisMonth">This Month</option>
                    <option value="nextMonth">Next Month</option>
                </select>

                {/* Clear Filters */}
                {(searchTerm.trim() !== "" || statusFilter !== "all" || dateFilter !== "all") && (
                    <button onClick={clearFilters} className="text-sm text-rose-500 ml-auto">
                        Clear All Filters
                    </button>
                )}
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => setView("list")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border ${view === "list"
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    <List className="w-4 h-4" />
                    List View
                </button>
                <button
                    onClick={() => setView("grid")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border ${view === "grid"
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    <Grid3X3 className="w-4 h-4" />
                    Grid View
                </button>
            </div>

            {/* Views */}
            {view === "list" ? (
                <SubscriptionListView
                    subscriptions={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (
                <SubscriptionGridView
                    subscriptions={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <AddSubscriptionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <EditSubscriptionModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingSubscriptionId(null);
                }}
                subscriptionId={editingSubscriptionId}
            />

            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                id={subToDelete?.id}
                name={subToDelete?.name}
            />
        </div>
    );
}