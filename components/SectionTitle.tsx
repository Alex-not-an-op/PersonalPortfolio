import { FC } from "react";
import { Hashtag } from "./Hashtag";

export const SectionTitle: FC<{
  children: React.ReactNode;
  alt: string;
  href: string;
}> = ({ children, alt, href }) => (
//   <a href={href} className="inline-block w-full max-w-xl relative group">
    <div className="relative overflow-hidden z-[100] w-full max-w-md">
        {children}
        <h2 className="absolute inset-0 text-4xl text-transparent pointer-events-none">{alt}</h2>

        {/* <h2 className="max-w-lg">
            {alt ? (
                <span className="text-mega text-transparent absolute inset-x-1/2 inset-y-1/2">
                {alt}
            </span>
            ) : null} */}
        {/* </h2> */}
    </div>
    
    /* <div className="absolute inset-y-1/2 left-0 opacity-0 group-hover:opacity-100">
      <Hashtag />
    </div> */
  /* </a> */
);
