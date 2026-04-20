import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "100+", label: "Businesses" },
  { value: "10K+", label: "Appointments Booked" },
  { value: "4.8★", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Salon Owner",
    text: "iSchedule completely transformed how we manage appointments. Our no-shows dropped and bookings increased significantly.",
    img: "/images/user1.jpg",
  },
  {
    name: "Neha Verma",
    role: "Clinic Manager",
    text: "The interface is super clean and easy to use. My team adapted within a day and productivity improved instantly.",
    img: "/images/user2.jpg",
  },
  {
    name: "Amit Patel",
    role: "Consultant",
    text: "We love the automation features. It saves us hours every week and helps us focus on customers.",
    img: "/images/user3.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 bg-[#0f172a] text-white overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[700px] h-[700px] bg-purple-500/20 blur-[200px] rounded-full top-[-250px] right-[-200px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Businesses Worldwide
          </h2>
          <p className="text-gray-400">
            See how iSchedule is helping businesses streamline bookings and grow faster.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-center">

          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition"
            >
              <h3 className="text-3xl font-bold text-purple-300">
                {s.value}
              </h3>
              <p className="text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}

        </div>

        {/* TESTIMONIAL GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                         hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]
                         transition duration-300 group overflow-hidden"
            >

              {/* glow overlay */}
              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition" />

              {/* stars */}
              <div className="text-yellow-400 mb-3">★★★★★</div>

              {/* quote */}
              <p className="text-gray-300 mb-6 relative z-10">
                “{t.text}”
              </p>

              {/* user */}
              <div className="flex items-center gap-3 relative z-10">

                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <span className="text-gray-400 text-sm">{t.role}</span>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
