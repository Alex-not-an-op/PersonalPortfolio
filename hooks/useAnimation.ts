import { CSSProperties, useCallback, useState, useMemo, useRef } from "react";
import { Range_union, range } from "./util";
import {Project, INDEX, GridLayout, Box} from "../data/ProjectsInterface";

enum Animations {
    SLIDE_LEFT, SLIDE_RIGHT, SLIDE_UP, SLIDE_DOWN, FADE, NONE
}

const swapType = (type: Animations):Animations => type <= Animations.FADE ? type : type + 1 - 2*(type % 2) 

const aName = (name) => ["SLIDE_LEFT", "SLIDE_RIGHT", "SLIDE_UP", "SLIDE_DOWN", "FADE", "NONE"][name]

type Animation = {
    from?: Transition & {index: INDEX}, 
    to?: Transition & {index: INDEX}, 
}

export type Transition = { card: Keyframe[]; cover: Keyframe[] };

type Percent = -100|0|100;

const tx = (dx:Percent):Keyframe => ({transform: `translate(${dx}%, 0%)`, opacity: 1});
const ty = (dy:Percent):Keyframe => ({transform: `translate(0%, ${dy}%)`, opacity: 1});

const slideX = (x0:Percent, x2:Percent):Transition => ({
    card: [tx(x0), tx(0)],
    cover: [tx(0), tx(x2)]
})

const slideY = (y0:Percent, y2:Percent):Transition => ({
    card: [ty(y0), ty(0)],
    cover: [ty(0), ty(y2)]
})

const transitions:Record<Animations, Transition> = {
    [Animations.SLIDE_LEFT]: slideX(-100, 100),
    [Animations.SLIDE_RIGHT]: slideX(100, -100),
    [Animations.SLIDE_UP]: slideY(-100, 100),
    [Animations.SLIDE_DOWN]: slideY(100, -100),
    [Animations.FADE]: {
        card: [{opacity: 0, transform: "translate(0,0)"}, {opacity: 1, transform: "translate(0,0)"}], 
        cover: [{opacity: 1 ,transform: "translate(0,0)"}, {opacity: 0, transform: "translate(0,0)"}]
    },
    [Animations.NONE]: {card: [], cover: []}
}


// type Box = [r1:number, r2:number, c1:number, c2:number];

/** If the boxes touch return appropriate animation, else return fade animation.
 * If the boxes are equal by value, return NONE animation
 */
const getAnimationType = (from:Box, to:Box):Animations => {
    const [x1, y1, w1, h1] = from;
    const [x2, y2, w2, h2] = to;

    const [x1_, y1_, x2_, y2_] = [x1 + w1, y1 + h1, x2 + w2, y2 + h2];
    const overlapW = true;//x1 < x2_;  
    const overlapH = true;//y1 < y2_; 

    if(x1_ == x2 && overlapH)
        return Animations.SLIDE_LEFT;
    if(y1_ == y2 && overlapW)
        return Animations.SLIDE_UP;
    if(x1 == x2_ && overlapH)
        return Animations.SLIDE_RIGHT;
    if(y1 == y2_ && overlapW)
        return Animations.SLIDE_DOWN;
    
    return Animations.FADE;
}

const swapped = (t:Transition):Transition =>  ({
    cover: t.card,
    card: t.cover
})

const isBuffer = (i:INDEX_W_BUFFER) => typeof i === "string" && i.startsWith("buffer")

const getAnimation = (i1: INDEX_W_BUFFER, i2:INDEX_W_BUFFER, boxes: Box[], bottomEdge:number):Animation => {
    const lookup:Record<Exclude<INDEX_W_BUFFER, INDEX>, Box> = {
        "buffer_top": [-1000, 0, 2000, 1],
        "buffer_bottom": [-1000, bottomEdge, 2000, 1]
    }

    if (i1 === i2 || (isBuffer(i1) && isBuffer(i2)))
        return {};


    const fromBox:Box = isBuffer(i1) ? lookup[i1] : boxes[i1];
    const toBox:Box = isBuffer(i2) ? lookup[i2] : boxes[i2];

    const animationType = getAnimationType(fromBox, toBox);

    return {
        ...(!isBuffer(i1) && {
            from: {...transitions[animationType], index: i1 as INDEX}
        }),
        ...(!isBuffer(i2) && {
            to: {...swapped(transitions[swapType(animationType)]), index: i2 as INDEX}
        })
    };
}


type INDEX_W_BUFFER = INDEX | "buffer_top" | "buffer_bottom";
/** Holds the selected Index, returns an array of transitions for each element. */
export const useAnimation = (boxes: Box[]) => {
    const [index, setIndex] = useState<INDEX_W_BUFFER>("buffer_top");
    const prevIndexRef = useRef<INDEX_W_BUFFER>("buffer_top");
    
    const pushIndex = useCallback((index:INDEX_W_BUFFER) => {
        setIndex(i => {
            if (i === index)
                return i;
            prevIndexRef.current = i;
            return index;
        });
    }, []);

    const bottomEdge = useMemo(() => boxes.reduce((maxY, [_, y, __, h]) => maxY < y+h ? y+h : maxY, 0), [boxes])

    const animation = getAnimation(index, prevIndexRef.current, boxes, bottomEdge);

    return {pushIndex, animation}
}