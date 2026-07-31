"use client"

import React, { useCallback, useEffect, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { SettingsSidebar } from "./SettingsSidebar"
import { TimeSlotTemplates } from "./TimeSlotTemplates"
import { AppointmentAvailability } from "./AppointmentAvailability"
import { InitialFeeSection, ServicesSection, ReappointmentFeeSection } from "./FeeConfiguration"

export const SettingsContent = () => {
  const [activeKey, setActiveKey] = useState("timeSlots")

  const [templates, setTemplates] = useState([])
  const [availability, setAvailability] = useState({})
  const [services, setServices] = useState([])
  const [scheduleError, setScheduleError] = useState("")

  const loadTemplates = useCallback(async () => {
    const response = await fetch("/api/admin/availability/templates")
    const data = await response.json()
    if (!response.ok || !data.success) throw new Error(data.message || "Could not load slot templates.")
    setTemplates(data.templates || [])
  }, [])

  const loadAvailability = useCallback(async () => {
    const now = new Date()
    const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    const startDate = formatDate(new Date(now.getFullYear(), now.getMonth(), 1))
    const endDate = formatDate(new Date(now.getFullYear() + 1, 11, 31))
    const response = await fetch(`/api/admin/availability?startDate=${startDate}&endDate=${endDate}`)
    const data = await response.json()
    if (!response.ok || !data.success) throw new Error(data.message || "Could not load availability.")
    setAvailability(Object.fromEntries((data.dates || []).filter((item) => item.status !== "unconfigured").map((item) => [item.date, { templateId: item.templateId, isOff: item.isOff }])))
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      Promise.all([loadTemplates(), loadAvailability()]).catch((error) => setScheduleError(error.message || "Could not load scheduling settings."))
    }, 0)
    return () => window.clearTimeout(timer)
  }, [loadAvailability, loadTemplates])

  const renderContent = () => {
    switch (activeKey) {
      case "timeSlots":
        return <TimeSlotTemplates templates={templates} onChanged={loadTemplates} onError={setScheduleError} />
      case "availability":
        return (
          <AppointmentAvailability
            availability={availability}
            templates={templates}
            onChanged={loadAvailability}
            onError={setScheduleError}
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
      <div className="max-w-full mx-auto">
        {/* Page header */}
        {/* <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gray-100 text-gray-700">
            <SlidersHorizontal size={20} strokeWidth={2} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Practice Settings</h1>
            <p className="text-sm text-gray-400">Manage scheduling, availability and consultation fees</p>
          </div>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-6">
          <SettingsSidebar activeKey={activeKey} onSelect={setActiveKey} />
          <div className="flex-1 bg-gray-50 rounded-3xl p-6 md:p-8 min-h-[60vh]">
            {scheduleError && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{scheduleError}</div>}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
