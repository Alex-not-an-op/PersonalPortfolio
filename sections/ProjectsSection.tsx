import Image from "next/image";
import Link from "next/link";
import React, {
    CSSProperties,
    FC,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { Layout } from "../components/Layout";
import { SectionTitle } from "../components/SectionTitle";
import ProjectsSvg from "../assets/Projects.svg";
import { DiagonalDivider } from "../components/DiagonalDivider";
import { INDEX, Box, Projects as ProjectsType} from "../data/ProjectsInterface";
import { useAnimation, Transition } from "../hooks/useAnimation";
import { ListenerProvider, useListeners } from "../hooks/useListener";
import { useLayout } from "../hooks/useGridLayout";

const getGridAreaStype = ([x, y, w, h]: Box): CSSProperties => ({
    gridArea: `${y} / ${x} / ${y + h} / ${x + w}`,
});

const Projects = () => {
    const { boxes, classNameGrid, projects } = useLayout();

    const { pushIndex, animation } = useAnimation(boxes);

    const listener_top = useListeners(() => pushIndex("buffer_top"));

    const listener_bottom = useListeners(() => pushIndex("buffer_bottom"));

    const gridMaxY = boxes.reduce(
        (maxY, [x, y, w, h]) => (maxY > y + h ? maxY : y + h),
        0
    );

    return (
        <div className="flex flex-col w-full bg-transparent relative z-20">
            <div className="h-16 -mt-16 z-[60]" {...listener_top}></div>
            <div className={`py-4 ${classNameGrid} relative z-50`}>
                {projects.map(({key, ...project}, index:INDEX) => {
                    const box = boxes[index];

                    let transition = null;
                    if (index === animation.from?.index)
                        transition = animation.from;
                    else if (index === animation.to?.index)
                        transition = animation.to;

                    const [_, y, __, h] = box;

                    return (
                        <Project
                            {...{
                                project,
                                box,
                                index,
                                pushIndex,
                                transition,
                                mt: false,
                                mb: y + h === gridMaxY,
                            }}
                        />
                    );
                })}
            </div>
            <DiagonalDivider
                middleCorner="tr"
                classNameContainer="h-[10vh] w-full -mt-[calc(10vh+1rem)] relative z-50 pointer-events-none"
                path1Props={{
                    className: "hidden",
                }}
                path2Props={{
                    ...listener_bottom,
                    className: "fill-emerald-700 pointer-events-auto",
                }}
            />
            <div className="h-16 -mb-16 z-[60]" {...listener_bottom}></div>
        </div>
    );
};

const animate = (() => {
    const animationConfig: KeyframeAnimationOptions = {
        duration: 300,
        easing: "ease-in-out",
        iterations: 1,
        fill: "forwards",
    };

    return (
        cardRef: React.MutableRefObject<HTMLDivElement>,
        coverRef: React.MutableRefObject<HTMLDivElement>,
        transition: Transition
    ) => {
        cardRef.current.animate(transition.card, animationConfig);
        coverRef.current.animate(transition.cover, animationConfig);
    };
})();

type ProjectArgs = {
    project: ProjectsType[number];
    box: Box;
    transition?: Transition;
    index: INDEX;
    pushIndex: React.Dispatch<React.SetStateAction<any>>;
    mt?: boolean;
    mb?: boolean;
};

const Project: FC<ProjectArgs> = ({
    index,
    pushIndex,
    project,
    box,
    transition,
    mt = false,
    mb = false,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transition) animate(cardRef, coverRef, transition);
    }, [transition]);

    const pushInd = useCallback(() => pushIndex(index), [index, pushIndex]);

    const { isFocus, ...listeners } = useListeners(pushInd);
    const padding =
        (mt ? "pt-[calc(10vh+2rem)] " : "") +
        (mb ? "pb-[calc(10vh+2rem)] " : "");

    if (project.title === "Self")
        return (
            <div
                {...listeners}
                style={getGridAreaStype(box)}
                className={`w-full relative z-20 group overflow-hidden text-gray-100 ${
                    isFocus ? "cursor-pointer" : ""
                }`}
            >
                <div
                    ref={coverRef}
                    className={`absolute inset-0 p-4 w-full h-full 
                        ${padding}
                        ${project.color}
                    `}
                >
                    <div className="h-full max-h-96 flex flex-col">
                        <h4 className="text-3xl font-medium font-montserrat">
                            {project.title}
                        </h4>
                        <div className="flex flex-wrap gap-4 mt-auto">
                            {project.tags.map((tag) => (
                                <div
                                    className={`px-2 py-1 text-white rounded-md ${project.darkColor}`}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    ref={cardRef}
                    className={`absolute inset-0 w-full h-full opacity-0 ${padding}`}
                >
                    <div
                        className={`p-4 text-lg flex flex-row justify-center w-full h-full shadow-md ${project.darkColor}`}
                    >
                        <div className="flex flex-row gap-x-4 justify-evenly w-full my-auto">
                            <Link href={project.source}>
                                <a
                                    target="_parent"
                                    className={`${project.color} px-4 py-2 rounded-md hover:underline focus:underline focus:outline-none text-center`}
                                >
                                    Source
                                </a>
                            </Link>
                            <Link href={project.live}>
                                <a
                                    target="_parent"
                                    className={`${project.color} px-4 py-2 rounded-md hover:underline focus:underline focus:outline-none text-center`}
                                >
                                    Live
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            {...listeners}
            style={getGridAreaStype(box)}
            className={`w-full relative z-20 group overflow-hidden text-gray-100 ${
                isFocus ? "cursor-pointer" : ""
            }`}
        >
            <div className="block absolute inset-0 w-full h-full">
                <Image
                    src={project.img}
                    layout="fill"
                    className={"object-cover bg-fixed " + project.color}
                />
            </div>
            <div
                ref={coverRef}
                className={`absolute inset-0 p-4 w-full h-full 
                ${padding}
                ${project.color}
                `}
            >
                <div className="h-full max-h-96 flex flex-col">
                    <h4 className="text-3xl font-medium font-montserrat">
                        {project.title}
                    </h4>
                    <div
                        className={`mt-4 ml-4 w-40 h-1 bg-black rounded-full`}
                    ></div>
                    <p className="mt-8 ml-4 max-w-sm text-lg font-light text-gray-200">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-auto">
                        {project.tags.map((tag) => (
                            <div
                                className={`px-2 py-1 text-white rounded-md ${project.darkColor}`}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={cardRef}
                className={`absolute inset-0 w-full h-full opacity-0 ${padding}`}
            >
                <div
                    className={`p-4 mt-8 w-96 max-w-xs rounded-r-md shadow-md ${project.darkColor}`}
                >
                    <h4 className="text-3xl text-center font-medium">
                        {project.title}
                    </h4>
                    <div className="flex flex-row gap-x-4 justify-evenly mt-8 text-lg">
                        <Link href={project.source}>
                            <a
                                target="_parent"
                                className={`${project.color} px-4 py-2 rounded-md hover:underline focus:underline focus:outline-none`}
                            >
                                Source
                            </a>
                        </Link>
                        <Link href={project.live}>
                            <a
                                target="_parent"
                                className={`${project.color} px-4 py-2 rounded-md hover:underline focus:underline focus:outline-none`}
                            >
                                Live
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProjectsSection = () => (
    <div id="projects_section">
        <div className="pt-16 pb-8 lg:pt-24 w-full bg-gradient-to-b from-neutral-900/90 to-transparent relative z-20">
            <Layout>
                <SectionTitle href="#projects_section" alt="Projects">
                    <ProjectsSvg />
                </SectionTitle>
                {/* <div className="text-stone-300 mt-4 sm:ml-16 max-w-sm backdrop-blur-sm bg-black/20 rounded-lg flex flex-row gap-x-4 overflow-hidden"> 
                    <div className="w-2 h-full bg-indigo-300"></div>
                    <p className="px-3 py-2">
                        A selecton of some of my webdevelopment Projects. Navigate with your Mouse, Tab or wasd Keys 
                    </p>
                </div> */}
            </Layout>
        </div>
        <ListenerProvider>
            <Projects />
        </ListenerProvider>
    </div>
);
