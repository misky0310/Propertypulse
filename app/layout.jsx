import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "@/context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PropertyPulse | Find your perfect rental",
  description:
    "Find your perfect rental property with PropertyPulse. Search for houses, apartments, and more in your area.",
  keywords: "rental,find rentals,properties,find properties",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalContextProvider>
        <html lang="en">
          <body className={`${inter.className} bg-black`}>
            <Navbar />
            <main>{children}</main>
            <ToastContainer />
          </body>
        </html>
      </GlobalContextProvider>
    </AuthProvider>
  );
}
