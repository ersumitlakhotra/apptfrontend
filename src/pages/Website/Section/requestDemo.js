import React from "react";
import { motion } from "framer-motion";
import DemoForm from "../demoForm";

export default function RequestDemo() {
    return (
        <section id="#Demo" className="relative bg-[#0b1220] text-white py-28 overflow-hidden">

            {/* 🌌 background glow */}
            <div className="absolute w-[700px] h-[700px] bg-purple-500/10 blur-[200px] rounded-full top-[-300px] left-[-200px]" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Talk to an expert <br /> to get set up
                    </h1>

                    <p className="text-gray-400 mt-4 max-w-md">
                        Get a personalized walkthrough of iSchedule and see how it can
                        streamline your business.
                    </p>

                    {/* STEPS */}
                    <div className="mt-10 space-y-4">
                        {[
                            "Submit the form",
                            "We’ll contact you within 1 business day",
                            "Start using iSchedule immediately",
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-sm">
                                    {i + 1}
                                </div>
                                <p className="text-gray-300">{step}</p>
                            </div>
                        ))}
                    </div>

                    {/* SUPPORT */}
                    <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

                        <h3 className="font-semibold mb-4">Customer Support</h3>

                        <p className="text-sm text-gray-400 mb-2">
                            24 Hours (Mon–Fri)
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                            Sat: 8:30 AM – 5:30 PM (ET)
                        </p>

                        <p className="text-sm text-gray-300">
                            📞 +1 (905) 363-1515
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                            📧 admin@ischedule.ca
                        </p>

                        {/* 🌐 Languages */}
                        <div className="border-t border-white/10 pt-4 mt-4">
                            <p className="text-xs text-gray-400 mb-2">Languages Supported</p>

                            <div className="flex gap-2 flex-wrap">
                                {["English", "Hindi", "Punjabi"].map((lang, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10
                     hover:border-purple-400/60 hover:text-purple-300 transition"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>


                </motion.div>

                {/* RIGHT FORM */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
                >

                    {/* glow border */}
                    <div className="absolute inset-0 rounded-3xl border border-purple-500/20 pointer-events-none" />

                    <h3 className="text-xl font-semibold mb-6">
                        Get Started
                    </h3>

                 <DemoForm/>

                </motion.div>

            </div>

        </section>
    );
}
