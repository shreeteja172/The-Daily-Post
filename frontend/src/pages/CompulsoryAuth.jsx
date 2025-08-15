import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Sparkles, Users, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const CompulsoryAuth = () => {
  const navigate = useNavigate();
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      text: "Read and share amazing posts",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Watch other creators posts",
      color: "from-teal-400 to-teal-600"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Personalize your experience",
      color: "from-cyan-400 to-cyan-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-neutral-950 to-emerald-900 px-4 sm:px-6 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-teal-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 sm:w-40 h-32 sm:h-40 bg-emerald-400/10 rounded-full blur-2xl"
          style={{ transform: "translate(-50%, -50%)" }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-emerald-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 bg-black/60 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 max-w-sm sm:max-w-lg w-full text-center shadow-2xl shadow-emerald-500/20"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Enhanced Icon */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative">
            <motion.div
              className="p-4 sm:p-5 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock size={40} className="sm:w-12 sm:h-12 w-10 h-10 text-emerald-400 drop-shadow-lg" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Enhanced Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Access Restricted
        </motion.h1>

        {/* Enhanced Description */}
        <motion.p
          className="text-base sm:text-lg text-emerald-100/80 mb-6 sm:mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          To view this blog, please log in or sign up.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Unlock exclusive content, connect with creators, and join our vibrant
          community!
        </motion.p>

        {/* Enhanced Benefits */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative h-16 sm:h-20 flex items-center justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBenefit}
                className="flex items-center gap-2 sm:gap-3 justify-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${benefits[currentBenefit].color} shadow-lg`}>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                    {benefits[currentBenefit].icon}
                  </div>
                </div>
                <span className="text-emerald-100 font-medium text-sm sm:text-base">
                  {benefits[currentBenefit].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Static benefits list */}
          <ul className="flex flex-col gap-2 sm:gap-3 text-left text-emerald-100/70 text-xs sm:text-sm mx-auto max-w-xs">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                <span>{benefit.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Enhanced Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            onClick={() => navigate("/auth?mode=signin")}
            className="group px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold shadow-lg relative overflow-hidden text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Login
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            onClick={() => navigate("/auth?mode=signup")}
            className="group px-6 sm:px-7 py-3 rounded-full border-2 border-emerald-500 text-emerald-400 font-bold bg-black/30 shadow-lg relative overflow-hidden text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Sign Up
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-emerald-500/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Additional decorative element */}
        <motion.div
          className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-emerald-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-emerald-200/60 text-xs sm:text-sm">
            Join thousands of writers and readers
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CompulsoryAuth;