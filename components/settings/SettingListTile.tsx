import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { FaCaretRight } from "react-icons/fa6";

export type SettingListTileProps = {
  prefix?: ReactNode;
  children: ReactNode;
  href?: string;
  isDangerous?: boolean;
};
export default function SettingListTile({
  prefix,
  children,
  href = "#",
  isDangerous = false,
}: SettingListTileProps) {
  return (
    <Link
      href={href}
      className={cn(`flex flex-row items-center gap-4 max-md:text-sm justify-between py-2 w-full hover:border-b`, {
        " text-red-800": isDangerous,
      })}
    >
      {prefix}
      <p className="font-medium flex-1">{children}</p>
      <FaCaretRight />
    </Link>
  );
}
