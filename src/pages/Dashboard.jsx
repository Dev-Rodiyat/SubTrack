import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const COLORS = ["#14b8a6", "#0f766e", "#2dd4bf", "#5eead4", "#99f6e4"];

const monthlySpending = [
    { month: "Jan", total: 45.99 },
    { month: "Feb", total: 39.99 },
    { month: "Mar", total: 55.0 },
    { month: "Apr", total: 49.5 },
    { month: "May", total: 60.25 },
    { month: "Jun", total: 41.75 },
];

const getDaysLeft = (date) => {
    const today = new Date();
    const target = new Date(date);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const getCountdownText = (days) => {
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `in ${days} days`;
};

const getCountdownColor = (days) => {
    if (days === 0) return "text-rose-600 font-semibold";
    if (days === 1) return "text-orange-500 font-semibold";
    return "text-teal-600 font-medium"
};

export default function Dashboard() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        setSubscriptions([
            { name: "Netflix", amount: 12.99, renewDate: "2025-08-01" },
            { name: "Spotify", amount: 9.99, renewDate: "2025-07-03" },
            { name: "Figma Pro", amount: 15, renewDate: "2025-08-05" },
        ]);
    }, []);

    const total = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

    return (
        <div className="px-4 md:px-12 lg:px-24 py-6">
            <h1 className="text-2xl font-semibold text-slate-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <div className="bg-teal-50 p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-teal-600">Total Monthly Spend</p>
                    <h2 className="text-2xl font-bold text-teal-700">${total.toFixed(2)}</h2>
                </div>
                <div className="bg-sky-50 p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-sky-600">Active Subscriptions</p>
                    <h2 className="text-2xl font-bold text-sky-700">{subscriptions.length}</h2>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-yellow-600">Upcoming Renewals</p>
                    <h2 className="text-2xl font-bold text-yellow-700">
                        {
                            subscriptions.filter(sub => new Date(sub.renewDate) > new Date()).length
                        }
                    </h2>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-rose-600">Missed Renewals</p>
                    <h2 className="text-2xl font-bold text-rose-600">
                        {
                            subscriptions.filter(sub => new Date(sub.renewDate) < new Date()).length
                        }
                    </h2>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">
                    Upcoming Renewals
                </h3>

                <ul className="divide-y">
                    {subscriptions
                        .filter(sub => new Date(sub.renewDate) > new Date())
                        .sort((a, b) => new Date(a.renewDate) - new Date(b.renewDate))
                        .slice(0, 3)
                        .map((sub, idx) => {
                            const daysLeft = getDaysLeft(sub.renewDate);
                            return (
                                <li
                                    key={idx}
                                    className="py-3 flex justify-between text-slate-700 items-center"
                                >
                                    <div>
                                        <p className="font-medium">{sub.name}</p>
                                        <p className={`text-sm ${getCountdownColor(daysLeft)}`}>
                                            {getCountdownText(daysLeft)}
                                        </p>
                                    </div>
                                    <span className="text-sm text-slate-500">
                                        {new Date(sub.renewDate).toLocaleDateString()}
                                    </span>
                                </li>
                            );
                        })}
                </ul>

                {subscriptions.filter(sub => new Date(sub.renewDate) > new Date()).length > 3 && (
                    <div className="mt-4 text-right">
                        <Link
                            to="/subscriptions"
                            className="text-sm text-teal-600 hover:underline font-medium"
                        >
                            View All Subscriptions →
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Spending Breakdown</h3>
                    <div className="w-full h-72">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={subscriptions}
                                    dataKey="amount"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {subscriptions.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-sky-50 p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Monthly Spending Trend</h3>
                    <div className="w-full h-72">
                        <ResponsiveContainer>
                            <LineChart data={monthlySpending}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#14b8a6"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
