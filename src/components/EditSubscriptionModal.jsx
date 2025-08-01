import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useSubscriptions } from "../context/SubscriptionsProvider";

export default function EditSubscriptionModal({ isOpen, onClose, subscriptionId }) {
    const { subscriptions, updateSubscription } = useSubscriptions();

    const initialFormData = {
        name: "",
        price: "",
        cycle: "Monthly",
        renewDate: "",
        status: "active",
        description: "",
        category: "",
        reminder: false,
        recurring: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState(null);

    const categories = ["Entertainment", "Productivity", "Education", "Finance", "Others"];

    useEffect(() => {
        if (isOpen && subscriptionId) {
            const foundSubscription = subscriptions.find(sub => sub.id === subscriptionId);
            if (foundSubscription) {
                setSubscription(foundSubscription);
                const formattedDate = foundSubscription.renewDate 
                    ? new Date(foundSubscription.renewDate).toISOString().split('T')[0]
                    : "";
                
                setFormData({
                    name: foundSubscription.name || "",
                    price: foundSubscription.price?.toString() || "",
                    cycle: foundSubscription.cycle || "Monthly",
                    renewDate: formattedDate,
                    status: foundSubscription.status || "active",
                    description: foundSubscription.description || "",
                    category: foundSubscription.category || "",
                    reminder: foundSubscription.reminder || false,
                    recurring: foundSubscription.recurring || false,
                });
            } else {
                toast.error("Subscription not found");
                onClose();
            }
        }
    }, [isOpen, subscriptionId, subscriptions, onClose]);

    useEffect(() => {
        if (!isOpen) {
            setFormData(initialFormData);
            setSubscription(null);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {
        if (subscription) {
            const formattedDate = subscription.renewDate 
                ? new Date(subscription.renewDate).toISOString().split('T')[0]
                : "";
                
            setFormData({
                name: subscription.name || "",
                price: subscription.price?.toString() || "",
                cycle: subscription.cycle || "Monthly",
                renewDate: formattedDate,
                status: subscription.status || "active",
                description: subscription.description || "",
                category: subscription.category || "",
                reminder: subscription.reminder || false,
                recurring: subscription.recurring || false,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!subscriptionId) {
            toast.error("Unable to update: Subscription ID is missing");
            return;
        }

        setLoading(true);

        try {
            const updatedData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            updateSubscription(subscriptionId, updatedData);
            toast.success(`"${formData.name}" updated successfully!`);
            onClose();
        } catch (error) {
            console.error("Error updating subscription:", error);
            toast.error("Failed to update subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Edit Subscription
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {subscription ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="e.g. Netflix"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Price (₦) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    placeholder="e.g. 999"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Cycle
                                </label>
                                <select
                                    name="cycle"
                                    value={formData.cycle}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    disabled={loading}
                                >
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Renew Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="renewDate"
                                    value={formData.renewDate}
                                    onChange={handleChange}
                                    type="date"
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                disabled={loading}
                            >
                                <option value="active">Active</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="missed">Missed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
                                placeholder="Optional notes about this subscription..."
                                disabled={loading}
                            />
                        </div>

                        <div className="flex gap-6 text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="reminder"
                                    checked={formData.reminder}
                                    onChange={handleChange}
                                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                    disabled={loading}
                                />
                                <span className="text-slate-700">Send reminders</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="recurring"
                                    checked={formData.recurring}
                                    onChange={handleChange}
                                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                    disabled={loading}
                                />
                                <span className="text-slate-700">Auto-renew</span>
                            </label>
                        </div>

                        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-200">
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={loading}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50"
                            >
                                Reset Changes
                            </button>
                            
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-teal-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[100px]"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <ClipLoader size={16} color="#fff" />
                                            Updating...
                                        </span>
                                    ) : (
                                        "Update"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="flex items-center justify-center py-8">
                        <ClipLoader size={32} color="#0d9488" />
                        <span className="ml-3 text-slate-600">Loading subscription...</span>
                    </div>
                )}
            </div>
        </div>
    );
}