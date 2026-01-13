"use client";

import { motion } from "motion/react";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg mb-4"
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Anto
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto"
          >
            Developer & Designer crafting digital experiences
          </motion.p>
        </motion.div>
      </main>
    </>
  );
}
