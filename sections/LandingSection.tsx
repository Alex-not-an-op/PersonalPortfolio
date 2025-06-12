import { HTMLProps, forwardRef } from "react";
import { ChevronIcon } from "../components/icons/ChevronIcon";
import { LinesBackground } from "../components/LinesBackground";
import { ResponsivenessIcon } from "../components/icons/ResponivenessIcon";
import Link from "next/link";
// import { MyName } from "../MyName";
import MyName from "../assets/MyName.svg";
import { SectionTitle } from "../components/SectionTitle";
import { HtmlProps } from "next/dist/shared/lib/html-context";

const Moblie = () => (
    <div className="lg:hidden p-4 pb-32">
        <div className="w-full flex flex-col items-center p-4 gap-y-24">
            <div className="flex flex-col gap-y-4 w-full items-center">
                <SectionTitle href="/" alt="Schneiders Web">
                    <MyName />
                </SectionTitle>
                <p className="text-xl text-gray-200 font-thin max-w-md z-10">
                    Fullstack Web Development
                </p>
            </div>
            <div className="w-full flex flex-col items-center p-4 gap-y-8">

                <ResponsivenessIcon id="123mob" />

                <div className="flex flex-row gap-x-8 z-20">
                    <FilledButton href="#contact_section">
                        Contact
                    </FilledButton>
                    <OutlinedButton href="Lebenslauf.pdf" target="_blank">
                        Download CV
                    </OutlinedButton>
                </div>
            </div>
        </div>
    </div>
);

const Desktop = () => (
    <div className="hidden lg:flex lg:flex-row lg:gap-x-8 justify-center p-4 mt-16 md:mt-32 mb-32 lg:mt-64">
        <div className="grow w-full flex justify-end items-start">
            <ResponsivenessIcon id="123desk" />
        </div>
        <div className="grow w-full flex flex-col items-start gap-y-4 max-h-[260px]">
            {" "}
            {/*Max height is same as height of frame of ResponsivenessIcon*/}
            <h1 className="font-medium w-full text-white text-6xl lg:text-mega z-10">
                <MyName />
            </h1>
            <p className="text-2xl text-gray-200 font-thin max-w-md z-10">
                Fullstack Web Development
                {/* Proving modern, dynamic Web Solutions that scale with your Buisness */}
            </p>
            <div className="flex flex-row h-full flex-grow gap-x-8 z-20 ">
                <FilledButton href="#contact_section">
                    Contact
                    <ChevronIcon stroke="#ffffff" hoverStroke="#E0E7FF" />
                </FilledButton>
                <OutlinedButton href="Lebenslauf.pdf" target="_blank">
                    Download CV
                    <ChevronIcon stroke="#ffffff" hoverStroke="#E0E7FF" />
                </OutlinedButton>
            </div>
        </div>
    </div>
);

export const LandingSection = () => (
    <div className="w-screen min-h-screen bg-gray-900 relative p-4">
        <Moblie />
        <Desktop />
        <div className="flex flex-row justify-center">
            <a href="#about_section" className="flex flex-col gap-y-4 items-center mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white group outline-none">
                <p className="group-hover:text-indigo-300 group-focus:text-indigo-300 group-hover:underline group-focus:underline">Learn More</p>
                <svg
                    viewBox="0 0 16 8"
                    width={32}
                    height={16}
                    stroke="white"
                    fill="none"
                    className="animate-bounce group-hover:stroke-indigo-300 group-focus:stroke-indigo-300"
                >
                    <path d="M 0,0 l8,8 l8,-8" />
                </svg>
            </a>
        </div>

    </div>
);

const FilledButton = forwardRef<
    HTMLAnchorElement,
    Omit<HTMLProps<HTMLAnchorElement>, "className">
>((props, ref) => (
    <a
        ref={ref}
        {...props}
        className="group px-3 py-2 lg:px-6 lg:py-4 text-xl md:text-2xl rounded-lg hover:text-indigo-100 
                bg-indigo-600 hover:bg-indigo-500/80 hover:backdrop-blur-sm text-white hover:shadow-lg hover:ring-2 hover:ring-indigo-100 transition-none
                transition-all duration-300 flex flex-row gap-x-2 items-center h-16 self-end focus:ring-2 focus:ring-indigo-300 outline-none"
    >
        {props.children}
    </a>
));

const OutlinedButton = forwardRef<
    HTMLAnchorElement,
    Omit<HTMLProps<HTMLAnchorElement>, "className">
>((props, ref) => (
    <a
        ref={ref}
        {...props}
        className="
        outline-none
        px-3 py-2 lg:px-6 lg:py-4 text-xl md:text-2xl
		text-white rounded-lg hover:ring-2 hover:ring-indigo-100 hover:shadow-none group shadow-md shadow-indigo-800 
        bg-black/20 backdrop-blur-sm hover:text-indigo-100 h-16 self-end focus:ring-2 focus:ring-indigo-100
        flex flex-row gap-x-2 items-center justify-center"
    >
        {props.children}
    </a>
));
