import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Calendar, CheckCircle } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Task Management",
    desc: "Easily create, assign, and prioritize tasks."
  },
  {
    icon: Calendar,
    title: "Project Planning",
    desc: "Set milestones and keep your team aligned."
  },
  {
    icon: CheckCircle,
    title: "Progress Tracking",
    desc: "Visualize your progress and hit deadlines."
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-16">
      {/* Hero Section */}
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Track Smarter. Stay Organized.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Manage your projects and tasks effortlessly with our intuitive and powerful tracker app.
        </p>
        <button className="bg-teal-500 hover:bg-teal-400 text-white text-lg px-6 py-3 rounded-xl shadow-lg transition">
          Get Started
        </button>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-20 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-center mb-10">Powerful Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center w-72"
    >
      <Icon className="w-10 h-10 text-teal-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </motion.div>
  );
}
