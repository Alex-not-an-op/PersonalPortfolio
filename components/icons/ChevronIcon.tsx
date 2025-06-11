import { FC } from "react";

export const ChevronIcon: FC<{ hoverStroke: string; stroke: string }> = ({
	hoverStroke,
	stroke
}) => (
	<svg
		strokeWidth={2}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="group inline-block"
	>
		<path
			stroke={stroke}
			d="M 4,0 L12,8 L4, 16"
			className="group-hover:translate-x-2 group-hover:opacity-0 transition-all duration-300"
		/>
		<path
			stroke={hoverStroke}
			d="M 4,0 L12,8 L4, 16"
			className="-translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
		/>
	</svg>
);
