import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Printer, Pencil, ArrowLeft, Calendar, DollarSign, Tag, CheckCircle, XCircle, Clock, Bell, RotateCcw, Download } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { useSubscriptions } from "../context/SubscriptionsProvider";
import EditSubscriptionModal from "../components/EditSubscriptionModal";

dayjs.extend(relativeTime);

export default function SubscriptionView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subscriptions, isLoaded } = useSubscriptions();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const found = subscriptions.find((s) => s.id === id);
      setSubscription(found);
      setLoading(false);
    }
  }, [id, subscriptions, isLoaded]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    if (isLoaded) {
      const found = subscriptions.find((s) => s.id === id);
      setSubscription(found);
    }
  };

  const handlePrint = () => {
    try {
      const printStyles = `
        <style>
          @media print {
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .print\\:hidden { display: none !important; }
            .print\\:block { display: block !important; }
            .print\\:bg-white { background-color: white !important; }
            .print\\:text-black { color: black !important; }
            .print\\:text-gray-600 { color: #4b5563 !important; }
            .print\\:border-gray-200 { border-color: #e5e7eb !important; }
            .bg-gradient-to-r { background: white !important; }
            .text-white { color: black !important; }
            .text-teal-100 { color: #374151 !important; }
            .shadow-lg { box-shadow: none !important; }
            @page { margin: 1in; size: A4; }
            .page-break { page-break-after: always; }
          }
        </style>
      `;
      
      const originalHead = document.head.innerHTML;
      document.head.innerHTML += printStyles;
      
      window.print();
      
      setTimeout(() => {
        document.head.innerHTML = originalHead;
      }, 1000);
    } catch (error) {
      toast.error("Failed to print. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = document.getElementById('subscription-content');
      
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${subscription.name}-subscription-${dayjs().format('YYYY-MM-DD')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      const clonedElement = element.cloneNode(true);
      
      const hiddenElements = clonedElement.querySelectorAll('.print\\:hidden , [class*="print:hidden"]');
      hiddenElements.forEach(el => el.remove());
      
      const printOnlyElements = clonedElement.querySelectorAll('.print\\:block, [class*="print:block"]');
      printOnlyElements.forEach(el => {
        el.style.display = 'block';
      });
      
      const gradientElements = clonedElement.querySelectorAll('.bg-gradient-to-r');
      gradientElements.forEach(el => {
        el.style.background = 'white';
        el.style.color = 'black';
      });
      
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.appendChild(clonedElement);
      document.body.appendChild(tempContainer);
      
      await html2pdf().set(options).from(clonedElement).save();
      
      document.body.removeChild(tempContainer);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try the print option instead.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "upcoming":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "missed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "missed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <XCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-600 mb-2">
            Subscription Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            The subscription you're looking for doesn't exist or may have been deleted.
          </p>
          <button
            onClick={() => navigate("/subscriptions")}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Back to Subscriptions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div id="subscription-content" className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none print:rounded-none">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 print:bg-white print:text-black print:border-b print:border-gray-200">
          <div className="flex items-center justify-between print:hidden">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-teal-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="p-2 text-white hover:text-teal-100 hover:bg-white/10 rounded-lg transition-colors"
                title="Edit Subscription"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className="p-2 text-white hover:text-teal-100 hover:bg-white/10 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-white hover:text-teal-100 hover:bg-white/10 rounded-lg transition-colors"
                title="Print Details"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-bold mb-2 print:text-black">{subscription.name}</h1>
            <p className="text-teal-100 print:text-gray-600">
              Subscription Details & Information
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Price</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">
                {formatPrice(subscription.price)}
              </p>
              <p className="text-sm text-slate-500">per {subscription.cycle}</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Next Renewal</span>
              </div>
              <p className="text-lg font-semibold text-slate-800">
                {dayjs(subscription.renewDate).format("MMM D, YYYY")}
              </p>
              <p className="text-sm text-slate-500">
                {dayjs(subscription.renewDate).fromNow()}
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(subscription.status)}
                <span className="text-sm font-medium text-slate-600">Status</span>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                  subscription.status
                )}`}
              >
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Subscription Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-start justify-between py-2">
                  <span className="font-medium text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </span>
                  <span className="text-slate-800 font-medium">{subscription.category}</span>
                </div>

                <div className="flex items-start justify-between py-2">
                  <span className="font-medium text-slate-600">Billing Cycle</span>
                  <span className="text-slate-800">{subscription.cycle}</span>
                </div>

                <div className="flex items-start justify-between py-2">
                  <span className="font-medium text-slate-600">Renewal Date</span>
                  <span className="text-slate-800">
                    {dayjs(subscription.renewDate).format("MMMM D, YYYY")}
                  </span>
                </div>

                <div className="flex items-start justify-between py-2">
                  <span className="font-medium text-slate-600">Days Until Renewal</span>
                  <span className="text-slate-800">
                    {dayjs(subscription.renewDate).diff(dayjs(), 'days')} days
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Settings & Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-slate-600 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Reminders
                  </span>
                  <span className="flex items-center gap-2">
                    {subscription.reminder ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-slate-800">
                      {subscription.reminder ? "Enabled" : "Disabled"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-slate-600 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Auto-Renewal
                  </span>
                  <span className="flex items-center gap-2">
                    {subscription.recurring ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-slate-800">
                      {subscription.recurring ? "Enabled" : "Disabled"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {subscription.description && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Description
              </h2>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700 leading-relaxed">
                  {subscription.description}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200 print:hidden">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit Subscription
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => navigate("/subscriptions")}
                className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Back to All Subscriptions
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 text-center text-slate-500 text-sm print:hidden">
          <p>Generated on {dayjs().format("MMMM D, YYYY [at] h:mm A")}</p>
        </div>
      </div>

      <EditSubscriptionModal
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        subscriptionId={id}
      />
    </div>
  );
}