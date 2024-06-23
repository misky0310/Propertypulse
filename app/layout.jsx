import { Inter } from "next/font/google";
import './globals.css';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PropertyPulse | Find your perfect rental",
  description: "Find your perfect rental property with PropertyPulse. Search for houses, apartments, and more in your area.",
  keywords:'rental,find rentals,properties,find properties'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-black`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
