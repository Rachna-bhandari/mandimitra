import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-brand-green mb-4">
          About MandiMitra
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          MandiMitra was built to address a simple injustice: smallhold farmers in
          Uttarakhand's mountain districts often sell their crops without knowing
          the current mandi price, leaving them vulnerable to exploitation by
          middlemen.
        </p>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Village-level entrepreneur coordinators, aged 25-45, bridge 15-40 farming
          households and their nearest mandi. MandiMitra gives these coordinators
          the data and AI-generated advice they need to negotiate fair prices — in
          Hindi or English, in under a second.
        </p>
        <p className="text-gray-500 text-sm">



        </p>
      </main>
      <Footer />
    </div>
  )
}
