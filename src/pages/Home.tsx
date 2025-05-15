import Hero from "../components/Hero";
import AstroForm from "../components/AstroForm";
import StarsOverlay from "../components/StarsOverlay";
import VisitCounter from "../components/VisitCounter";

const Home = () => {
  return (
    <>
      <StarsOverlay />
      <VisitCounter />
      <Hero />
      <AstroForm />
    </>
  );
};

export default Home;
