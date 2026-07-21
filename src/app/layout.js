import "./globals.css";

import ClientLayout from "@/client-layout";

export const metadata = {
  title: "Fullest",
  description: "lalalala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}