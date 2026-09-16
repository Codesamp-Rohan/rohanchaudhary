import { Montserrat, Geist_Mono, Instrument_Serif } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import GridHoverLayer from "@/components/ui/GridHoverLayer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Rohan Chaudhary — Project Ledger",
  description: "Every project I've shipped, tracked with full traceability.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col items-center bg-paper font-sans text-ink">
        <GridHoverLayer />
        <div className="site-shell flex w-full max-w-xl flex-1 flex-col border-l border-r border-border">
          <SiteHeader />
          <main className="flex flex-1 flex-col pb-32 sm:pb-20">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
