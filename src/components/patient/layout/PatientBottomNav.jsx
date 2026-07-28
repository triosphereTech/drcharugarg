"use client"

import React from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, CalendarDays, User } from "lucide-react"

const TABS = [
  { key: "overview", icon: LayoutDashboard, label: "Home" },
  { key: "apt-all", icon: CalendarDays, label: "Appointments" },
  { key: "profile", icon: User, label: "Profile" },
]

// Section keys that should light up a given tab
const TAB_ALIASES = {
  "appointments-group": "apt-all",
  "apt-upcoming": "apt-all",
  "apt-completed": "apt-all",
  "apt-cancelled": "apt-all",
  book: "apt-all",
}

export const PatientBottomNav = ({ activeKey, onSelect }) => {
  const resolvedActive = TAB_ALIASES[activeKey] || activeKey

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur-sm border-t border-gray-100 px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
      <div className="flex items-center justify-between max-w-xs mx-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = resolvedActive === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelect(tab.key)}
              className="relative flex-1 flex flex-col items-center justify-center py-1 cursor-pointer active:scale-90 transition-transform duration-150"
            >
              <span className="relative flex items-center justify-center w-12 h-12">
                {active && (
                  <motion.span
                    layoutId="patient-bottom-nav-pill"
                    className="absolute inset-0 rounded-full bg-gray-900"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={`relative z-10 transition-colors duration-150 ${
                    active ? "text-white" : "text-gray-400"
                  }`}
                />
              </span>
              <span className={`text-[10px] font-semibold mt-0.5 ${active ? "text-gray-900" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}