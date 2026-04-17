import React, { useState, useMemo } from "react";
import { FiScissors, FiActivity, FiUsers, FiBriefcase, FiBookOpen, FiCamera, FiHeart, FiMessageCircle, FiCompass, FiGlobe, FiHome, FiTruck, FiStar, FiMusic, FiSearch } from "react-icons/fi";
import Heading from "../../../common/heading";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineNotListedLocation } from "react-icons/md";

// Enhanced version with search + filtering

const categories = [
  { group: "Popular", title: "Beauty & Wellness", subtitle: "Salons, Spas, Life Coaches", icon: FiScissors },
  { group: "Popular", title: "Health & Fitness", subtitle: "Yoga, Sports, Therapists", icon: FiActivity },
  { group: "Business", title: "Classes & Events", subtitle: "Coaches, Weddings, Event Organisers", icon: FiUsers },
  { group: "Business", title: "Professional Services", subtitle: "Accountants, Consultants", icon: FiBriefcase },
  { group: "Education", title: "Education & Tutoring", subtitle: "Schools, Tutors", icon: FiBookOpen },
  { group: "Creative", title: "Photography", subtitle: "Photographers, Studios", icon: FiCamera },
  { group: "Lifestyle", title: "Pet Services", subtitle: "Groomers, Trainers", icon: FiHeart },
  { group: "Support", title: "Counselling", subtitle: "Support, Guidance", icon: FiMessageCircle },
  { group: "Lifestyle", title: "Activities", subtitle: "Outdoor, Creative", icon: FiCompass },
  { group: "Business", title: "Administrative", subtitle: "Government, Offices", icon: FiGlobe },
  { group: "Home", title: "Home Services", subtitle: "Cleaning, Repairs", icon: FiHome },
  { group: "Transport", title: "Automobile", subtitle: "Transport, Detailing", icon: FiTruck },
  { group: "Lifestyle", title: "Spiritual", subtitle: "Astrology, Readings", icon: FiStar },
  { group: "Creative", title: "Music & Dance", subtitle: "Studios, Classes", icon: FiMusic },
  { group: "Other", title: "Other", subtitle: "Don’t see your category", icon: MdOutlineNotListedLocation },
];

const groups = ["All", ...new Set(categories.map(c => c.group))];

const ServiceCategories=({setTitle}) =>{
  const [selected, setSelected] = useState(0);
  
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
   const headingLabel = 'Service Categories';

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const matchesSearch = cat.title.toLowerCase().includes(search.toLowerCase()) ||
        cat.subtitle.toLowerCase().includes(search.toLowerCase());

      const matchesGroup = activeGroup === "All" || cat.group === activeGroup;

      return matchesSearch && matchesGroup;
    });
  }, [search, activeGroup]);

  return (
    <div class={`w-full bg-white rounded-lg p-4 flex flex-col gap-1 `}>
    <Heading label={headingLabel} Icon={<BiSolidCategory size={26} />} />
      
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <select
          value={activeGroup}
          onChange={(e) => setActiveGroup(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {groups.map((group, i) => (
            <option key={i} value={group}>{group}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, index) => {
            const Icon = cat.icon;
            const isActive = selected === index;

            return (
              <div
                key={index}
                onClick={() => {setSelected(index); setTitle(cat.title)}}
                className={`group cursor-pointer rounded-2xl p-5 bg-white border transition-all duration-300
                  ${
                    isActive
                      ? "border-indigo-400 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition
                      ${
                        isActive
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-4 h-1 rounded-full transition-all duration-300
                    ${isActive ? "bg-indigo-500 w-full" : "bg-transparent w-0 group-hover:w-1/2 group-hover:bg-gray-300"}`}
                />
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full">No services found.</p>
        )}
      </div>

    </div>
  );
}

export default  ServiceCategories
