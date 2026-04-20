import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import logo from '../../../Images/logo.png'
import { useNavigate } from "react-router-dom";

export default function Footer() {
  
  const navigate = useNavigate();
    const handleScroll = (id) => {
    document.getElementById("#"+id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer id="#Contact" className="relative bg-[#0b1220] text-white pt-24 pb-10 overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full bottom-[-200px] left-[-150px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* BRAND */}
          <div>
            <div
              className="flex items-center gap-0 tracking-wide cursor-pointer"
              onClick={() => handleScroll("Home")}
            >
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 "
              />

              <span className="text-white text-xl font-bold leading-none -ml-[6px]">Schedule</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Smart appointment scheduling platform to help businesses automate bookings,
              manage customers, and grow faster.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>

            {["Features", "Pricing","Industries"].map((item, i) => (
              <a
                key={i}
                onClick={() => handleScroll(item)}
                className="block text-gray-400 hover:text-purple-400 transition mb-2 hover:translate-x-1 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>

            {["About", "Careers"].map((item, i) => (
              <a
                key={i}
                onClick={() => handleScroll("Demo")}
                className="block text-gray-400 hover:text-purple-400 transition mb-2 hover:translate-x-1 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>

            <p className="text-gray-400 text-sm mb-2">📍 Unit 1000, 10 Four Season PI, Etobicoke ON M9B 0A6 CA</p>
            <p className="text-gray-400 text-sm mb-2">📞 +1 (905) 363-1515</p>
            <p className="text-gray-400 text-sm">📧 admin@ischedule.ca</p>

            {/* socials */}
            <div className="flex gap-4 mt-5">

              {[
                { icon: FaInstagram, link: "https://www.instagram.com/ischedule.ca" },
                { icon: FaFacebookF, link: "https://www.facebook.com/profile.php?id=61572138635519" },
                { icon: FaTwitter, link: "#" },
                { icon: FaLinkedinIn, link: "https://www.linkedin.com/in/ischedule-ca/" },
              ].map((s, i) => {
                const Icon = s.icon;

                return (
                  <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10
                               hover:bg-purple-500/20 hover:border-purple-400 transition
                               hover:scale-110"
                  >
                    <Icon />
                  </a>
                );
              })}

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2026 iSchedule. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
