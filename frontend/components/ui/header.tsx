import Link from "next/link";
import HeaderAuth from "../header-auth";

export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>Endless Odyssey</Link>
          <div className="flex items-center gap-2"></div>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  );
}
