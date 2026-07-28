"use client";

import React, { useState } from "react";
import { PatientSidebar } from "./layout/PatientSidebar";
import { PatientBottomNav } from "./layout/PatientBottomNav";
import { DashboardOverview } from "./layout/DashboardOverview";
import { AppointmentHistory } from "./layout/AppointmentHistory";
import { BookFollowUp } from "./layout/BookFollowUp";
import { ProfileSection } from "./layout/ProfileSection";
import { initialPatient, initialAppointments } from "./data/Temppatientdata";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";

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
  "apt-completed": "attended",
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

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
      setMessage(data.message || "Logout successful.");

      window.location.href = "/"; // Redirect to login page after logout
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const renderContent = () => {
    if (APPOINTMENT_FILTER_KEYS[activeKey]) {
      return (
        <AppointmentHistory
          appointments={appointments}
          filter={APPOINTMENT_FILTER_KEYS[activeKey]}
          onNavigate={setActiveKey}
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
          <BookFollowUp
            setAppointments={setAppointments}
            onNavigate={setActiveKey}
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
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-sm text-gray-400">
              Manage your appointments and profile
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveKey("profile")}
            className="flex items-center gap-2.5 pl-1.5 pr-1.5 py-1.5 rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50 cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold">
              {/* {initials(patient.name)} */}
              {patient ? initials(patient.name) : ""}
            </span>
            <span className="text-sm font-semibold text-gray-700 hidden sm:block">
              {/* {patient.name.split(" ")[0]} */}
              {patient?.name?.split(" ")[0]}
            </span>
          </button>
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
