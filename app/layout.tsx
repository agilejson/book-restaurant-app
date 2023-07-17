import NavBar from "./components/NavBar";
import AuthProvider from "./context/AuthContext";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

import { Poppins } from "@next/font/google";

const poppins = Poppins({
  // This reduces the size of the font file and improves performance. You'll need to define which of these subsets you want to preload. F
  subsets: ["latin"],
  // if we just want font-weight 100 then we can just provide "100"(string 100)
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={poppins.className}>
        <main className="min-h-screen ">
          <main className="max-w-8xl m-auto bg-gray-100 ">
            <AuthProvider>
              <NavBar />
              {children}
            </AuthProvider>
          </main>
        </main>
      </body>
    </html>
  );
}
