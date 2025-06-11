import Image from "next/image";
import Link from "next/link";
import { DiagonalDivider, SectionDivider } from "../components/DiagonalDivider";
import { Layout } from "../components/Layout";
import { SectionTitle } from "../components/SectionTitle";
import { TechStack } from "../components/TechStack";
import Skills from "../assets/Skills.svg";
import { technologies, languages, programmingLanguages } from "../data/skills";
import { FC } from "react";

const LanguagesDesktop = () => (
    <div className="hidden lg:flex flex-row mt-12 bg-slate-900 rounded-xl shadow-md transition-all text-stone-300">
        <div className="w-full grow  p-4">
            <h4 className="text-start text-2xl underline">Languages</h4>
            <div className="flex flex-row flex-wrap gap-x-8 gap-y-4 mt-8 ml-8">
                {programmingLanguages.map((lang) => (
                    <img
                        src={"languageLogos/" + lang + ".svg"}
                        alt={lang}
                        className="h-16 aspect-square"
                    />
                ))}
            </div>
        </div>
        <DiagonalDivider
            middleCorner="br"
            classNameContainer="shrink-0 w-20 min-h-max"
            path1Props="fill-[#020618]"
            path2Props="fill-slate-900"
        />
        <div className="w-full grow bg-[#020618] p-4 rounded-r-xl">
            <h4 className="text-start text-2xl underline">More Languages</h4>
            <table className="mt-8 ml-8">
                <tbody>
                    {languages.map(([lang, sufficiency]) => (
                        <tr>
                            <td className="font-bold text-xl">{lang}</td>
                            <td className="px-4">∙</td>
                            <td className="text-xl text-stone-500">
                                {sufficiency}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const TechBox: FC<{
    children?: React.ReactNode;
    title: string;
    techList: { src: string; title: string }[];
}> = ({ title, techList, children }) => (
    <div className="mx-auto px-8 pb-6 pt-2 rounded-xl backdrop-blur-sm bg-white/5">
        <h4 className="text-2xl text-center underline">{title}</h4>
        {children || (
            <div className="flex flex-row flex-wrap justify-center gap-x-16 gap-y-8 mt-4">
                {techList.map(({ src, title }) => (
                    <img src={src} alt={title} title={title} className="h-12" />
                ))}
            </div>
        )}
    </div>
);

const Mobile = () => (
        <div className="lg:hidden flex flex-col items-center gap-y-12 text-stone-300">
            {Object.keys(technologies).map((category) => (
                // <div className="mx-auto px-8 pb-6 pt-2 rounded-xl backdrop-blur-sm bg-white/5">
                //     <h4 className="text-2xl text-center underline">
                //         {category}
                //     </h4>
                //     <div className="flex flex-row flex-wrap justify-center gap-x-16 gap-y-8 mt-4">
                //         {technologies[category].map((tech) => (
                //             <img
                //                 src={"technologyLogos/" + tech + "_logo.svg"}
                //                 alt={tech}
                //                 title={tech}
                //                 className="h-12"
                //             />
                //         ))}
                //     </div>
                // </div>
                <TechBox
                    title={category}
                    techList={technologies[category].map((title) => ({
                        title,
                        src: `technologyLogos/${title}_logo.svg`,
                    }))}
                />
            ))}
            <TechBox
                title="Languages"
                techList={programmingLanguages.map((title) => ({
                    title,
                    src: `languageLogos/${title}.svg`,
                }))}
            />

            <TechBox title="More Languages" techList={[]}>
                <table className="mt-8 ml-8">
                    <tbody>
                        {languages.map(([lang, sufficiency]) => (
                            <tr>
                                <td className="font-bold text-lg">{lang}</td>
                                <td className="px-4">∙</td>
                                <td className="text-lg text-gray-500">
                                    {sufficiency}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TechBox>
        </div>
);

// const HobbysDesktop = () => (
//     <div className="hidden w-full md:flex flex-row items-baseline gap-x-8 mt-24">
//         <h2 className="inline-block text-3xl underline mr-12 self-center">
//             Things I enjoy
//         </h2>
//         {hobbys.map((hobby) => (
//             <img
//                 className="stroke-emerald-700"
//                 src={"hobbys/" + hobby + ".svg"}
//                 alt={hobby}
//             />
//         ))}
//     </div>
// );

export const SkillsSection = () => (
    <div id="skills_section" className="w-full relative z-20">
        <div className="w-full bg-slate-900/80">
            <div className="mx-auto max-w-[1600px] px-4 flex flex-row justify-end">
                <SectionTitle href="#skills_section" alt="Skills">
                    <div className="max-w-sm -mb-16">
                        <Skills />
                    </div>
                </SectionTitle>
            </div>
        </div>

        <SectionDivider
            direction="right"
            classNameContainer="opacity-90"
            path1Props="fill-slate-900/90"
            path2Props="fill-neutral-900"
        />
        <div className="bg-neutral-900/90">
            <Layout>
                <div className="flex flex-col gap-y-4 ">
                    {/* <div className="w-full flex justify-end"> */}

                    {/* </div> */}
                    <div className="mt-12">
                        <TechStack />
                    </div>
                    <LanguagesDesktop />
                    {/* <HobbysDesktop /> */}
                    <Mobile />
                </div>
            </Layout>
        </div>
    </div>
);
