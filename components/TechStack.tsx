import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { technologies } from "../data/skills";



const categories = Object.keys(technologies);
const stackColors = ["fill-emerald-200", "fill-emerald-500", "fill-emerald-800"]

const Stack: FC<{ index: number; onSelect: (i: number) => void; onLeave: () => void }> = ({
	index,
	onLeave,
	onSelect
}) => (
	<div className="relative w-full max-w-md">
		<svg viewBox="-4 -4 148 88" fontSize="0.5em" fontFamily="poppins">
			{stackColors.map((v, i) => (
				<path
					className={`
                        transition-opacity duration-300
                        ${v} 
                        ${index === 2 - i ? "opacity-100 stroke-black" : "opacity-30"}`}
					d={`M0 ${(2 - i) * 16 + 25} l50,-25 l50,25 l-50,25 l-50,-25 z`}
				/>
			))}
			<line
				x1={80}
				y1={index * 16 + 15}
				x2={100}
				y2={index * 16 + 5}
				className="stroke-indigo-300"
				strokeWidth={0.5}
			/>
			<text x={105} y={7 + index * 16} className="fill-indigo-300">
				{categories[index]}
			</text>
		</svg>
		{/* Hitboxes */}
		<div className="absolute inset-0 w-4/5 h-full flex flex-col">
			{categories.map((_, i) => (
				<div
					onMouseEnter={() => onSelect(i)}
					onMouseLeave={onLeave}
					className="w-full h-full"
				></div>
			))}
		</div>
	</div>
);



const DesktopView: FC<{
	index: number;
	setPlaying: Dispatch<SetStateAction<boolean>>;
	setIndex: Dispatch<SetStateAction<number>>;
}> = ({ index, setIndex, setPlaying }) => {
    const play = useCallback(() => setPlaying(true), []);
    const stop = useCallback(() => setPlaying(false), []);

    return (
	<div className="hidden lg:flex flex-row">
		<Stack
			index={index}
			onLeave={() => setPlaying(true)}
			onSelect={(i) => {
				setPlaying(false);
				setIndex(i);
			}}
		/>
		<div className="grow flex items-center mt-8 ml-16 min-h-max">
			<div className="flex flex-row flex-wrap gap-x-16 gap-y-8"
                onMouseEnter={stop}
                onMouseLeave={play}
            >
				{(technologies[categories[index]] as string[]).map((tech) => (
					<img
						src={`technologyLogos/${tech}_logo.svg`}
						title={tech.charAt(0).toUpperCase() + tech.slice(1)}
						alt={tech}
						className="h-16"
					/>
				))}
			</div>
		</div>
	</div>
)};

export const TechStack = () => {
	const [index, setIndex] = useState(0);
	const [playing, setPlaying] = useState(true);
	const timer = useRef(0);
    const timerDelay = 3000;

	useEffect(() => {
		if (playing) {
			timer.current = setTimeout(() => {
				setIndex((i) => (i + 1) % 3);
			}, timerDelay) as any;
		} else clearTimeout(timer.current);
		return () => clearTimeout(timer.current);
	}, [playing, index]);

	return (
		<>
			<DesktopView {...{ index, setPlaying, setIndex }} />;
			{/* <MobileView /> */}
		</>
	);
};
