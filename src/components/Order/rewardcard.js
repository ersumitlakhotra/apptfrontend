import React from "react";
import { pointsToDollars } from "../../common/general";
import { Input } from "antd";
import { FaPiggyBank } from "react-icons/fa";

const RewardCard = ({ totalPoints, redeemPoints, redeem, setRedeem }) => {
    const rewardAmount = pointsToDollars(totalPoints, redeemPoints);
    return (
        <div className="w-full  p-5 rounded-xl shadow-sm">

            {/* Header */}
            <div className="flex items-center gap-2 text-green-700 mb-2">
                <FaPiggyBank style={{fontSize:16}}/>
                <p className="text-sm font-medium">Reward Dollar Balance</p>
            </div>

            {/* Balance */}
            <h2 className="text-3xl font-bold text-green-700 mb-1">
                {`$${rewardAmount}`}
            </h2>



            {/* Apply Box */}
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">



                {/* Input + Button */}
                <div>
                    <p className="text-sm text-gray-700 mb-2">Enter Amount</p>

                    <div className="flex gap-3">
                        <Input placeholder="$50.00"   style={{ fontSize: 16 }} value={redeem} status= {parseFloat(redeem) > parseFloat(rewardAmount) ? 'error':''} 
                         className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"          
                        onChange={(e) => setRedeem(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardCard;
