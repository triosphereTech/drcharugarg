
import "../globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Dr Charu Garg",
  description: "Modern Dermatology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}