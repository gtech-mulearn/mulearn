"use client"
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'

export function JumpButton({ level }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex justify-center my-4"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white border border-orange-400 hover:bg-orange-400 hover:text-white text-black px-6 py-2 rounded-full flex items-center gap-2 group"
      >
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        <span>Jump to Level {level}</span>
       
      </motion.button>
    </motion.div>
  )
}