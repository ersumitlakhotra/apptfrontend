import React from "react";
import { motion } from "framer-motion";

export default function PricingSection() {
    const plans = [
        {
            name: "Free Trial",
            price: "$0",
            sub: "/ month",
            cta: "Get Started Free",
            highlight: false,
            features: [
                "Appointment Records",
                "Data Management",
                "Inventory Management",
                "Employee Performance",
                "Portal & Mobile App",
                "Priority Support",
            ],
        },
        {
            name: "Standard",
            price: "$49.99",
            sub: "+ Tax / month",
            cta: "Choose Plan",
            highlight: true,
            features: [
                "Appointment Records",
                "Data Management",
                "Inventory Management",
                "Employee Performance",
                "Portal & Mobile App",
                "Priority Support",
                "Text Messages (Paid)",
                "Upto 5 Users"
            ],
        },
        {
            name: "Enterprise",
            price: "$89.99",
            sub: "+ Tax / month",
            cta: "Start Enterprise",
            highlight: false,
            features: [
                "Appointment Records",
                "Data Management",
                "Inventory Management",
                "Employee Performance",
                "Portal & Mobile App",
                "Priority Support",
                "Website Included",
                "Text Messages (Paid)",
                "5+ Users"
            ],
        },
    ];

    return (
        <section id="#Pricing" className="relative bg-[#0b1220] text-white py-28 overflow-hidden">

            {/* 🌌 background glow */}
            <div className="absolute w-[700px] h-[700px] bg-purple-500/10 blur-[200px] rounded-full top-[-300px] left-[-200px]" />

            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Choose a plan that fits your business needs
                    </p>
                </motion.div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-8" onClick={() => window.open("/signup", "_blank")}>

                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative group p-8 rounded-3xl backdrop-blur-xl border transition duration-300
                ${plan.highlight
                                    ? "border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.3)] scale-[1.05]"
                                    : "border-white/10 hover:border-purple-400/40"
                                }`}
                        >

                            {/* glow effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                                <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[220%] transition-transform duration-1000" />
                            </div>

                            {/* badge */}
                            {plan.highlight && (
                                <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 text-xs bg-purple-500 px-4 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}

                            <h4 className="text-lg font-semibold">{plan.name}</h4>

                            <h2 className="text-4xl font-bold mt-4">
                                {plan.price}
                                <span className="text-sm text-gray-400 ml-1">
                                    {plan.sub}
                                </span>
                            </h2>

                            <button className="mt-6 w-full py-3 rounded-full bg-purple-500 hover:bg-purple-600 transition font-medium shadow-lg shadow-purple-500/20 cursor-pointer"
                                >
                                {plan.cta}
                            </button>

                            <ul className="mt-6 space-y-2 text-sm text-gray-300">
                                {plan.features.map((f, idx) => (
                                    <li key={idx}>✔ {f}</li>
                                ))}
                            </ul>

                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}
