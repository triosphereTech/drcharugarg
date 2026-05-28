import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";


export const metadata = {
  title: "Dr Charu Garg",
  description: "Modern Dermatology Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Navbar/>
        <div className="pt-22">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}