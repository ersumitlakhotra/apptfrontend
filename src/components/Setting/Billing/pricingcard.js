import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import useAlert from "../../../common/alert";

const plans = [
  {
    key:1,
    name: "FREE TRIAL",
    monthly: 0.00,
    title:'Get Started For Free',
    features: [
      "Appointment Records",
      "Clean, Data Management",
      "Inventory Management",
      "Employee Performance",
      "Portal and Mobile Application",
      "Prioritized Support"
    ]
  },
  {
    key:2,
    name: "STANDARD",
    monthly: 49.99,
    title:'Start Standard Plan',
    badge: "Recommended",
    features: [
      "Appointment Records",
      "Clean, Data Management",
      "Inventory Management",
      "Employee Performance",
      "Portal and Mobile Application",
      "Prioritized Support"
    ]
  },
  {
    key:3,
    name: "ENTERPRISE",
    monthly: 89.99,
    title:'Start Enterprise Plan',
    features: [
      "Appointment Records",
      "Clean, Data Management",
      "Inventory Management",
      "Employee Performance",
      "Portal and Mobile Application",
      "Prioritized Support",
      "Website",
      "Text Messages"
    ]
  }
];

const Pricing = () => {
    const {companyList,saveData} = useOutletContext();
    const { contextHolder,warning} = useAlert();
    const [currentPlan,setCurrentPlan]=useState('FREE TRIAL');

    useEffect(() => {
        if (companyList.length !== 0) {
            setCurrentPlan(companyList.plan);
        }
    }, [companyList])

    const save = async (newplan, newpricing, plankey,currentkey) => {
        if (plankey !== currentkey) {
            const Body = JSON.stringify({
                plan: newplan,
                pricing: newpricing
            });
            saveData({
                label: "Plan Details",
                method: "PUT",
                endPoint: "company/plan",
                body: Body
            });
        }
       // else if(plankey < currentkey)
           // warning('Your plan cannot be downgraded. if you would want to, please contact us by phone or email.')
    }  


  return (
    <div className=" p-12">

      {/* Toggle 
      <div className="flex justify-center mb-12">

        <div className="bg-white rounded-full shadow flex p-1">

          <button
            onClick={() => setYearly(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition
            ${!yearly ? "bg-blue-600 text-white" : "text-gray-600"}
            `}
          >
            Monthly
          </button>

          <button
            onClick={() => setYearly(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition
            ${yearly ? "bg-blue-600 text-white" : "text-gray-600"}
            `}
          >
            Yearly
          </button>

        </div>

      </div>
      */}

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {plans.map((plan, index) => {

          const price = plan.monthly;
          const current=currentPlan === plan.name;
          const currentKey= currentPlan ==='FREE TRIAL' ? 1 : currentPlan ==='STANDARD' ? 2 : 3;

          return (
            <motion.div
              key={plan.name}

              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.25, duration: 0.3 }}

              whileHover={{ y: -12, scale: 1.03 }}

              className={`relative rounded-2xl p-[2px]
              ${current
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-transparent"
                }`}
            >

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 h-full shadow-xl overflow-hidden">

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500
                bg-gradient-to-r from-transparent via-white/40 to-transparent
                -skew-x-12 translate-x-[-200%] hover:translate-x-[200%]" />

                {/* Header */}
                <div className="flex justify-between items-center mb-2">

                  <h2 className="text-xl font-semibold">
                    {plan.name}
                  </h2>

                  {plan.badge && (
                    <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}

                </div>

                <p className="text-gray-500 text-sm mb-6">
                  Unlimited data storage.
                </p>

                {/* Price */}
                <div className="mb-6">

                  <span className="text-4xl font-bold">${price} 
                    { price > 0 &&<span className="text-xs text-gray-500 font-normal"> + Tax</span>}
                    </span>

                  <span className="text-gray-500"> / month</span>

                </div>

                {/* Button */}

                <button
                onClick={() => save(plan.name,price, plan.key, currentKey)}
                  className={`w-full py-3 rounded-xl font-medium transition
                  ${current
                      ?"bg-white border border-gray-200 hover:shadow-md" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                    }`}
                >
                  {current ? 'Current Plan' : plan.title }
                </button>

                {/* Features */}
                <ul className="mt-8 space-y-4 text-sm text-gray-700">

                  {plan.features.map((feature, i) => (

                    <li key={i} className="flex gap-3">

                      <FaCheck
                        size={16}
                        className="text-blue-500 mt-1"
                      />

                      {feature}

                    </li>

                  ))}

                </ul>

              </div>

            </motion.div>
          );

        })}

      </div>
{contextHolder}
    </div>
  );
}

export default Pricing
