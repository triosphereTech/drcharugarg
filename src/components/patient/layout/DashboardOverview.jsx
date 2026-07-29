"use client";

import React, { useMemo } from "react";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  CalendarCheck2,
  XCircle,
  Layers,
  UserCog,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";
import { formatDateLong } from "../data/Temppatientdata";

const STAT_CARDS = [
  {
    key: "all",
    label: "All Appointments",
    icon: Layers,
    bar: "bg-gray-900",
    iconBg: "bg-gray-100 text-gray-700",
  },
  {
    key: "upcoming",
    label: "Upcoming",
    icon: CalendarDays,
    bar: "bg-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CalendarCheck2,
    bar: "bg-green-400",
    iconBg: "bg-green-50 text-green-600",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    bar: "bg-red-400",
    iconBg: "bg-red-50 text-red-500",
  },
];

export const DashboardOverview = ({ patient, appointments, onNavigate }) => {
  const counts = useMemo(
    () => ({
      all: appointments.length,
      upcoming: appointments.filter((a) => a.status === "pending").length,
      completed: appointments.filter((a) => a.status === "attended").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    }),
    [appointments],
  );

  const nextAppointment = useMemo(
    () =>
      appointments
        .filter((a) => a.status === "pending")
        .sort((a, b) => (a.date < b.date ? -1 : 1))[0],
    [appointments],
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Welcome back, {patient.name.split(" ")[0]}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Here's a quick look at your care journey.
        </p>
      </div>

      {/* Stats: count on top, label at bottom */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => onNavigate(`apt-${card.key}`)}
              className="text-left bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden cursor-pointer active:scale-95 transition-all duration-150 hover:border-gray-200"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${card.bar}`}
              />
              <div className="flex items-start justify-between mb-1">
                <p className="text-3xl font-bold text-gray-900">
                  {counts[card.key]}
                </p>
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-xl ${card.iconBg}`}
                >
                  <Icon size={16} />
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-2">
                {card.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Next appointment */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          Next Appointment
        </p>
        {nextAppointment ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white shrink-0">
              <Stethoscope size={20} />
            </span>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">
                {nextAppointment.service}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                Dr. Charu Garg
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <CalendarDays size={13} />
                  {formatDateLong(nextAppointment.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {nextAppointment.slotStartTime && nextAppointment.slotEndTime ? `${nextAppointment.slotStartTime} - ${nextAppointment.slotEndTime}` : nextAppointment.timeSlot}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("apt-upcoming")}
              className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
            >
              View Details <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-400 ">
              You have no upcoming appointments.
            </p>
          </div>
        )}
      </div>

      {/* Quick actions */}
      {/* <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onNavigate("book")}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-95 transition-all duration-150 hover:border-gray-200"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-700 mb-3">
              <RefreshCcw size={18} />
            </span>
            <p className="font-bold text-gray-900 text-sm mb-0.5">
              Book Follow-up
            </p>
            <p className="text-xs text-gray-400">Schedule your next visit</p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left cursor-pointer active:scale-95 transition-all duration-150 hover:border-gray-200"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-700 mb-3">
              <UserCog size={18} />
            </span>
            <p className="font-bold text-gray-900 text-sm mb-0.5">
              Edit Profile
            </p>
            <p className="text-xs text-gray-400">Update your information</p>
          </button>
        </div>
      </div> */}
    </div>
  );
};
