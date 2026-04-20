import Footer from "../Footer/footer";
import Features1Section from "../Section/features1Section";
import FeaturesSection from "../Section/featuresSection";
import HowIScheduleWorksSection from "../Section/howitworksSection";
import IndustriesSection from "../Section/industriesSection";
import IntroductionSection from "../Section/intoductionSection";
import PricingSection from "../Section/pricingSection";
import RequestDemo from "../Section/requestDemo";
import TestimonialsSection from "../Section/testimonialSection";
import TrustedSection from "../Section/trustedSection";
import Hero from "./Hero/hero";
import Navbar from "./Navbar/navbar";


export default function Website() {
    return (
        <div className="bg-[#0f172a] text-white overflow-hidden">
            <Navbar />
            <Hero />
            <IntroductionSection/>
            <FeaturesSection/>
            <Features1Section/>
            <IndustriesSection/>
            <HowIScheduleWorksSection/>
            <TestimonialsSection/>
            <TrustedSection/>
            <PricingSection/>
            <RequestDemo/>
            <Footer/>
         {/*      
        
            <LaserCalendar/>
            <StickyFeatures/>*/}
           
        </div>
    )
}
