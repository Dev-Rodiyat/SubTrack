import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Is Subtrack free to use?",
        answer:
            "Yes! Subtrack is completely free with core tracking features. We may offer optional pro tools in the future.",
    },
    {
        question: "Do I need to link my bank or card?",
        answer:
            "Nope. Subtrack doesn’t require bank access. Just manually enter subscriptions or import them from a CSV.",
    },
    {
        question: "Will I get reminders before renewals?",
        answer:
            "Absolutely. You can customize when and how you receive notifications via email or in-app alerts.",
    },
    {
        question: "Is my data safe?",
        answer:
            "Yes. We follow strict security practices and never sell your data. All info is encrypted and stored safely.",
    },
];

function FAQItem({ faq, isOpen, onClick }) {
    return (
        <div className="border-b">
            <button
                onClick={onClick}
                className="w-full text-left py-4 focus:outline-none flex justify-between items-center"
            >
                <span className="font-semibold text-lg text-slate-800 hover:text-teal-600">{faq.question}</span>
                <span className="text-slate-500 hover:text-teal-600">{isOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-slate-600 pb-4 pr-6">{faq.answer}</p>
            </div>
        </div>
    );
}

export default function About() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="px-6 pb-10 space-y-16 bg-white text-slate-800">
            <section className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">About Subtrack</h1>
                <p className="text-slate-600 text-lg">
                    Subtrack was created to help individuals and small businesses take control of their
                    recurring expenses. We believe managing subscriptions should be simple, transparent,
                    and stress-free.
                </p>
            </section>

            <section className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-slate-600 text-lg">
                    We’re on a mission to eliminate unexpected charges by making subscription tracking
                    effortless. From streaming services to domain renewals, our goal is to empower users
                    with visibility and control over their financial commitments.
                </p>
            </section>

            <section className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-8">Why Choose Subtrack?</h2>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 rounded-xl bg-slate-50 shadow-sm">
                        <h3 className="text-xl font-bold mb-2">Simple & Beautiful UI</h3>
                        <p className="text-slate-600">
                            Track your subscriptions with a clean, user-friendly interface that makes managing finances enjoyable.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl bg-slate-50 shadow-sm">
                        <h3 className="text-xl font-bold mb-2">Smart Notifications</h3>
                        <p className="text-slate-600">
                            Get personalized alerts before your subscriptions renew or trials expire so you never miss a beat.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl bg-slate-50 shadow-sm">
                        <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                        <p className="text-slate-600">
                            We take your data seriously. Everything is encrypted, and we don't share your information-ever.
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
