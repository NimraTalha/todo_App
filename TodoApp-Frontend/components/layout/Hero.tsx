"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  userName?: string;
  pending?: number;
  onPrimaryAction?: () => void;
}

export default function Hero({ userName = 'User', pending = 0, onPrimaryAction }: HeroProps) {
  return (
    <section className="mb-12 relative z-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">Dashboard</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Welcome back, <span className="text-purple-600">{userName}</span>
          </h1>

          <p className="text-base text-gray-600 mb-5">
            You have <span className="font-bold text-purple-700">{pending}</span> pending tasks. Let's get started!
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onPrimaryAction}
              className="rounded-lg bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white"
            >
              Add New Task
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="rounded-lg text-gray-600 hover:bg-gray-100"
            >
              View All
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="w-full lg:w-80"
        >
          {/* Decorative animated SVG card */}
          <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-5 border border-purple-100 shadow-sm">
            <svg viewBox="0 0 320 180" className="w-full h-24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#g1)" rx="12" ry="12" opacity="0.12" />
              <g fill="none" stroke="rgba(139,92,246,0.16)" strokeWidth="1">
                <path d="M10 140 Q80 20 160 140 T310 140" strokeOpacity="0.5" />
              </g>
            </svg>

            <div className="mt-2">
              <h4 className="text-base font-semibold text-purple-800">Productivity Overview</h4>
              <p className="text-xs text-gray-600">Track your progress and stay organized.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
