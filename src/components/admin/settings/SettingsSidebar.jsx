"use client"

import React, { useState } from "react"
import { Calendar, IndianRupee, ChevronDown } from "lucide-react"
import { SETTINGS_SECTIONS } from "./data/Tempsettingsdata"

const GROUP_ICONS = {
  Calendar: Calendar,
  IndianRupee: IndianRupee,
}

export const SettingsSidebar = ({ activeKey, onSelect }) => {
  const findParentKey = (key) =>
    SETTINGS_SECTIONS.find((s) => s.children.some((c) => c.key === key))?.key

  const [openGroup, setOpenGroup] = useState(findParentKey(activeKey) || SETTINGS_SECTIONS[0].key)

  const toggleGroup = (key) => {
    setOpenGroup((prev) => (prev === key ? "" : key))
  }

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="p-2 lg:sticky lg:top-6 space-y-1">
        {SETTINGS_SECTIONS.map((section) => {
          const GroupIcon = GROUP_ICONS[section.icon] || Calendar
          const isOpen = openGroup === section.key

          return (
            <div key={section.key}>
              {/* Group header */}
              <button
                type="button"
                onClick={() => toggleGroup(section.key)}
                className="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                <span className="flex items-center gap-3">
                  <GroupIcon size={19} strokeWidth={1.75} className="text-gray-500" />
                  <span className="text-[15px] font-bold text-gray-900">{section.label}</span>
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Children with tree connector line */}
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="relative ml-[26px] pl-5 border-l border-gray-200 py-1 space-y-1">
                    {section.children.map((child) => {
                      const active = activeKey === child.key
                      return (
                        <div key={child.key} className="relative">
                          {/* horizontal connector tick */}
                          <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-px bg-gray-200" />
                          <button
                            type="button"
                            onClick={() => onSelect(child.key)}
                            className={`relative w-full text-left px-4 py-2.5 rounded-xl text-sm cursor-pointer active:scale-95 transition-all duration-150 ${
                              active
                                ? "bg-gray-100 font-bold text-gray-900"
                                : "text-gray-400 font-medium hover:bg-gray-50 hover:text-gray-600"
                            }`}
                          >
                            {child.label}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}