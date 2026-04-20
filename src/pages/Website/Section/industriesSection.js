import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Saloon from "../../../Images/website/Salons.jpg";
import Clinic from "../../../Images/website/Clinics.jpg";
import Consultants from "../../../Images/website/Consultants.jpg";
import Fitness from "../../../Images/website/Fitness.jpg";
import Education from "../../../Images/website/Education.jpg";

const tabs = [
  {
    id: "salon",
    label: "Salons & Spas",
    title: "Salon & Spa Scheduling",
    desc: "Manage appointments, staff shifts, and customer bookings effortlessly.",
    img: Saloon,
  },
  {
    id: "clinic",
    label: "Clinics",
    title: "Clinic Appointment System",
    desc: "Streamline patient scheduling and reduce waiting time.",
    img: Clinic,
  },
  {
    id: "consulting",
    label: "Consultants",
    title: "Consultation Booking",
    desc: "Handle meetings and client bookings professionally.",
    img: Consultants,
  },
  {
    id: "fitness",
    label: "Fitness",
    title: "Fitness Scheduling",
    desc: "Manage classes, trainers, and sessions efficiently.",
    img:Fitness,
  },
  {
    id: "education",
    label: "Education",
    title: "Education Scheduling",
    desc: "Organize sessions, batches, and student appointments.",
    img:Education,
  },
];

export default function IndustriesSection() {
  const [active, setActive] = useState("salon");

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <section className="relative py-28 bg-[#0f172a] text-white overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[700px] h-[700px] bg-purple-500/20 blur-[180px] rounded-full top-[-200px] right-[-250px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Every Industry
          </h2>
          <p className="text-gray-400">
            Flexible solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10">

          {/* Tabs */}
          <div className="space-y-3">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`
                  relative w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                  border border-white/10 backdrop-blur-xl
                  hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
                  group
                  ${active === tab.id ? "bg-white/10 border-purple-500/70 shadow-[0_0_25px_rgba(168,85,247,0.6)]" : "bg-white/5"}
                `}
              >

                {/* laser glow line */}
                <span className="absolute left-0 top-0 h-full w-[2px] bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] opacity-0 group-hover:opacity-100 transition" />

                {tab.label}
              </button>
            ))}

          </div>

          {/* Content */}
          <div className="md:col-span-3">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
              >

                {/* image */}
                <div className="relative group">

                  <img
    src={activeTab.img}
    alt={activeTab.title}
    className="w-full h-[380px] object-cover object-[center_30%] transition duration-500 group-hover:scale-[1.03]"
  />

                  {/* glow overlay */}
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition" />

                  {/* laser border effect */}
                  <div className="absolute inset-0 border border-purple-500/30 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition" />

                </div>

                {/* text */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">
                    {activeTab.title}
                  </h3>

                  <p className="text-gray-400">
                    {activeTab.desc}
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
