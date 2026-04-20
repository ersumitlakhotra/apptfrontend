import { useEffect, useState, useMemo } from "react";

export default function NeonSystemCore() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (t) =>
    t.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const calendar = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();

    const arr = [];

    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= days; d++) arr.push(d);

    return { arr, today };
  }, []);

  return (
    <div className="relative w-[380px] p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_0_80px_rgba(168,85,247,0.15)] overflow-hidden">

      {/* 🌌 glow core */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 blur-2xl" />

      {/* HEADER */}
      <div className="relative flex justify-between items-center mb-5">

        <div>
          <p className="text-xs text-purple-400 tracking-widest">
            SYSTEM CORE
          </p>
          <h2 className="text-white font-semibold">
            Live Scheduler
          </h2>
        </div>

        {/* CLOCK */}
        <div className="text-right">
          <p className="text-xs text-gray-400">NEON TIME</p>
          <h1 className="text-lg font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            {formatTime(time)}
          </h1>
        </div>

      </div>

      {/* CALENDAR */}
      <div className="relative">

        <div className="grid grid-cols-7 text-center text-[10px] text-gray-500 mb-2">
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">

          {calendar.arr.map((day, i) => {
            const isToday = day === calendar.today.getDate();

            return (
              <div
                key={i}
                className={`h-8 flex items-center justify-center rounded-md transition
                  ${
                    isToday
                      ? "bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] scale-110"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
              >
                {day || ""}
              </div>
            );
          })}

        </div>
      </div>

      {/* STATUS BAR */}
      <div className="mt-5 flex justify-between text-xs text-gray-400 border-t border-white/10 pt-4">

        <span>Bookings: <span className="text-white">128</span></span>

        <span>Users: <span className="text-white">2.4K</span></span>

        <span className="text-purple-400">● LIVE</span>

      </div>

    </div>
  );
}
