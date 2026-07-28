"use client";

import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Providers from "@/redux/Providers";
import AuthProvider from "@/components/providers/AuthProvider";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide Navbar & Footer for dashboard routes
  const hideLayout = pathname.startsWith("/dashboard");

  return (
    <Providers>
      <AuthProvider>
        {!hideLayout && <Navbar />}

        <main>
          {children}
        </main>

        {!hideLayout && <Footer />}
      </AuthProvider>
    </Providers>
  );
}