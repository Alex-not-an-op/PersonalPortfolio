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

// type Box = [r1:number, r2:number, c1:number, c2:number];
export type Box = [x:number, y:number, width:number, height:number];

export type GridLayout = {
    classNameGrid: string; 
    boxes: Box[];
}
// corresponds to number of projects

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
