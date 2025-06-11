import { FC, SVGProps } from "react";

type Corner = "tl" | "tr" | "bl" | "br";

const cornerMap: Record<Corner, string> = {
    tl: "0,0",
    tr: "10,0",
    bl: "0,10",
    br: "10,10",
};

const swapY = (c: Corner) => ({ t: "b", b: "t" }[c[0]] + c[1]) as Corner;
const swapX = (c: Corner) => (c[0] + { l: "r", r: "l" }[c[1]]) as Corner;

const opposite = (corner: Corner): Corner => swapY(swapX(corner));

const getPath = (md: Corner) => {
    const corners = [swapX(md), md, swapY(md)];
    return "M " + corners.map((corner) => cornerMap[corner]).join(" L") + " Z";
};

type DividerArgs = {
    classNameContainer?: string;
    path1Props?: SVGProps<SVGPathElement> | string;
    path2Props?: SVGProps<SVGPathElement> | string;
    middleCorner: Corner;
};

export const DiagonalDivider: FC<DividerArgs> = ({
    classNameContainer = "",
    middleCorner,
    path1Props = {},
    path2Props = {},
}) => {
    const [prop1, prop2] = [path1Props, path2Props].map((p) =>
        typeof p == "string" ? { className: p } : p
    );

    return (
        <div className={classNameContainer}>
            <svg
                preserveAspectRatio="none"
                className="w-full h-full"
                viewBox="0 0 10 10"
                stroke="none"
            >
                <path {...prop1} d={getPath(middleCorner)} />
                <path {...prop2} d={getPath(opposite(middleCorner))} />
            </svg>
        </div>
    );
};

type SectionDividerArgs = {
    direction: "left" | "right";
} & Omit<DividerArgs, "middleCorner">;

export const SectionDivider: FC<SectionDividerArgs> = ({
    direction,
    classNameContainer = "",
    path1Props = "",
    path2Props = "",
}) => {
    const [prop1, prop2] = [path1Props, path2Props].map((p) =>
        typeof p == "string" ? { className: p } : p
    );

    return (
        <div className={`relative z-20 min-h-[10vh] ${classNameContainer}`}>
            <svg
                preserveAspectRatio="none"
                className="absolute bottom-0 w-screen h-[10vh]"
                viewBox="0 0 10 10"
                stroke="none"
            >
                <path
                    {...prop1}
                    d={getPath(direction === "left" ? "tl" : "tr")}
                />
                <path
                    {...prop2}
                    d={getPath(direction === "left" ? "br" : "bl")}
                />
            </svg>
            {/* <DiagonalDivider from="tl" via="bl" to="tr" classNameContainer={`${classNameContainer} absolute bottom-0 w-screen h-[10vw]`} {...restArgs}/> */}
        </div>
    );
};
