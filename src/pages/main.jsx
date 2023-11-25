import Slider from "../components/slider";
import AboutSection from "./aboutSection";
import ClientSeaction from "./clientSeaction";
import ContactSeaction from "./contactSeaction";
import Product from "./product/product";
import ServiceSeaction from "./servicesSeaction";

export default function Main(){
    return(
        <>
        <Slider/>
        <AboutSection/>
        <Product/>
        <ServiceSeaction/>
        <ContactSeaction/>
        <ClientSeaction/>
        </>
    )
}