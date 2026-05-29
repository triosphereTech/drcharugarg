import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Providers from "@/redux/Providers";
import AuthProvider from "@/components/providers/AuthProvider";


export default function ClientLayout({ children }) {
  return (
    <Providers>
      <AuthProvider>
        <Navbar />

        <div className="pt-22">
          {children}
        </div>

        <Footer />
      </AuthProvider>
    </Providers>
  );
}