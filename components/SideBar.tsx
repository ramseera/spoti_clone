"use client";
import React, { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiMoviePlay, BiSearch } from "react-icons/bi";

import { usePathname } from "next/navigation";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathName !== "/search",
        href: "/",
        icon: HiHome,
      },
      {
        label: "Search",
        active: pathName === "/search",
        href: "/search",
        icon: BiSearch,
      },
    ],
    [pathName]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full  w-[300px]  p-2">
        <Box>
          {routes.map((item) => {
            return <SidebarItem key={item.label} {...item} />;
          })}
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
