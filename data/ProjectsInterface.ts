import { CSSProperties } from "react";
import { projects } from "./projects";

export type Project = {
    title: string;
    description: string;
    tags: string[];
    source: string;
    live: string;
    img: string;
    color: string;
    darkColor: string;
  };

export type Projects = typeof projects;
export type INDEX = Range_union<0, Projects["length"]>


/** Returns an Array (not generator) including from and excluding to */
export const range: <From extends number, To extends number>(
    from: From,
    to: To
) => Range<From, To> = (from, to) =>
    [...Array(to - from)].map((_, i) => from + i) as any;

/** Maps over all Project indices. Callback should return a key, value pair. returns an Object  */
export const mapRangeToObject: <T, R extends INDEX[]>(
    range: R,
    cb: (i: keyof R) => T
) => Record<R[INDEX], T> = (range, cb) =>
    Object.fromEntries(range.map((i) => [i, cb(i)])) as any;

/** Maps over all project indices. Returns an Object with callback argument i as its keys.*/
export const mapIndicesToObject: <T>(cb: (i: INDEX) => T) => Record<INDEX, T> = (cb) =>
    mapRangeToObject(INDICES, cb);
    
const INDICES= range(0, projects.length)

/********** LAYOUTS ******************/

// Projects are layed out as a Graph. Each Project has 4 Neighbours corresponding to the 4 animation directions
// Index is the State. The change in index dictates the animation. Its UP, DOWN, TOP, BOTTOM or FADE, if none apply

// Projects are layed out in a grid. The Graph structure dictates Animations. Depening on Screen width, col-span or row-span may change.

// Divider is Provided on top and bottom edge of the Project Section

export enum Transitions {
    ENTER_LEFT,
    ENTER_RIGHT,
    ENTER_TOP,
    ENTER_BOTTOM,
    FADE_IN,
    EXIT_LEFT,
    EXIT_RIGHT,
    EXIT_TOP,
    EXIT_BOTTOM,
    FADE_OUT,
    NONE,
    CLOSED,
};

export enum Animations {
    SLIDE_LEFT, 
    SLIDE_RIGHT, 
    SLIDE_DOWN,
    SLIDE_UP,
    FADE
};

export type Transition = { card: Keyframe[]; cover: Keyframe[] };

export type Animation = {
    from: Transition & {index: INDEX},
    to: Transition & {index: INDEX},
}

export const getTransition:(t:Transitions)=>Transition 
= (() => {
    const tx_100 = { transform: "translate(100%, 0%)", opacity: "1" };
    const tx_m_100 = { transform: "translate(-100%, 0%)", opacity: "1" };
    const ty_100 = { transform: "translate(100%, 0%)", opacity: "1" };
    const ty_m_100 = { transform: "translate(-100%, 0%)", opacity: "1" };
    const t0 = { transform: "translate(0%, 0%)", opacity: "1" };

    const o0 = { opacity: "0" };
    const o1 = { opacity: "1" };

    const swapped = ({ card, cover }: Transition) => ({
        cover: card,
        card: cover,
    });

    const enterAnim = {
        [Transitions.ENTER_BOTTOM]: {
            card: [ty_100, t0],
            cover: [t0, ty_m_100],
        },
        [Transitions.ENTER_TOP]: {
            card: [ty_m_100, t0],
            cover: [t0, ty_100],
        },
        [Transitions.ENTER_LEFT]: {
            card: [tx_m_100, t0],
            cover: [t0, tx_100],
        },
        [Transitions.ENTER_RIGHT]: {
            card: [tx_100, t0],
            cover: [t0, tx_m_100],
        },
        [Transitions.FADE_IN]: {
            card: [{...t0, ...o0}, o1],
            cover: [{...t0, ...o1}, o0],
        },
    };

    const exitAnim: Record<Range_union<5, 10>, Transition> = {
        [Transitions.EXIT_BOTTOM]: swapped(
            enterAnim[Transitions.ENTER_TOP]
        ),
        [Transitions.EXIT_TOP]: swapped(
            enterAnim[Transitions.ENTER_BOTTOM]
        ),
        [Transitions.EXIT_LEFT]: swapped(
            enterAnim[Transitions.ENTER_RIGHT]
        ),
        [Transitions.EXIT_RIGHT]: swapped(
            enterAnim[Transitions.ENTER_LEFT]
        ),
        [Transitions.FADE_OUT]: swapped(enterAnim[Transitions.FADE_IN]),
    };

    const transitions = {
        ...enterAnim,
        ...exitAnim,
        [Transitions.CLOSED]: { card: [o0], cover: [t0] },
        [Transitions.NONE]: {card: [], cover: []}
    };

    return (animation:Transitions) => transitions[animation];
})();


