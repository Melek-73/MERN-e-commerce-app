import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import FeaturedProducts from "../components/FeaturedProducts";
export default function Home(){
    return (
      <div className="pt-28">
        <Hero />
        <div className="p-8">
          <Highlights />
          <FeaturedProducts />
        </div>
      </div>
    );
} 