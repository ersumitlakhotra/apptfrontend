import React, { useState } from "react";
import { motion } from "framer-motion";

export const Stamp = ({ trigger, status }) => {
  const [phase, setPhase] = useState("idle");

  React.useEffect(() => {
    if (trigger) {
      setTimeout(() => setPhase("drop"), 200);
      setTimeout(() => setPhase("press"), 600);
      setTimeout(() => setPhase("shake"), 900);
      setTimeout(() => setPhase("ink"), 1500);   // delayed ink
      setTimeout(() => setPhase("lift"), 2300);
    }
  }, [trigger]);

  const statusColors = {
    Approved: "#16a34a",
    Completed: "#16a34a",
    Rejected: "#dc2626",
    Cancelled: "#dc2626",
    Awaiting: "#eab308",
  };

  const color = statusColors[status] || "#1f2937";

  // 🎲 imperfections
  const baseRotate = -6;
  const inkOffset = Math.random() * 6 - 3;

  return (
    <>
      {/* 🖤 Stamp Tool */}
      {(phase === "drop" || phase === "press" || phase === "shake" || phase === "lift") && (
        <motion.div
          initial={{ y: -260, rotate: baseRotate }}
          animate={{
            y:
              phase === "drop"
                ? 50
                : phase === "press" || phase === "shake"
                ? 25
                : phase === "lift"
                ? -260
                : -260,

            rotate:
              phase === "shake"
                ? [-6, -4, -7, -5, -6]
                : baseRotate,
          }}
          transition={{
            y: { duration: phase === "lift" ? 1.2 : 0.5 },
            rotate: {
              duration: 0.3,
              repeat: phase === "shake" ? 2 : 0,
            },
          }}
          className="absolute top-0 right-6 z-40"
        >
          <motion.div
            animate={{
              scaleY:
                phase === "press"
                  ? 0.75
                  : phase === "shake"
                  ? [0.75, 0.8, 0.73, 0.78, 0.75]
                  : 1,
              scaleX:
                phase === "press"
                  ? 1.05
                  : phase === "shake"
                  ? [1.05, 1.02, 1.06, 1.03, 1.05]
                  : 1,
            }}
            transition={{
              duration: 0.25,
              repeat: phase === "shake" ? 2 : 0,
            }}
            className="w-24 h-24 bg-gray-900 rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.7)] flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full" />
          </motion.div>
        </motion.div>
      )}

      {/* 💥 Impact */}
      {(phase === "press" || phase === "shake") && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-10 right-10 w-32 h-32 bg-black/30 rounded-full blur-2xl z-10"
        />
      )}

      {/* 📄 Paper Dent */}
      {(phase === "press" || phase === "shake") && (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{
            boxShadow: "inset 0 10px 25px rgba(0,0,0,0.3)",
          }}
        />
      )}

      {/* 🩸 Ink */}
      {(phase === "ink" || phase === "lift") && (
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
            rotate: baseRotate + 2,
            x: inkOffset,
            y: inkOffset,
          }}
          animate={{
            scale: 1,
            opacity: 0.95,
          }}
          transition={{ duration: 0.4 }}
          className="absolute top-6 right-4 z-20"
        >
          <div className="relative w-28 h-28 flex items-center justify-center">

            {/* 🎯 radial reveal (center-out ink) */}
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(75% at 50% 50%)" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* outer ring */}
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: color }}
              />

              {/* inner ring */}
              <div
                className="absolute inset-3 rounded-full border"
                style={{ borderColor: color, opacity: 0.5 }}
              />

              {/* text */}
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div
                                  className="text-[11px] font-bold tracking-widest text-center leading-none"
                                  style={{ color }}
                              >
                                  {status}
                              </div>
                          </div>

              {/* ink base */}
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.12 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
              />
            </motion.div>

            {/* 🩸 ink bleed */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0.4 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: color,
                filter: "blur(10px)",
              }}
            />

            {/* 🌫️ drying texture */}
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 3 }}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
