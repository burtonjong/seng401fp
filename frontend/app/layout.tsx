import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Endless Odyssey",
  description: "A never ending story game",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[inter.variable, calSans.variable].join(" ")}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-black via-zinc-800/20 to-black">
              <div className="flex flex-col gap-20 max-w-7xl p-5 ">
                {children}
              </div>
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
