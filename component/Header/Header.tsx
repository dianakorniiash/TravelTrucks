"use client";
import Logo from "@/public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";

export default function Header() {

  const pathname = usePathname(); // получаем текущий путь


  return (
    <header className="Header">
        <Image src={Logo} className="logo" alt="Logo" width={136} height={16} />

      <div className="header-list">
        <Link href="/" className={`text-list-header ${pathname === "/" ? "active" : ""}`}><p >Home</p></Link>
        <Link href="/catalog" className={`text-list-header ${pathname === "/catalog" ? "active" : ""}`}><p >Catalog</p></Link>
      </div>
      <div></div>
    </header>
  );
}
