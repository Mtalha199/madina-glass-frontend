"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseLineIcon } from "@/icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = navLinks.findIndex(
      (link) => link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href))
    );
    const index = currentIndex >= 0 ? currentIndex : 0;
    
    setActiveIndex(index);

    const activeLink = linkRefs.current[index];
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
    });
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <>
      <nav className="w-full overflow-x-hidden bg-white relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="flex items-center justify-between h-16 min-w-0">
            {/* Logo Section */}
            <Link href="/" className="flex items-center shrink-0 cursor-default">
              <Image
                draggable={false}
                src="/images/logo/logo.svg"
                alt="FleetTrack Logo"
                width={120}
                height={90}
                className="mr-2 shrink-0"
                priority
                sizes="120px"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 flex-1 justify-end min-w-0 relative">
              {navLinks.map((link, index) => {
                const isActive = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
                
                return (
                  <Link
                    key={link.href}
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    href={link.href}
                    onClick={(e) => {
                      if (isActive) {
                        e.preventDefault();
                      }
                    }}
                    className={`text-gray-600  hover:text-gray-800 text-md whitespace-nowrap relative ${
                      index === activeIndex ? "text-gray-900 font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Static Underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-brand-500"
                style={{
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                }}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <div className={`relative w-6 h-6 ${isMobileMenuOpen ? "rotate-90" : ""}`}>
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-900 rounded-full ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-gray-900 rounded-full -translate-y-1/2 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-full ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden"
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    draggable={false}
                    src="/images/logo/logo.svg"
                    alt="FleetTrack Logo"
                    width={100}
                    height={75}
                    className="shrink-0"
                  />
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <CloseLineIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
                    
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={(e) => {
                            if (isActive) {
                              e.preventDefault();
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={`block px-4 py-3 rounded-lg text-base font-medium ${
                            isActive
                              ? "bg-brand-50 text-brand-600 font-semibold"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
        </div>
      )}
    </>
  );
}

