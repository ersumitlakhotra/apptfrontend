import { Input } from "antd";
import React, { useEffect, useState } from "react";
const PaymentCard = ({ isEdit,onClick, name, setName, cardNumber, setCardNumber,month,  setMonth, year, setYear, cvv, setCvv,expiry, setExpiry,isCardExpired, setIsCardExpired }) => {
    const [flip, setFlip] = useState(false);

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{1,4}/g);
        const match = matches && matches.join(" ");
        return match || "";
    };

    const getCardType = () => {
        if (cardNumber.startsWith("4")) return "VISA";
        if (cardNumber.startsWith("5")) return "MASTERCARD";
        if (cardNumber.startsWith("3")) return "AMEX";
        return "CARD";
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) return;

        let mm = value.substring(0, 2);
        let yy = value.substring(2, 4);

        // limit month between 01-12
        if (mm.length === 2) {
            if (parseInt(mm) > 12) {
                mm = "12";
            }
            if (parseInt(mm) === 0) {
                mm = "01";
            }
        }

        let formatted = mm;

        if (value.length > 2) {
            formatted += "/" + yy;
        }

        setExpiry(formatted);
        setMonth(mm);
        setYear(yy);
    };
    useEffect(() => {
        setIsCardExpired(handleCardExpired(month, year))
    }, [month, year])

    const handleCardExpired = (month, year) => {
        if (!month || !year) return false;

        const now = new Date();

        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear() % 100; // last 2 digits

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        if (expYear < currentYear) return true;

        if (expYear === currentYear && expMonth < currentMonth) return true;

        return false;
    };

    return (
        <div  className="p-4 flex flex-col md:flex-row items-center  gap-10">


            {/* PAYMENT FORM */}
            {isEdit &&
                <div className="bg-white rounded-xl shadow-lg p-6 w-96 space-y-4">
                    <Input
                        type="text"
                        placeholder="Card Holder Name"
                         status={name ==='' ? 'error':  ''}
                        style={{ fontSize: 16 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <Input
                        type="text"
                        placeholder="Card Number"
                        status={cardNumber.length !==19 ? 'error':  ''}
                        style={{ fontSize: 16 }}
                        value={cardNumber}
                        maxLength={19}
                        onChange={(e) =>
                            setCardNumber(formatCardNumber(e.target.value))
                        }
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div className="flex gap-4">

                        <Input
                            type="text"
                            placeholder="MM/YY"
                            style={{fontSize: 16 }}
                            value={expiry}
                            status={isCardExpired ? 'error':''}
                            maxLength={5}
                            onChange={(e) => handleExpiryChange(e)}
                            className="w-1/2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <Input
                            type="text"
                            placeholder="CVV"
                            value={cvv}   
                            status={cvv.length !==3 ? 'error':  ''}
                            style={{ fontSize: 16 }}
                            maxLength={3}
                            onFocus={() => setFlip(true)}
                            onBlur={() => setFlip(false)}
                            onChange={(e) => {setFlip(true);setCvv(e.target.value);}}
                            className="w-1/2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                </div>}

            {/* CARD PREVIEW */}

            <div onMouseEnter={() => setFlip(true)} onMouseLeave={() => setFlip(false)} onClick={onClick} className="perspective w-96 h-56 cursor-pointer">
                <div className={`relative w-full h-full duration-700 transform-style-preserve-3d ${flip ? "rotate-y-180" : ""}`}>

                    {/* FRONT */}
                    <div className="absolute w-full h-full rounded-2xl p-6 text-white shadow-xl bg-slate-500 backdrop-blur-xl border border-white/20 backface-hidden">

                        <div className="flex justify-between">
                            <div className="w-12 h-9 bg-yellow-400 rounded-md"></div>
                            <div className="text-xl italic font-bold">
                                {getCardType()}
                            </div>
                        </div>

                        <div className="mt-10 text-xl tracking-widest">
                            {cardNumber || "#### #### #### ####"}
                        </div>

                        <div className="flex justify-between mt-6">

                            <div>
                                <p className="text-xs opacity-70">CARD HOLDER</p>
                                <p className="text-sm">{name || "FULL NAME"}</p>
                            </div>

                            <div>
                                <p className="text-xs opacity-70">EXPIRES</p>
                                <p className="text-sm">{expiry || "MM/YY"}</p>
                            </div>

                        </div>

                    </div>

                    {/* BACK */}

                    <div className="absolute w-full h-full rounded-2xl bg-slate-500  backdrop-blur-xl border border-white/20 rotate-y-180 backface-hidden shadow-xl">

                        <div className="bg-black h-12 mt-6"></div>

                        <div className="px-6 mt-6">
                            <div className="bg-white h-10 flex justify-end items-center pr-3 text-black font-semibold">
                                {cvv || "CVV"}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <style jsx>{`

        .perspective {
          perspective: 1000px;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

      `}</style>

        </div>
    );
}


export default PaymentCard
