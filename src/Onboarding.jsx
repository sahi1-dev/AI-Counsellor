import { useState } from "react";

export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    name: "",
    degree: "",
    country: "",
    budget: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.degree || !form.country || !form.budget) {
      alert("Please fill all fields");
      return;
    }

    // store basic profile (optional but good for demo)
    localStorage.setItem("userProfile", JSON.stringify(form));

    onComplete();
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#090c14]">

      {/* CARD */}
      <div className="w-full max-w-md bg-[#0f1522] rounded-2xl p-8 shadow-2xl border border-white/10">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Let’s plan your future 🎓
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Answer a few questions to personalize your AI counsellor
        </p>

        {/* INPUTS */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-black/40 text-white
          placeholder-gray-500 outline-none border border-white/10
          focus:border-blue-500 transition"
        />

        <input
          name="degree"
          value={form.degree}
          onChange={handleChange}
          placeholder="Current Degree / Major"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-black/40 text-white
          placeholder-gray-500 outline-none border border-white/10
          focus:border-blue-500 transition"
        />

        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Target Country"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-black/40 text-white
          placeholder-gray-500 outline-none border border-white/10
          focus:border-blue-500 transition"
        />

        <input
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Annual Budget (USD)"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-black/40 text-white
          placeholder-gray-500 outline-none border border-white/10
          focus:border-blue-500 transition"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-blue-600 to-purple-600
          hover:scale-[1.02] transition"
        >
          Start My AI Counselling →
        </button>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-500 text-center mt-4">
          🤖 Your answers stay local. No data is stored.
        </p>
      </div>
    </div>
  );
}
