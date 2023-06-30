import Link from "next/link";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  label: string;
  active?: boolean;
  icon: IconType;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  active,
  icon: Icon,
  href,
}) => {
  return (
    <Link
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1 px-2`,
        active && "text-white"
      )}
      href={href}
    >
      <Icon size={20}></Icon>
      <p>{label}</p>
    </Link>
  );
};

export default SidebarItem;