// type Box = [r1:number, r2:number, c1:number, c2:number];
export type Box = [x:number, y:number, width:number, height:number];

export type GridLayout = {
    classNameGrid: string; 
    boxes: Box[];
}

/** If the boxes touch return appropriate animation, else return fade animation.
 * If the boxes are equal by value, return NONE animation
 */
export const getAnimation = (from:Box, to:Box) => {
    const [x1, y1, w1, h1] = from;
    const [x2, y2, w2, h2] = to;

    if (x1 == x2 && y1 == y2 && w1 == w2 && h1 == h2)
        return [Transitions.NONE, Transitions.NONE]

    const [x1_, y1_, x2_, y2_] = [x1 + w1, y1 + h1, x2 + w2, y2 + h2];
    const overlapW = x1 < x2_;  
    const overlapH = y1 < y2_; 

    if(x1_ == x2 && overlapH)
        return [Transitions.ENTER_LEFT, Transitions.EXIT_RIGHT];
    if(y1_ == y2 && overlapW)
        return [Transitions.ENTER_TOP, Transitions.EXIT_BOTTOM];
    if(x1 == x2_ && overlapH)
        return [Transitions.ENTER_RIGHT, Transitions.EXIT_LEFT];
    if(y1 == y2_ && overlapW)
        return [Transitions.ENTER_BOTTOM, Transitions.EXIT_TOP];
    
    return [Transitions.FADE_IN, Transitions.FADE_OUT];
}

export const getStyle = ([x,y,w,h]:Box):CSSProperties => ({gridArea: `${y} / ${x} / ${y+h} / ${x+w}`})

// corresponds to number of projects
export type INDEX_PLUS_ONE = INDEX | 7; // keyof typeof INDICES;

export type NUMBER = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; //| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

// export type GridElementSpan = `row-span-${NUMBER} col-span-${NUMBER}`;
// // export type GridSpan = `grid-cols-${NUMBER} grid-rows-${NUMBER}`;
// export type CssClass = string;

// export type ProjectLayout = {
//     placement: CssClass;
//     /** Animation that plays after project was exited to INDEX */
//     exitAnimation: Record<INDEX, Transitions>;
// };

// export type ProjectsLayout = {
//     gridLayout: CssClass;
//     projectsLayout: Record<INDEX, ProjectLayout>;
// };


/** Some Typescript magic is going on here. Use Lists and their length for simple Arithmetics. Constructs a Range export type */
export type NumToArray<T extends number, L extends 0[] = []> = T extends L["length"]
    ? L
    : NumToArray<T, [0, ...L]>;

export type Range_rec<From extends 0[], To extends number> = To extends From["length"]
    ? []
    : [From["length"], ...Range_rec<[0, ...From], To>];

//@ts-ignore
export type Range<From extends number, To extends number> = Range_rec<
    NumToArray<From>,
    To
>;

export type Range_union_rec<
    From extends 0[],
    To extends number
> = To extends From["length"]
    ? never
    : From["length"] | Range_union_rec<[0, ...From], To>;

export type Range_union<From extends number, To extends number> = Range_union_rec<
    NumToArray<From>,
    To
>;
