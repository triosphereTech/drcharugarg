
import "../globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Your Website",
  description: "Your Website Description",
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