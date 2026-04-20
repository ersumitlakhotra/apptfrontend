import React from "react";
import { motion } from "framer-motion";

import {
  FiScissors,
  FiActivity,
  FiUsers,
  FiBriefcase,
  FiBookOpen,
  FiCamera,
  FiHeart,
  FiMessageCircle,
  FiCompass,
  FiGlobe,
  FiHome,
  FiTruck,
  FiStar,
  FiMusic,
} from "react-icons/fi";
import { MdOutlineNotListedLocation } from "react-icons/md";

const categories = [
  { title: "Beauty & Wellness", subtitle: "Salons, Spas", icon: FiScissors },
  { title: "Health & Fitness", subtitle: "Yoga, Trainers", icon: FiActivity },
  { title: "Events", subtitle: "Weddings, Coaches", icon: FiUsers },
  { title: "Professional", subtitle: "Consultants", icon: FiBriefcase },
  { title: "Education", subtitle: "Tutors, Schools", icon: FiBookOpen },
  { title: "Photography", subtitle: "Studios", icon: FiCamera },
  { title: "Pet Services", subtitle: "Groomers", icon: FiHeart },
  { title: "Counselling", subtitle: "Support", icon: FiMessageCircle },
  { title: "Activities", subtitle: "Outdoor", icon: FiCompass },
  { title: "Business", subtitle: "Offices", icon: FiGlobe },
  { title: "Home Services", subtitle: "Repairs", icon: FiHome },
  { title: "Transport", subtitle: "Fleet", icon: FiTruck },
  { title: "Spiritual", subtitle: "Astrology", icon: FiStar },
  { title: "Music", subtitle: "Dance & Studios", icon: FiMusic }
];

// duplicate for smooth infinite loop
const row = [...categories, ...categories];

export default function TrustedSection() {
  return (
    <section id="#Industries" className="relative bg-[#0f172a] text-white py-28 overflow-hidden">

      {/* glow background */}
      <div className="absolute w-[800px] h-[800px] bg-purple-500/10 blur-[220px] rounded-full top-[-300px] right-[-200px]" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold">
          Trusted by Industries Worldwide
        </h2>
        <p className="text-gray-400 mt-4">
          Powering scheduling across every business category
        </p>
      </div>

      {/* MARQUEE WRAPPER */}
      <div className="space-y-10">

        {/* ROW 1 → RIGHT */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee-right gap-6">

            {row.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="relative group min-w-[220px] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                             hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
                             transition duration-300 overflow-hidden"
                >

                  {/* shine sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[220%] transition-transform duration-1000" />
                  </div>

                  <div className="text-2xl text-purple-400 mb-2 group-hover:scale-110 transition">
                    <Icon />
                  </div>

                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.subtitle}</p>
                </div>
              );
            })}

          </div>
        </div>

        {/* ROW 2 ← LEFT */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee-left gap-6">

            {row.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="relative group min-w-[220px] p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                             hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
                             transition duration-300 overflow-hidden"
                >

                  {/* shine sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 group-hover:translate-x-[220%] transition-transform duration-1000" />
                  </div>

                  <div className="text-2xl text-blue-400 mb-2 group-hover:scale-110 transition">
                    <Icon />
                  </div>

                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.subtitle}</p>
                </div>
              );
            })}

          </div>
        </div>

      </div>

      {/* animations */}
      <style>{`
        @keyframes marquee-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
