export default function SubscriptionStatusBadge({ status }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
}