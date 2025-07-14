
import Header from "@/components/Home/Header/Header";
import Highlight from "@/components/Home/Highlight/Highlight";
import Portfolio from "@/components/Home/Portfolio/Portfolio";
import Pricing from "@/components/Home/Pricing/Pricing";
import Services from "@/components/Home/Services/Services";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <Services />
      <Highlight />
      <Portfolio />
      <Pricing />

    </div>
  );
}
