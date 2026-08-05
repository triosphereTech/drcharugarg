"use client";

import React, { useState } from "react";
import { PatientSidebar } from "./layout/PatientSidebar";
import { PatientBottomNav } from "./layout/PatientBottomNav";
import { DashboardOverview } from "./layout/DashboardOverview";
import { AppointmentHistory } from "./layout/AppointmentHistory";
import { BookFollowUp } from "./layout/BookFollowUp";
import { ProfileSection } from "./layout/ProfileSection";
import BookingSection from "@/components/home/Bookingsection";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/brand/LogoTop.png";

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Maps a sidebar/bottom-nav key to the appointment status filter it represents
const APPOINTMENT_FILTER_KEYS = {
  "apt-all": "all",

  "apt-upcoming": "pending",
  "apt-pending": "pending",

  "apt-completed": "attended",
  "apt-attended": "attended",

  "apt-cancelled": "cancelled",
};

export const PatientDashboardContent = () => {
  const router = useRouter();

  const [activeKey, setActiveKey] = useState("overview");

  // const [patient, setPatient] = useState(initialPatient)
  // const [appointments, setAppointments] = useState(initialAppointments)

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [profileRes, appointmentRes] = await Promise.all([
        fetch("/api/patient/profile"),
        fetch("/api/patient/appointments"),
      ]);

      const profileData = await profileRes.json();
      const appointmentData = await appointmentRes.json();

      if (profileData.success) {
        console.log("this is profile data :::", profileData);

        setPatient(profileData.patient);
      }

      if (appointmentData.success) {
        setAppointments(appointmentData.appointments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadDashboard();
  }, []);
const handleFollowUp = (appointment) => {
  setSelectedAppointmentId(appointment._id);
  setActiveKey("followup");
};
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      console.log("this is logout data",data);
      
      if (!res.ok) {
        throw new Error(data.message || "Unable to logout.");
      }
      dispatch(clearUser()); // Clear user from Redux store

      window.location.href = "/"; // Redirect to login page after logout
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
const refreshAppointments = async () => {
  try {
    const res = await fetch("/api/patient/appointments");
    const data = await res.json();

    if (data.success) {
      setAppointments(data.appointments);
    }
  } catch (err) {
    console.log(err);
  }
};
  const renderContent = () => {
    if (APPOINTMENT_FILTER_KEYS[activeKey]) {
      return (
        <AppointmentHistory
          appointments={appointments}
          filter={APPOINTMENT_FILTER_KEYS[activeKey]}
          onNavigate={setActiveKey}
            onFollowUp={handleFollowUp}

        />
      );
    }

    switch (activeKey) {
      case "overview":
        return (
          <DashboardOverview
            patient={patient}
            appointments={appointments}
            onNavigate={setActiveKey}
          />
        );
      case "book":
  return (
    <BookingSection
      setAppointments={setAppointments}
      onNavigate={setActiveKey}
    />
  );

case "followup":
  return (
    <BookFollowUp
      parentAppointmentId={selectedAppointmentId}
      setAppointments={setAppointments}
      onNavigate={setActiveKey}
      refreshAppointments={refreshAppointments}
    />
  );
      case "profile":
        return <ProfileSection patient={patient} setPatient={setPatient} />;
      default:
        return null;
    }
  };
  if (loading || !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white px-3 md:px-8 py-6 pb-24 lg:pb-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              priority
              className="h-12 w-auto object-contain md:h-20 xl:h-18"
            />
            </Link>
          </div>
          <div className="relative shrink-0">
            <button
              type="button"
              aria-expanded={profileMenuOpen}
              onClick={() => {
                setActiveKey("profile");
                setProfileMenuOpen((open) => !open);
              }}
              className="flex items-center gap-2.5 pl-1.5 pr-1.5 py-1.5 rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50 cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D8CE9] text-lg font-semibold text-white">
                {/* {initials(patient.name)} */}
                {patient ? initials(patient.name) : ""}
              </span>
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {/* {patient.name.split(" ")[0]} */}
                {patient?.name?.split(" ")[0]}
              </span>
              <ChevronDown
                size={15}
                className={`text-gray-400 sm:hidden transition-transform duration-200 ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`sm:hidden absolute right-0 top-[calc(100%+8px)] z-30 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/70 transition-all duration-200 ${
                profileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-50 active:scale-95 transition-all duration-150"
              >
                <LogOut size={17} strokeWidth={1.8} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <PatientSidebar
            activeKey={activeKey}
            onSelect={setActiveKey}
            onLogout={handleLogout}
          />
          <div className="flex-1 bg-gray-50 rounded-3xl px-3 py-4 md:p-8 min-h-[60vh]">
            {renderContent()}
          </div>
        </div>
      </div>

      <PatientBottomNav activeKey={activeKey} onSelect={setActiveKey} />
    </div>
  );
};
