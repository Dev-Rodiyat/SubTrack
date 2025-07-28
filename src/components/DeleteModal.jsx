import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSubscriptions } from "../context/SubscriptionsProvider";

export default function DeleteModal({ isOpen, onClose, id, name }) {
    const { deleteSubscription } = useSubscriptions();

    if (!isOpen) return null;

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!id) {
            toast.error('Unable to delete: Subscription ID is missing');
            return;
        }

        setIsDeleting(true);

        try {
            deleteSubscription(id);
            toast.success(`"${name}" deleted successfully!`);
            onClose();
        } catch (error) {
            console.error('Error deleting subscription:', error);
            toast.error('Failed to delete subscription. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-2">
                    <Trash2 size={24} className="text-rose-500" />
                    Confirm Deletion
                </h2>
                <p className="text-slate-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-slate-800">"{name}"</span>? This action cannot be
                    undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] flex items-center justify-center"
                    >
                        {isDeleting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}