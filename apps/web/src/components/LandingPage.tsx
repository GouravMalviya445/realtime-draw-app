import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { Footer } from './Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100  bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 dark:bg-slate-700/80 dark:shadow-none dark:backdrop-blur-none bg-pink-200/5 backdrop-blur-sm shadow-sm z-50">
        {/* Navbar */}
        <Navbar />
      </header>

      {/* Hero */}
      <HeroSection/>

      {/* CTA Section
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of users who use our tool for their creative projects.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto mt-8"> 
            <NavigateButton route='/signup'>Get Started</NavigateButton>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
