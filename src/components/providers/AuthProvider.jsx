"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/redux/features/userSlice";

export default function AuthProvider({ children }) {

  const dispatch = useDispatch();

  useEffect(() => {

    const getUser = async () => {

      try {

        const response = await fetch("/api/me");

        // USER NOT LOGGED IN
        if (!response.ok) {
          return;
        }

        const data = await response.json();

        dispatch(setUser(data.patient));

      } catch (error) {

        // DO NOTHING
      }
    };

    getUser();

  }, [dispatch]);

  return children;
}