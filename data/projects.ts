// import { Project, Range_union } from "./ProjectsInterface";

export const projects = [
{
    title: "Financial Landing Page",
    description: `
            A Financial Landing Page for BigFinance.com. Recreated a Design from Dribble using React.js and Tailwindcss
        `,
    tags: ["React", "Tailwind"],
    source: "https://github.com/AlexMasterOfIceTea/FinancialLandingPage",
    live: "https://king-prawn-app-gy878.ondigitalocean.app/",
    img: "/Flp-pic.png",
    color: "bg-fuchsia-600",
    darkColor: "bg-fuchsia-900",
},
{
    title: "Sorting Visualizer",
    description:
    "Visualize different Sorting algorithms and watch as they sort the array",
    tags: ["React", "Tailwind", "Js Generator", "Typescript"],
    img: "/SortingVis.png",
    live: "https://chic-meerkat-6e6333.netlify.app/",
    source: "https://github.com/AlexMasterOfIceTea/sorting_vis_refactor",
    color: "bg-teal-600",
    darkColor: "bg-teal-900",
},
{
    title: "Chess",
    description: `           
            A Singleplayer chess-app build with Next, Typescript and Tailwindscc. Planned to build a backend using redis pub/sub for multiplayer  
        `,
    tags: ["Next.js", "Tailwind"],
    source: "https://github.com/AlexMasterOfIceTea/chess_web_app",
    live: "https://vocal-rabanadas-dfc8cd.netlify.app",
    img: "/Chess-pic.png",
    color: "bg-rose-600",
    darkColor: "bg-rose-900",
},
{
    title: "Weather App",
    description:
    "A simple Weather App build with React, using data from the Open Weather Api. Also my first React Project )",
    tags: ["React"],
    source: "https://github.com/AlexMasterOfIceTea/weather-app",
    live: "https://weather-app-kuuya.ondigitalocean.app/",
    img: "/Weather-app-screenshot.png",
    color: "bg-amber-600",
    darkColor: "bg-amber-900"
},

{
    title: "Solitaire Game",
    description: "A birthday present for my Grandpa. Also a great Game",
    tags: ["React"],
    source: "https://github.com/AlexMasterOfIceTea/solitaire",
    live: "https://solitaire-ertux.ondigitalocean.app/",
    img: "/Solitaire.png",
    color: "bg-violet-600",
    darkColor: "bg-violet-900",
},
{
    title: "Uphome Constructions",
    description:
    "A Website for a construction Company. Recreated a design found on dribbble",
    tags: ["Next.js", "Tailwind", "Headless-UI", "Typescript"],
    source: "https://github.com/AlexMasterOfIceTea/construction_site",
    live: "https://benevolent-churros-b5ddcb.netlify.app",
    img: "/uphome.png",
    color: "bg-lime-700",
    darkColor: "bg-lime-900",
},
{
    title: "Legacy Portfolio",
    description:
        "This is my old Portfolio written in React. Its most notable feature is a real time Physics simulation (Euler Method) thats capable of spelling out the different Section Titles",
    tags: ["Next.js", "Tailwind", "Headless-UI", "Typescript"],
    img: "/lgPortfolio.png",
    live: "https://spectacular-donut-35353f.netlify.app/",
    source: "https://github.com/AlexMasterOfIceTea/portfolio",
    color: "bg-cyan-600",
    darkColor: "bg-cyan-900"
},
{
    title: "Self",
    description: "",
    tags: ["Next.js", "Tailwind", "Typescript"],
    img: "",
    live: "#",
    source: "https://github.com/Alex-not-an-op/PersonalPortfolio",
    color: "bg-indigo-600",
    darkColor: "bg-indigo-900"
},
] as const //satisfies DeepReadonly<Project[]>;

//satisfies should work ? Yet it doesnt

