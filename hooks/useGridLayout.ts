import { Box, GridLayout, INDEX, Projects } from "../data/ProjectsInterface";
import { projects } from "../data/projects";
import useWindowDimensions from "./useWindowDimensions";
import { range } from "./util";

const toBox: (name: string, template: string[]) => Box = (name, template) =>
    template.reduce(
        ([x, y, w, h], rowV, rowI) => {
            const matches = rowV
                .split(" ")
                .map((v, i) => [v, i] as [string, number])
                .filter(([v, _]) => v === name)
                .map(([_, i]) => i);

            if (!matches.length) return [x, y, w, h];

            return [matches[0] + 1, y || rowI + 1, matches.length, h + 1];
        },
        [0, 0, 0, 0]
    );

const templates = (() => {
    const tmp = {
        xl: [
            "a4 a4 a2 a2 a0 a0 a0",
            "a4 a4 a2 a2 a0 a0 a0",
            "a4 a4 a2 a2 a0 a0 a0",
            "a4 a4 a2 a2 a7 a1 a1",
            "a4 a4 a3 a3 a3 a1 a1",
            "a4 a4 a3 a3 a3 a1 a1",
            "a5 a5 a5 a5 a6 a6 a6",
            "a5 a5 a5 a5 a6 a6 a6",
            "a5 a5 a5 a5 a6 a6 a6",
        ],
        lg: [
            "a0 a0 a0 a0 a1 a1 a1",
            "a0 a0 a0 a0 a1 a1 a1",
            "a3 a3 a3 a2 a2 a2 a2",
            "a3 a3 a3 a2 a2 a2 a2",
            "a4 a4 a4 a4 a7 a7 a7",
            "a4 a4 a4 a4 a5 a5 a5",
            "a6 a6 a6 a6 a5 a5 a5",
            "a6 a6 a6 a6 a5 a5 a5",
        ],
        md: [
            "a0 a1",
            "a0 a1",
            "a0 a1",
            "a0 a1",
            "a0 a1",
            "a0 a2",
            "a3 a2",
            "a3 a2",
            "a3 a2",
            "a3 a2",
            "a3 a4",
            "a3 a4",
            "a7 a4", 
            "a7 a4",
            "a5 a4",
            "a5 a6",
            "a5 a6",
            "a5 a6",
            "a5 a6",
        ],
        sm: ["a0", "a0", "a1", "a1", "a2", "a2", "a3", "a3", "a4", "a4", "a5", "a5", "a7", "a6", "a6"],
    };

    const toBoxes = (tmp: string[]) =>
        range(0, projects.length).map((i) => toBox(`a${i}`, tmp));

    return Object.fromEntries(
        Object.entries(tmp).map(([k, v]) => [k, toBoxes(v)])
    ) as Record<keyof typeof tmp, Box[]>;
})();

// Mapping between box index and dom order (a{i} -> dom order)    use this for correct tap order
type Ordering = INDEX[]

const layoutBreakpoints: (GridLayout & { minW: number, order:Ordering})[] = [
    {
        minW: 1600,
        classNameGrid: "grid grid-cols-7 gap-2 auto-rows-[minmax(10rem,auto)]",
        boxes: templates.xl,
        order: [4, 2, 0, 7, 1, 3, 5, 6],
    },
    {
        minW: 1024,
        classNameGrid: "grid grid-cols-7 gap-2 auto-rows-[minmax(14rem,auto)]",
        boxes: templates.lg,
        order: [0, 1, 3, 2, 4, 7, 6, 5],
    },
    {
        minW: 640,
        classNameGrid: "grid grid-cols-2 gap-1 auto-rows-[minmax(5rem,auto)]",
        boxes: templates.md,
        order: [0, 1, 3, 2, 4, 6, 7, 5],
    },
    {
        minW: 0,
        classNameGrid: "grid grid-cols-1 gap-1 auto-rows-[minmax(12rem,auto)]",
        boxes: templates.sm,
        order: [0, 1, 2, 3, 4, 5, 7, 6],
    },
];

export const useLayout = () => {
    const { width } = useWindowDimensions();

    const minLayout = layoutBreakpoints[layoutBreakpoints.length - 1];
    const layout = layoutBreakpoints.reduce(
        (acc, layout) =>
            width > layout.minW && acc.minW < layout.minW ? layout : acc,
        minLayout
    );
    
    return {
        boxes: layout.order.map(i => layout.boxes[i]),
        projects: layout.order.map(i => ({...projects[i], key: i})),
        classNameGrid: layout.classNameGrid,
    };
};