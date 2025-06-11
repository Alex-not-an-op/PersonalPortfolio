import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { AboutSection } from "../sections/AboutSection";
import { ContactSection } from "../sections/ContactSection";
import { LandingSection } from "../sections/LandingSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { SkillsSection } from "../sections/SkillsSection";
import { LinesBackground } from "../components/LinesBackground";
import { DiagonalDivider } from "../components/DiagonalDivider";

/*
// Measure path lengths for animation 
document.querySelectorAll("svg").forEach(svg => {
    console.log(svg);
    const s = [];
    svg.childNodes.forEach(path => {
        s.push(path.getTotalLength())
    })
    console.log(s.join(", "))
})
*/

const IndexPage = () => (
    <div className="relative w-screen bg-black">
        <LandingSection />
        <Navbar />
        <AboutSection />
        {/* <DiagonalDivider
            from="tr"
            via="tl"
            to="bl"
            classNameContainer="w-screen h-[10vw] opacity-90 relative z-20"
            classNameFirstSvg="fill-slate-900"
            // classNameFirstSvg=""
            classNameSecondSvg="fill-slate-800"
            // classNameSecondSvg=""

        /> */}
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <LinesBackground /> 
    </div>
);

export default IndexPage;
