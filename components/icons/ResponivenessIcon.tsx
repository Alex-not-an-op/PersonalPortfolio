import { FC, SVGProps, useEffect, useMemo, useReducer, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const roundedRect = (
	x: number,
	y: number,
	w: number,
	h: number,
	r_tr = 0,
	r_br = r_tr,
	r_bl = r_tr,
	r_tl = r_tr
) =>
	`M${x + r_tl},${y} l${w - r_tl - r_tr},0 q${r_tr},0 ${r_tr},${r_tr} 
	l0,${h - r_tr - r_br} q 0,${r_br} -${r_br},${r_br} 
	l-${w - r_br - r_bl},0 q -${r_bl},0 -${r_bl},-${r_bl} 
	l0,-${h - r_bl - r_tl} q0,-${r_tl}, ${r_tl} -${r_tl} z`;

const leftBracket = (x: number, y: number, width: number) =>
	`M${x + width},${y} L${x},${y - width} L${x + width},${y - 2 * width}`;

const rightBracket = (x: number, y: number, width: number) =>
	`M${x},${y} L${x + width},${y - width} L${x},${y - 2 * width}`;

type Props = SVGProps<SVGPathElement> & {useAsClipped?: boolean, d: string}

const paths: Record<"laptop"|"tablet"|"phone", Props[]> = 
	{
        laptop: [
            //Frame
            { d: roundedRect(0, 0, 460, 260, 16), useAsClipped: true },
            //Keyboard holder
            { d: roundedRect(170, 260, 120, 30), useAsClipped: true },
            //Keyboard
            { d: "M 95 290 l270,0 q0,0 0,0 l40 56 q9,12 0,16 l-350,0 q-9,-4 0,-16 l40 -56 q0,0 0,0z" , useAsClipped: true },
            //Notch (hidden)
            { d: roundedRect(165, 0, 130, 0) },
            //Kamera (hidden)
            { d: roundedRect(225, 5, 0, 0), strokeWidth: 2 },
            {
                d: leftBracket(100, 180, 50),
                strokeWidth: 4,
                strokeLinecap: "round",
                strokeLinejoin: "miter"
            },
            {
                d: rightBracket(310, 180, 50),
                strokeWidth: 4,
                strokeLinecap: "round",
                strokeLinejoin: "miter"
            }
        ],

	tablet: [
		//Frame
		{ d: roundedRect(50, 0, 360, 260, 16), useAsClipped: true },
		//Keyboard holder (hidden)
		{ d: roundedRect(170, 260, 120, 0) },
		//Keyboard (hidden)
		{ d: roundedRect(60, 260, 340, 0) },
		//Notch
		{ d: roundedRect(165, 0, 130, 20, 0, 20, 20, 0) },
		//Kamera
		{ d: roundedRect(225, 5, 10, 10, 5), strokeWidth: 2 },
		{
			d: leftBracket(130, 180, 40),
			strokeWidth: 4,
			strokeLinecap: "round",
			strokeLinejoin: "miter"
		},
		{
			d: rightBracket(290, 180, 40),
			strokeWidth: 4,
			strokeLinecap: "round",
			strokeLinejoin: "miter"
		}
	],
	phone: [
		//Frame
		{ d: roundedRect(165, 0, 130, 260, 16), useAsClipped: true },
		//Home button
		{ d: roundedRect(222, 237, 16, 16, 8) },
		//Bottom Divider
		{ d: roundedRect(165, 230, 130, 30, 0, 16, 16, 0) },
		//Notch
		{ d: roundedRect(200, 0, 60, 14, 0, 14, 14, 0) },
		//Kamera
		{ d: roundedRect(227, 3, 6, 6, 3), strokeWidth: 2 },
		{
			d: leftBracket(190, 150, 20),
			strokeLinecap: "round",
			strokeLinejoin: "miter"
		},
		{
			d: rightBracket(250, 150, 20),
			strokeLinecap: "round",
			strokeLinejoin: "miter"
		}
	]
    };

const N = Object.keys(paths).length;
const getPaths = (index:number) => paths[Object.keys(paths)[index]] as Props[];

export const ResponsivenessIcon: FC<{id: number|string}> = ({id}) => {
    const clipId = `svgClipPath-${id}`;
	const [index, setIndex] = useState(0);
    const [clip, setClip] = useState(false);
	const timerRef = useRef(0);

    //Since the icon may be used multiple times, use a random id for clip Path
    // const randId = useMemo(() => `svgClipPath-${Math.floor(Math.random()*4503599627370496)}`, []);   

    const {width} = useWindowDimensions()

	useEffect(() => {
        if (clip){
            timerRef.current = setTimeout(() => {
                setIndex((i) => (i + 1) % N);
                setClip(false);
            }, 2000) as any;
        }else{
            timerRef.current = setTimeout(() => {
                setClip(true);
            }, 500) as any;
        }

		return () => clearTimeout(timerRef.current);
	}, [clip]);

	return (
		<div 
            {...(clip && width > 640 && {style: {clipPath: `url(#${clipId})`}})}
            className={`z-50 w-[300px] sm:w-[470px] group ${clip ? "sm:backdrop-blur-sm" : "sm:backdrop-blur-0"}`}>
			<svg
				width="100%"
                preserveAspectRatio="true"
                viewBox="0 0 470 370"
				fill="none"
				stroke="none"
				strokeWidth={2}
				xmlns="http://www.w3.org/2000/svg"
			>
                <defs>
                    <clipPath id={clipId} className="transition-all duration-500">
                        {getPaths(index).filter(p => p.useAsClipped).map((props, i) => (
                            <path {...props} key={i}/>
                        ))}
                        <path d=""/>
                    </clipPath>
                </defs>
				{getPaths(index).map(props => {
                    const className = "transition-all duration-500 ease-in-out stroke-indigo-300";
                    if (!props.useAsClipped)
                        return <path {...props} className={className}/>
                    
                    return (
                        <path {...props} className={`${className} ${clip ? "fill-slate-800/50" : "fill-slate-800"}`} />
                    )})}
			</svg>
		</div>
	);
};
