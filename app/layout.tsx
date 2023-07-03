import Sidebar from "@/components/SideBar";
import "./globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SubabaseProvider";
import UserProvider from "@/providers/UserProvider";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spoty music app",
  description: "Enjoy music buddy..",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
