import React from "react";
import { motion } from "framer-motion";
import Appointment from "../../../Images/website/Appointment.jpg"
import Staff from "../../../Images/website/staff.jpg"
import Marketing from "../../../Images/website/marketing.jpg"

const features = [
  {
    title: "Smart Appointment Management",
    desc: "Simplify your booking process with real-time availability, automated scheduling, and seamless calendar integration.",
    points: [
      "Online booking 24/7",
      "Real-time availability",
      "Automated confirmations",
    ],
    img: Appointment,
  },
  {
    title: "Customer & Staff Management",
    desc: "Manage your team and customers efficiently with centralized data and smart workflows.",
    points: ["Staff scheduling", "Customer profiles", "Service tracking"],
    img:  Staff,
  },
  {
    title: "Marketing & Growth Tools",
    desc: "Increase bookings and reduce no-shows with automated marketing and reminders.",
    points: ["Email notifications", "Promotions & campaigns", "QR & link booking"],
    img:  Marketing,
  },
];

export default function FeaturesSection() {
  return (
    <section id="#Features" className="relative py-28 bg-[#0f172a] text-white overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[700px] h-[700px] bg-purple-500/20 blur-[180px] rounded-full top-[-250px] left-[-200px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Scheduling Platform for Modern Businesses
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage appointments, customers, and growth — all in one place.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-32">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* TEXT */}
              <div className={i % 2 !== 0 ? "md:order-2" : ""}>

                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  {f.title}
                </h3>

                <p className="text-gray-400 mb-6 text-lg">
                  {f.desc}
                </p>

                <ul className="space-y-2 text-gray-300">
                  {f.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-purple-400">✔</span>
                      {p}
                    </li>
                  ))}
                </ul>

              </div>

              {/* IMAGE */}
              <div className={i % 2 !== 0 ? "md:order-1" : ""}>

                <div className="relative group">

                  {/* glow */}
                  <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-2xl opacity-0 group-hover:opacity-100 transition" />

                  {/* image */}
                  <img
                    src={f.img}
                    alt={f.title}
                    className="relative rounded-2xl border border-white/10 shadow-2xl transition duration-500 group-hover:scale-[1.03]"
                  />

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
