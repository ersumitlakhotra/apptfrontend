import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Easy Booking",
    desc: "Let customers book appointments instantly, anytime.",
  },
  {
    title: "Smart Dashboard",
    desc: "Manage bookings, customers, and insights in one place.",
  },
  {
    title: "Automation",
    desc: "Send reminders and confirmations automatically.",
  },
  {
    title: "Customer Management",
    desc: "Track history, preferences, and client data easily.",
  },
  {
    title: "Team Management",
    desc: "Organize staff schedules and performance.",
  },
  {
    title: "Analytics",
    desc: "Make smarter decisions with real-time insights.",
  },
];

export default function Features1Section() {
  return (
    <section className="relative bg-[#0f172a] text-white py-28 overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full top-[-200px] left-[-150px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Run Your Business
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful tools designed to simplify scheduling and help you grow faster.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                         hover:scale-[1.04] hover:border-purple-400/60
                         hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
                         transition duration-300 overflow-hidden"
            >

              {/* shine sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[220%] transition-transform duration-1000" />
              </div>

              {/* title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition">
                {f.title}
              </h3>

              {/* desc */}
              <p className="text-gray-400 text-sm">
                {f.desc}
              </p>

            </motion.div>
          ))}

        </div>


      </div>
    </section>
  );
}
