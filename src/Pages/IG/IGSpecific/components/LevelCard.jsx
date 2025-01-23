"use client";
import { motion } from "framer-motion";
import { PlayCircle } from 'lucide-react';

export function LevelCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="w-64 bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200 cursor-pointer h-48"
    >
      <div className="bg-gradient-to-r from-[#F6842C] to-[#FFA967] p-4 relative h-20">
        <h3 className="text-white text-lg font-medium">{card.title}</h3>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-4 text-white"
        >
          <PlayCircle className="w-14 h-14 bg-white rounded-full text-orange-400 mt-7" />
        </motion.div>
      </div>
      <div className="p-4">
        <div className="flex justify-start gap-4 mb-2">
          <div className="text-center">
            <div className="text-lg font-semibold">{card.resources}</div>
            <div className="text-sm text-gray-600">Resources</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{card.proofOfWork}</div>
            <div className="text-sm text-gray-600">Challenges</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}