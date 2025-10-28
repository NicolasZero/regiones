
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Cintillo } from "@/components/cintillo";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context";
import { UpdateActivitieProvider } from "@/context/updateActivitie";
import { usePathname } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Sistema de gestión de actividades inamujer",
  description: "Sistema de gestión de actividades inamujer",
};
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UpdateActivitieProvider>
          <html lang="en">
            <link
              rel="icon"
              href="/ina.png"
              type="image/x-icon"
              sizes="any"
            />

            <body className={`${inter.className} dark:bg-dark`}>

              <ThemeProvider
                attribute="class"
                defaultTheme="black"
                enableSystem
                disableTransitionOnChange
              >
                <Cintillo />
               
                  {children}
                
                <Footer />
                <Toaster />
              </ThemeProvider>
            </body>

          </html>
        </UpdateActivitieProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
