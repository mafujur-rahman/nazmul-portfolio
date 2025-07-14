
import About from "@/components/Home/About/About";
import Header from "@/components/Home/Header/Header";
import Highlight from "@/components/Home/Highlight/Highlight";
import Portfolio from "@/components/Home/Portfolio/Portfolio";
import Pricing from "@/components/Home/Pricing/Pricing";
import Services from "@/components/Home/Services/Services";
import Footer from "@/components/Shared/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Services />
      <Highlight />
      <Portfolio />
      <Pricing />
      <Footer />
    </div>
  );
}
