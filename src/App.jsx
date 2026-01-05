import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Updates from './components/Updates';
import Map from './components/Map';
import FAQ from './components/FAQ';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <Navbar />
      <Hero />
      <Story />
      <Updates />
      <Map />
      <FAQ />
      <RSVP />
      <Footer />
    </div>
  );
}

export default App;
