import "./globals.css";

export const metadata = {
  title: "Dr Charu Garg",
  description: "Modern Dermatology Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
          {children}
      </body>
    </html>
  );
}