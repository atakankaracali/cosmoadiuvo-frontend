import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoonCalendar from "./pages/MoonCalendar";
import DailyHoroscope from "./pages/DailyHoroscope";
import RetroPage from "./pages/RetroList";
import SolarSystemPage from "./pages/SolarSystem";
import EclipseCalendar from "./pages/EclipseCalendar";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moon-calendar" element={<MoonCalendar />} />
        <Route path="/daily-horoscope" element={<DailyHoroscope />} />
        <Route path="/solar-system" element={<SolarSystemPage />} />
        <Route path="/retro-planets" element={<RetroPage />} />
        <Route path="/eclipse-calendar" element={<EclipseCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
