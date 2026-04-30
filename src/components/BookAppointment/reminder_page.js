import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Stamp } from "./stamp";

const ReminderNote = ({ next, date, slot, employeeName, status,rejectReason }) => {
    const [fall, setFall] = useState(false);
   const [startStamp, setStartStamp] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouseMove(e) {
        if (fall) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const handleClick = () => {
        setFall(true);
        setTimeout(() => {
            next();
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative perspective-[1400px]">
                <div className="absolute -top-20 -right-10 z-50 pointer-events-none">
                    <Stamp trigger={startStamp} 
                    status={(status === 'Pending' || status === 'In progress') ? "Approved": status } />
                </div>
                {/* Pin */}
                <motion.div
                    initial={{ y: -100, rotate: -15, opacity: 0 }}
                    animate={
                        fall
                            ? { y: -40, opacity: 0 }
                            : { y: 0, rotate: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute left-1/2 -translate-x-1/2 -top-14 z-30 flex flex-col items-center"
                    onAnimationComplete={() => {
                        if (!fall) {
                            setTimeout(() => setStartStamp(true), 400);
                        }
                    }}
                >
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-900 shadow-[inset_-4px_-8px_12px_rgba(0,0,0,0.6),0_10px_18px_rgba(0,0,0,0.5)] border border-amber-900">
                        <div className="absolute top-1 left-2 w-2 h-2 bg-white/70 rounded-full blur-[1px]" />
                    </div>
                    <div className="w-[2px] h-12 bg-gradient-to-b from-gray-100 to-gray-700" />
                </motion.div>

                {/* Sticky Note */}
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={!fall ? { rotateX, rotateY } : {}}
                    initial={{ rotate: -12, scale: 0.8, opacity: 0 }}
                    animate={
                        fall
                            ? {
                                y: 700,
                                rotate: 25,
                                opacity: 0,
                            }
                            : { rotate: -3, scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 1.2, ease: "easeIn" }}
                    className="relative bg-[#f3e9dc] w-[320px] p-6 text-center rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden"
                >
                    {/* 🔥 Stamp added here
                    <Stamp
                        trigger={startStamp}
                        status={status}
                    /> */}

                    {/* bottom curl */}
                    <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none">
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-200 via-white to-transparent rounded-t-[50%]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-black/20 blur-xl rounded-full" />
                    </div>

                    <h2 className="text-xl font-serif mb-2 relative z-10">Reminder</h2>

                    <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                        Your appointment is scheduled on{" "}
                        <span className="font-semibold">{date}</span> at{" "}
                        <span className="font-semibold">{slot}</span> with{" "}
                        <span className="font-semibold">{employeeName}</span>.
                    </p>

                    {((status === 'Cancelled' || status === 'Rejected') && rejectReason !== 'None') &&
                        <p className="text-sm w-full flex items-start text-red-500  z-10">
                           Reason : {rejectReason}
                        </p>
                    }

                     <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                        <br />
                        If you want to modify or book another appointment, you can do it.
                    </p>

                    <button
                        onClick={handleClick}
                        className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md shadow hover:bg-amber-700 transition relative z-10"
                    >
                        Manage Appointment
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default ReminderNote;
