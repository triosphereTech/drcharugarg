"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarOff,
  CalendarCheck2,
  X,
  Info,
} from "lucide-react";
import { formatDateKey, formatDateLong } from "./data/Tempsettingsdata";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const AppointmentAvailability = ({
  availability,
  templates,
  onChanged,
  onError,
}) => {
  const [monthCursor, setMonthCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedKey, setSelectedKey] = useState(null);
  const [draftTemplateId, setDraftTemplateId] = useState("");
  const [draftIsOff, setDraftIsOff] = useState(false);

  const today = startOfToday();

  const monthLabel = monthCursor.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const days = useMemo(() => {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++)
      cells.push(new Date(year, month, d));
    return cells;
  }, [monthCursor]);

  const changeMonth = (delta) => {
    setMonthCursor((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + delta);
      return d;
    });
  };

  const selectDate = (date) => {
    if (!date) return;
    if (date <= today) return;
    const key = formatDateKey(date);
    const existing = availability[key];
    setSelectedKey(key);
    setDraftTemplateId(existing?.templateId || "");
    setDraftIsOff(existing?.isOff || false);
  };

  const saveOverride = async () => {
    if (!selectedKey) return;
    try {
      if (!draftIsOff && !draftTemplateId) return clearOverride(selectedKey);
      const response = await fetch("/api/admin/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedKey,
          templateId: draftTemplateId || null,
          isOff: draftIsOff,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.message || "Unable to save availability.");
      await onChanged();
      setSelectedKey(null);
    } catch (error) {
      onError(error.message || "Unable to save availability.");
    }
  };

  const clearOverride = async (key) => {
    try {
      const response = await fetch(`/api/admin/availability?date=${key}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data.message || "Unable to reset availability.");
      await onChanged();
      if (selectedKey === key) setSelectedKey(null);
    } catch (error) {
      onError(error.message || "Unable to reset availability.");
    }
  };

  const templateName = (id) => templates.find((t) => t._id === id)?.name || "—";

  const upcomingOverrides = useMemo(() => {
    return Object.entries(availability)
      .filter(([key]) => new Date(`${key}T00:00:00`) > today)
      .sort(([a], [b]) => (a < b ? -1 : 1));
  }, [availability, today]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Appointment Booking Availability
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Pick a date, assign a time slot template to it, or mark it as a day
          off.
        </p>
      </div>
      <div className="mt-3 mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Note:</span> Same-day appointments are
          not allowed. Availability templates can only be assigned to future
          dates starting from tomorrow.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900">{monthLabel}</h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer active:scale-90 transition-all duration-150"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer active:scale-90 transition-all duration-150"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {WEEKDAYS.map((w) => (
              <div
                key={w}
                className="text-center text-xs font-semibold text-gray-400 py-1.5"
              >
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {days.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} />;

              const key = formatDateKey(date);
              const info = availability[key];
              const isPast = date <= today;
              // const isToday = formatDateKey(today) === key
              const isSelected = selectedKey === key;

              let cellClasses =
                "relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all duration-150 ";

              if (isPast) {
                cellClasses += "text-gray-300 cursor-not-allowed";
              } else if (info?.isOff) {
                cellClasses +=
                  "bg-red-50 text-red-500 font-semibold hover:bg-red-100 cursor-pointer active:scale-90";
              } else if (info?.templateId) {
                cellClasses +=
                  "bg-blue-50 text-blue-500 font-semibold hover:bg-blue-100 cursor-pointer active:scale-90";
              } else {
                cellClasses +=
                  "text-gray-600 bg-gray-50 hover:bg-gray-100 cursor-pointer active:scale-90";
              }

              if (isSelected) cellClasses += " ring-2 ring-blue-400";
              // if (isToday && !isSelected) cellClasses += " ring-1 ring-gray-300"

              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => selectDate(date)}
                  className={cellClasses}
                >
                  {date.getDate()}
                  {info?.isOff && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-0.5" />
                  )}
                  {info?.templateId && !info?.isOff && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Template
              assigned
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Day off
            </span>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-5">
          {selectedKey ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                    Manage Availability
                  </p>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {formatDateLong(selectedKey)}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedKey(null)}
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-500 cursor-pointer active:scale-90 transition-all duration-150"
                >
                  <X size={16} />
                </button>
              </div>

              <label className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-gray-50 mb-4 cursor-pointer">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CalendarOff size={16} className="text-red-500" />
                  Mark as day off
                </span>
                <input
                  type="checkbox"
                  checked={draftIsOff}
                  onChange={(e) => setDraftIsOff(e.target.checked)}
                  className="w-4 h-4 accent-gray-900 cursor-pointer"
                />
              </label>

              {!draftIsOff && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                    Assign Time Slot Template
                  </label>
                  <select
                    value={draftTemplateId}
                    onChange={(e) => setDraftTemplateId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                  >
                    <option value="">No template assigned</option>
                    {templates.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name} ({t.slots.length} slots)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveOverride}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all duration-150"
                >
                  <CalendarCheck2 size={15} />
                  Save
                </button>
                {availability[selectedKey] && (
                  <button
                    type="button"
                    onClick={() => clearOverride(selectedKey)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer active:scale-95 transition-all duration-150"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center">
              <Info size={20} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">
                Select a date on the calendar to manage its availability.
              </p>
            </div>
          )}

          {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              Upcoming Overrides
            </p>
            {upcomingOverrides.length === 0 ? (
              <p className="text-sm text-gray-400">No custom availability set yet.</p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {upcomingOverrides.map(([key, info]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50 text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {new Date(`${key}T00:00:00`).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                      {info.isOff ? (
                        <span className="text-xs text-red-500 font-medium">Day off</span>
                      ) : (
                        <span className="text-xs text-gray-600 font-medium">{templateName(info.templateId)}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => clearOverride(key)}
                      className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 cursor-pointer active:scale-90 transition-all duration-150"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
