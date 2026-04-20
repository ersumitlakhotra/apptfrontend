import React from "react";
import { motion } from "framer-motion";
import NeonSystemCore from "../neonSystemCore";

export default function IntroductionSection() {
  
  const handleScroll = (id) => {
    document.getElementById("#"+id)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <section className="relative py-24 bg-[#0f172a] text-white overflow-hidden"> 

      {/* Background glow bg-[#0f172a] */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[160px] rounded-full top-[-200px] right-[-200px] "  />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="w-full md:flex-row flex flex-col justify-between gap-20 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-2/5"
          >

            {/* Badge */}
            <span className="inline-block px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-full backdrop-blur-xl mb-6">
              All-in-One Scheduling Software
            </span>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Smart Appointment Booking <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 mt-6 text-lg">
              Automate bookings, manage customers, and grow your business effortlessly
              with iSchedule.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8 flex-wrap">

              <button className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition shadow-lg shadow-purple-500/30" onClick={() => window.open("/signup", "_blank")}>
                Start 30-Day Free Trial
              </button>

              <button className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition backdrop-blur-xl" onClick={() => handleScroll("Demo")} >
                Book a Demo
              </button>

            </div>

            {/* Trust */}
            <div className="flex gap-6 mt-6 text-sm text-gray-400">
              <span>✔ No credit card required</span>
              <span>✔ Setup in minutes</span>
            </div>

          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative w-full md:w-3/5 flex md:justify-end" 
          >

            {/* Glow behind image */}
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-2xl" />
            <NeonSystemCore/>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
