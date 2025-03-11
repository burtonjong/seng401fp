"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 pt-12 w-full items-center">
      <motion.h1
        className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-gradient">Endless Odyssey</span>
      </motion.h1>
      <motion.div
        className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      ></motion.div>
    </div>
  );
}
