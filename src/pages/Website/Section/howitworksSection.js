import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "⚙️",
    title: "Set Up",
    desc: "Configure services, staff, and availability in minutes.",
  },
  {
    icon: "🔗",
    title: "Share",
    desc: "Send booking links or QR codes to your customers.",
  },
  {
    icon: "📅",
    title: "Book",
    desc: "Customers schedule appointments instantly online.",
  },
  {
    icon: "📈",
    title: "Grow",
    desc: "Automate reminders and increase repeat bookings.",
  },
];

export default function HowIScheduleWorksSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#0f172a] text-white py-28 overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[700px] h-[700px] bg-purple-500/20 blur-[180px] rounded-full top-[-200px] left-[-200px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How iSchedule Works
          </h2>
          <p className="text-gray-400">
            Get started in minutes and streamline your entire booking process.
          </p>
        </div>

        {/* FLOW TITLE */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold">
            From Booking to Growth — All in One Flow
          </h3>
          <p className="text-gray-500 mt-2">
            Experience a seamless journey from scheduling to business growth.
          </p>
        </div>

        {/* FLOW */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">

          {/* base line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10" />

          {/* hover progress line */}
          <div
            className="hidden md:block absolute top-1/2 left-0 h-[2px] bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-500"
            style={{
              width: `${(active / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}

              onMouseEnter={() => setActive(i)}

              className={`
                relative z-10 flex flex-col items-center text-center p-6 rounded-2xl
                border backdrop-blur-xl overflow-hidden group 
                transition-all duration-300
                ${
                  active === i
                    ? "bg-white/10 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.45)] scale-110"
                    : "bg-white/5 border-white/10 opacity-70 scale-95"
                }
              `}
            >

              {/* ✨ glass shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[220%] transition-transform duration-1000" />
              </div>

              {/* ICON */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-inner transition duration-300 group-hover:scale-110">
                <span className="text-2xl">{step.icon}</span>
              </div>

              {/* TITLE */}
              <h3
                className={`text-xl font-semibold mt-4 mb-2 transition ${
                  active === i ? "text-purple-300" : "text-white"
                }`}
              >
                {step.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-400 text-sm max-w-[200px]">
                {step.desc}
              </p>

              {/* active glow ring */}
              {active === i && (
                <div className="absolute inset-0 rounded-2xl border border-purple-400/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse" />
              )}

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
