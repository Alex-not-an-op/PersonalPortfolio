import Image from "next/image";
import Link from "next/link";
import { DiagonalDivider } from "../components/DiagonalDivider";
import { Layout } from "../components/Layout";
import { SectionTitle } from "../components/SectionTitle";
import { FC, HTMLProps, ReactNode, forwardRef } from "react";
import Moin from "../assets/Moin.svg";
import LinkSvg from "../public/Link-solid.svg";
import EmailSvg from "../public/envelope-solid.svg";
import FormSvg from "../public/rectangle-list-regular.svg";
import LinkExternal from "../public/up-right-from-square-solid.svg";

export const AboutSection = () => (
    <div
        id="about_section"
        className="w-full bg-slate-900/80 text-white relative z-20 pt-16"
    >
        <Layout>
            <div className="w-full">
                <SectionTitle alt="Moin" href="#about_section">
                    <Moin />
                </SectionTitle>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-16 justify-between mt-16">
                <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
                    <p className="text-gray-200 font-thin text-lg text-left mb-12 max-w-sm">
                        My Name is Alexander Schneider. I solve technical
                        Problems. <br /> Welcome to my Website :)
                    </p>
                    <div className="shrink-0">
                        <Image
                            width={300}
                            height={300}
                            className="lg:block rounded-full max-w-md overflow-clip h-min border-solid border-2 border-indigo-500"
                            // layout="fill"
                            src="/pfpNew.jpg"
                        />
                    </div>
                </div>
                <div className="w-full max-w-5xl shrink-[2] self-end">
                    {/* <SectionTitle>About</SectionTitle> */}
                    <div className="flex flex-col gap-y-16 w-full leading-relaxed">
                        <ContentCard
                            subheading="About me"
                            heading="Hello !"
                            className="text-cyan-300"
                        >
                            <p>
                                My Name is Alexander Schneider. Welcome to my
                                Website. Currently I`m enrolled in a bachelor
                                program{" "}
                                <span className="text-cyan-300">
                                    studying Physiks
                                </span>{" "}
                                at the{" "}
                                <MyLink
                                    href="https://www.uni-hamburg.de/"
                                    color="cyan"
                                    target="_blank"
                                    after={<LinkExternal />}
                                >
                                    University of Hamburg
                                </MyLink>
                            </p>
                        </ContentCard>
                        <ContentCard
                            subheading="Where am I ?"
                            heading="Portfolio"
                            className="text-red-300 self-end"
                        >
                            <p>
                                This Site is supposed to show various
                                programming Projects and Technologies I've
                                worked with over the years. It is supplemental
                                to{" "}
                                <MyLink
                                    href="/Lebenslauf.pdf"
                                    color="red"
                                    target="_blank"
                                >
                                    {" "}
                                    my CV
                                </MyLink>
                                , which you can download
                            </p>
                        </ContentCard>
                        <ContentCard
                            subheading="What to do ?"
                            heading="Overview"
                            className="text-lime-300"
                        >
                            <p>
                                If you have made it this far, consider also
                                looking at the{" "}
                                <MyLink href="#skills_section" color="lime">
                                    Technologies
                                </MyLink>{" "}
                                I'm proficient in, or view some of my{" "}
                                <MyLink href="#projects_section" color="lime">
                                    Projects
                                </MyLink>
                                .
                            </p>
                            <p>
                                Like what you see ? Don't hesitate to write me
                                an{" "}
                                <MyLink
                                    href="mailto:Alexander%20Schneider%20%3Calex.masteroficetea@gmail.com%3E?subject=Joboffer"
                                    color="lime"
                                    after={<EmailSvg />}
                                >
                                    email{" "}
                                </MyLink>{" "}
                                or contact me throuth this{" "}
                                <MyLink
                                    href="#contact_section"
                                    color="lime"
                                    after={<FormSvg />}
                                >
                                    form{" "}
                                </MyLink>
                                . Im looking forward to working with you.
                            </p>
                        </ContentCard>
                    </div>
                </div>
            </div>
        </Layout>
    </div>
);

const MyLink: FC<
    HTMLProps<HTMLAnchorElement> & {
        href: string;
        color: "lime" | "cyan" | "red";
        after?: React.ReactNode;
    }
> = forwardRef((props) => {
    // Just gonna generate tw classes in this comment:
    // hover:text-lime-300 before:bg-lime-800 text-lime-300 fill-lime-300
    // hover:text-cyan-300 before:bg-cyan-800 text-cyan-300 fill-cyan-300
    // hover:text-red-300 before:bg-red-800 text-red-300 fill-red-300
    // Its not very extendable but im only using this in this section so it will do.
    const { children, className, color, after, ...rest } = props;
    return (
        <a
            {...rest}
            className={`${className} relative inline-block text-${color}-300 hover:no-underline before:absolute before:left-2 before:bottom-1 hover:text-${color}-300 before:block before:w-0 before:transition-[width] before:duration-300 hover:before:w-[calc(100%-24px)] before:h-3 before:rounded-sm before:bg-${color}-800`}
        >
            <span className="relative">
                {children}
                <span
                    className={`h-4 w-4 -mb-0.5 fill-${color}-300 mx-1 inline-block`}
                >
                    {after || <LinkSvg />}
                </span>
            </span>
        </a>
    );
});

const ContentCard: FC<{
    children: ReactNode;
    heading: string;
    subheading: string;
    className?: string;
}> = ({ children, heading, className, subheading }) => (
    <section
        className={
            "relative backdrop-blur-sm rounded-md p-4 w-full max-w-2xl ring-1 ring-gray-500 hover:ring-0 shadow-none group hover:shadow-md hover:bg-slate-700 transition-colors duration-300 " +
            (className || "")
        }
    >
        <p className="transition-all duration-300 absolute left-4 -top-2 px-1 text-sm uppercase font-bold bg-slate-900 group-hover:bg-transparent group-hover:text-2xl ring-1 group-hover:ring-0 group-hover:top-7 block rounded-md ring-gray-500">
            {subheading}
        </p>
        <h4 className="transition-all duration-300 absolute left-4 top-4 group-hover:-top-4 group-hover:text-sm font-bold text-2xl py-1 text-white group-hover:mb-20 group-hover:opacity-100 rounded-md group-hover:bg-slate-700 px-2">
            {heading}
        </h4>
        <div className="border-b border-gray-500 my-2 h-12" />
        <div className="text-gray-200 text-lg font-light">{children}</div>
    </section>
);
