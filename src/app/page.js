import About from "@/components/Home/About/About";
import Header from "@/components/Home/Header/Header";
import Highlight from "@/components/Home/Highlight/Highlight";
import Pricing from "@/components/Home/Pricing/Pricing";
import Projects from "@/components/Home/Project/Project";
import Services from "@/components/Home/Services/Services";
import Testimonial from "@/components/Home/Testimonial/Testimonial";
import Footer from "@/components/Shared/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Services />
      <Projects />
      <Highlight />
      <Pricing />
      <Testimonial />
      <Footer />
    </div>
  );
}
