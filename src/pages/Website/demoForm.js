import React, { useState } from "react";
import { apiCalls } from "../../hook/apiCall";

export default function DemoForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    await sendEmail(form.name, form.phone, form.email, form.message);

    alert("We have received your request and a member of our team will follow up with you shortly.  🚀");

    setForm({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

    const sendEmail = async (name,cell,email,additionalmessage) => {
      const Subject = `New Customer Demo Alert`;
  
      let message = '<p>Name : ' + name + '</p>';
      message += '<p>Cell : '+cell+'</p>';
      message += '<p>Email : '+email+'</p>';
      message += '<p>Additional Message : ' + additionalmessage + '</p>';
      
      const emailMessage = JSON.stringify({
        to: 'ischeduleca@gmail.com',
        subject: Subject,
        message: message,
      });
      await apiCalls('POST', 'sendverification', null, null, emailMessage);
    }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <label className="text-sm text-gray-400">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20
                     outline-none transition"
          placeholder="Enter your name"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm text-gray-400">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20
                     outline-none transition"
          placeholder="Enter your cell"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm text-gray-400">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20
                     outline-none transition"
          placeholder="Enter your email"
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="text-sm text-gray-400">Additional Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20
                     outline-none transition resize-none"
          placeholder="Tell us about your business..."
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-600
                   transition font-medium shadow-lg shadow-purple-500/20
                   hover:scale-[1.02]"
      >
        Send Request
      </button>

    </form>
  );
}
