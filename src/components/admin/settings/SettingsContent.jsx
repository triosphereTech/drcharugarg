"use client"

import React, { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { SettingsSidebar } from "./SettingsSidebar"
import { TimeSlotTemplates } from "./TimeSlotTemplates"
import { AppointmentAvailability } from "./AppointmentAvailability"
import { InitialFeeSection, ServicesSection, ReappointmentFeeSection } from "./FeeConfiguration"
import {
  initialTimeSlotTemplates,
  initialAvailability,
  initialServices,
  initialGeneralFees,
} from "./data/Tempsettingsdata"

export const SettingsContent = () => {
  const [activeKey, setActiveKey] = useState("timeSlots")

  // Shared, in-memory (temp) state for the whole settings page
  const [templates, setTemplates] = useState(initialTimeSlotTemplates)
  const [availability, setAvailability] = useState(initialAvailability)
  const [services, setServices] = useState(initialServices)
  const [generalFees, setGeneralFees] = useState(initialGeneralFees)

  const renderContent = () => {
    switch (activeKey) {
      case "timeSlots":
        return <TimeSlotTemplates templates={templates} setTemplates={setTemplates} />
      case "availability":
        return (
          <AppointmentAvailability
            availability={availability}
            setAvailability={setAvailability}
            templates={templates}
          />
        )
      // case "initialFee":
      //   return <InitialFeeSection generalFees={generalFees} setGeneralFees={setGeneralFees} />
      case "serviceFees":
        return <ServicesSection services={services} setServices={setServices} />
      // case "reappointmentFee":
      //   return <ReappointmentFeeSection generalFees={generalFees} setGeneralFees={setGeneralFees} />
      default:
        return null
    }
  }

  return (
    <div className="bg-white px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gray-100 text-gray-700">
            <SlidersHorizontal size={20} strokeWidth={2} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Practice Settings</h1>
            <p className="text-sm text-gray-400">Manage scheduling, availability and consultation fees</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <SettingsSidebar activeKey={activeKey} onSelect={setActiveKey} />
          <div className="flex-1 bg-gray-50 rounded-3xl p-6 md:p-8 min-h-[60vh]">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}