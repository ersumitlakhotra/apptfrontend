import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '../../../../Images/logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  

  useEffect(() => {
    const handleScroll = () => {
      // show only after small scroll (adjust 40–100 as needed)
     // setShow(window.scrollY > 60);  
      setShow(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    document.getElementById("#"+id)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
      `}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between
        bg-[#0f172a]/70 backdrop-blur-2xl border-b border-white/10 shadow-lg rounded-b-2xl">

        {/* Logo */}
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

        {/* Desktop Nav */}
       <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 cursor-pointer">
          {["Home", "Features", "Pricing","Industries", "Contact"].map((item) => (
            <a
              key={item}
              onClick={() => handleScroll(item)}
              className="
        relative
        hover:text-white
        transition
        after:content-['']
        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[2px]
        after:w-0
        after:bg-white
        after:transition-all
        after:duration-300
        hover:after:w-full
      "
            >
              {item}
            </a>
          ))}
        </nav>


        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition" onClick={() => window.open("/login", "_blank")}>
            Login
          </button>

          <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition" onClick={() => window.open("/signup", "_blank")}>
            Sign Up
          </button>

          <button className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition shadow-md shadow-purple-500/30"  onClick={() => handleScroll("Demo")}>
            Free Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && show && (
        <div className="md:hidden px-6 pb-6 bg-[#0f172a]/90 backdrop-blur-2xl border-t border-white/10">
          <nav className="flex flex-col gap-4 text-gray-300">
            {["Home", "Features", "Pricing","Industries", "Contact"].map((item) => (
              <a key={item} className="hover:text-white cursor-pointer"  onClick={() => handleScroll(item)} >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-6">
            <button className="text-left text-gray-300 hover:text-white"  onClick={() => window.open("/login", "_blank")}>
              Login
            </button>

            <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20" onClick={() => window.open("/signup", "_blank")}>
              Sign Up
            </button>

            <button className="px-4 py-2 rounded-lg bg-purple-500" onClick={() => handleScroll("Demo")}>
              Free Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
