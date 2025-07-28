import { Link } from "react-router-dom";
import { Bell, Calendar, CreditCard } from "lucide-react";

const features = [
    {
        icon: <CreditCard className="w-6 h-6 text-teal-600" />,
        title: "Centralized Tracker",
        desc: "Manage all subscriptions - Netflix, Spotify, domains, and more-in one place.",
    },
    {
        icon: <Calendar className="w-6 h-6 text-teal-600" />,
        title: "Due Date Reminders",
        desc: "Get timely alerts before renewals so you avoid surprise charges.",
    },
    {
        icon: <Bell className="w-6 h-6 text-teal-600" />,
        title: "Custom Alerts",
        desc: "Set personalized alerts for payment cycles, price changes, or inactivity.",
    },
];

const steps = [
    {
        step: "1. Add Subscriptions",
        detail: "Quickly enter or import your recurring payments and billing cycles.",
    },
    {
        step: "2. Set Alerts",
        detail: "Customize reminders for due dates, trial ends, or renewals.",
    },
    {
        step: "3. Stay Notified",
        detail: "Get notified and view your dashboard to stay on top of your finances.",
    },
];

const testimonials = [
    {
        name: "Sophia M.",
        feedback:
            "Subtrack has completely changed how I manage my monthly expenses. I finally stopped paying for services I don't use!",
        title: "Freelance Designer",
    },
    {
        name: "Anate A.",
        feedback:
            "I used to forget when trials ended and got charged unexpectedly. Subtrack saves me money every month!",
        title: "Technical Writer",
    },
    {
        name: "Rokeebat O.",
        feedback:
            "This is exactly what I’ve needed. The reminders are perfect and the dashboard is so clean and simple.",
        title: "Frontend Developer",
    },
];

export default function Home() {
    return (
        <div>

            <section className="text-center py-20 px-6 bg-gradient-to-b from-white to-slate-50">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                    Take Control of Your Subscriptions
                </h1>
                <p className="text-slate-600 max-w-xl mx-auto mb-8">
                    Track and manage all your recurring payments from one clean dashboard. Never miss a due date again.
                </p>
                <Link
                    to="/dashboard"
                    className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition"
                >
                    Start Tracking
                </Link>
            </section>

            <section className="py-20 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                    Why Subtrack?
                </h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="bg-slate-50 p-6 rounded-xl shadow-sm text-center"
                        >
                            <div className="mb-4 flex justify-center">{f.icon}</div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                {f.title}
                            </h3>
                            <p className="text-slate-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 bg-slate-50">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                    How It Works
                </h2>
                <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow text-center border"
                        >
                            <h3 className="text-xl font-semibold text-teal-600 mb-2">{s.step}</h3>
                            <p className="text-slate-600">{s.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 bg-slate-50">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                    What Our Users Say
                </h2>
                <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-xl shadow-sm border text-center"
                        >
                            <p className="text-slate-600 italic mb-4">“{t.feedback}”</p>
                            <h4 className="font-semibold text-slate-800">{t.name}</h4>
                            <p className="text-sm text-slate-500">{t.title}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 text-center bg-white">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    Ready to Master Your Money?
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto mb-8">
                    Join Subtrack and never lose track of your subscriptions again.
                </p>
                <Link
                    to="/subscriptions"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition"
                >
                    Get Started Free
                </Link>
            </section>

        </div>
    );
}
