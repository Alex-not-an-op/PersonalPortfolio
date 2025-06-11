import { FC, SVGProps, useEffect, useRef } from "react";

export const NavbarIconMobile: FC<{ open: boolean; toggleOpen: () => void }> = ({
    open,
    toggleOpen,
}) => {
    const styles = "transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]";

    return (
        <button onClick={toggleOpen}>
            <svg
                strokeLinecap="round"
                width={32}
                height={32}
                viewBox="-2 -2 20 20"
                className="transition-all duration-300 stroke-white group"
                strokeWidth={2}
            >
                <line
                    x1={0}
                    y1={2}
                    x2={8}
                    y2={2}
                    className={`[transform-origin:0px_2px] ${styles} ${
                        open ? "rotate-45" : ""
                    }`}
                />
                <line
                    x1={0}
                    y1={8}
                    x2={16}
                    y2={8}
                    className={`[transform-origin:8px_8px] ${styles} ${
                        open ? "-translate-x-[1.75px] -rotate-45" : ""
                    }`}
                />
                <line
                    x1={0}
                    y1={14}
                    x2={12} 
                    y2={14}
                    className={`[transform-origin:12px_14px] ${styles} ${
                        open ? "rotate-45" : ""
                    }`}
                />
            </svg>
        </button>
    );
};
