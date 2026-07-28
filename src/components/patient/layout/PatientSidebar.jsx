"use client"

import React, { useState } from "react"
import { LayoutDashboard, CalendarDays, User, ChevronDown } from "lucide-react"

export const PATIENT_NAV = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard, type: "link" },
  {
    key: "appointments-group",
    label: "Appointments",
    icon: CalendarDays,
    type: "group",
    children: [
      { key: "apt-all", label: "All" },
      { key: "apt-upcoming", label: "Upcoming" },
      { key: "apt-completed", label: "Completed" },
      { key: "apt-cancelled", label: "Cancelled" },
    ],
  },
  { key: "profile", label: "My Profile", icon: User, type: "link" },
]

const findParentKey = (key) =>
  PATIENT_NAV.find((s) => s.type === "group" && s.children.some((c) => c.key === key))?.key

export const PatientSidebar = ({ activeKey, onSelect }) => {
  const [openGroup, setOpenGroup] = useState(findParentKey(activeKey) || "appointments-group")

  const toggleGroup = (key) => setOpenGroup((prev) => (prev === key ? "" : key))

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="p-2 sticky top-6 space-y-1">
        {PATIENT_NAV.map((item) => {
          const Icon = item.icon

          if (item.type === "link") {
            const active = activeKey === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelect(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-bold cursor-pointer active:scale-95 transition-all duration-150 ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Icon size={19} strokeWidth={1.75} className={active ? "text-gray-900" : "text-gray-400"} />
                {item.label}
              </button>
            )
          }

          const isOpen = openGroup === item.key
          const hasActiveChild = item.children.some((c) => c.key === activeKey)
          return (
            <div key={item.key}>
              <button
                type="button"
                onClick={() => toggleGroup(item.key)}
                className="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
              >
                <span className="flex items-center gap-3">
                  <Icon size={19} strokeWidth={1.75} className={hasActiveChild ? "text-gray-900" : "text-gray-500"} />
                  <span className="text-[15px] font-bold text-gray-900">{item.label}</span>
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="relative ml-[26px] pl-5 border-l border-gray-200 py-1 space-y-1">
                    {item.children.map((child) => {
                      const active = activeKey === child.key
                      return (
                        <div key={child.key} className="relative">
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