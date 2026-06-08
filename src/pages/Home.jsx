import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Products from '../components/Products'
import About from '../components/About'
import Rifas from '../components/Rifas'
import Experiences from '../components/Experiences'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Products />
        <About />
        <Rifas />
        <Experiences />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
