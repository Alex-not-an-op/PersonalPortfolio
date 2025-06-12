import Link from "next/link";
import { useState } from "react";
import { NavbarIconMobile } from "./icons/NavbarIconMobile";

export const menuItems = ["About", "Skills", "Projects", "Contact"];

const DesktopNavbar = () => (
  <div className="hidden sm:flex flex-row max-w-[1600px] justify-end py-4">
    <nav>
      {menuItems.map((text) => (
        <div className="group inline-block mx-4">
          <Link href={"#" + text.toLowerCase() + "_section"}>
            <a className="text-lg lg:text-xl text-white focus:underline outline-none">{text}</a>
          </Link>
          <div className="bg-indigo-300 h-1 ml-2 rounded-full w-0 group-hover:w-[calc(100%-8px)] transition-[width] duration-200"></div>
        </div>
      ))}
    </nav>
  </div>
);

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2 px-4 sm:hidden flex justify-end relative">
      <NavbarIconMobile open={open} toggleOpen={() => setOpen((o) => !o)} />
      <div
        className={`${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        } outline-none transition-opacity duration-500 absolute inset-x-0 top-full w-full py-4 flex flex-col items-center gap-y-4 -z-10 bg-emerald-700`}
      >
        {menuItems.map((text) => (
          <div className="group inline-block mx-4 max-w-min">
            <Link href={"#" + text.toLowerCase() + "_section"}>
              <a
                onClick={() => setOpen(false)}
                className="text-lg lg:text-xl text-white"
              >
                {text}
              </a>
            </Link>
            <div className="bg-indigo-300 h-1 ml-2 mt-0.5 rounded-full w-0 group-hover:w-[calc(100%-8px)] group-focus:w-[calc(100%-8px)] transition-[width] duration-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Navbar = () => (
  <div className="bg-teal-700 shadow-lg w-screen sticky inset-x-0 top-0 z-[5000]">
    <DesktopNavbar />
    <MobileNavbar />
  </div>
);
