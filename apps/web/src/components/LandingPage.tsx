import { 
  Pencil, 
  Share2, 
  Users,
  Shapes,
  ArrowRight,
  Sun,
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { NavigateButton } from './NavigateButton';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 dark:bg-slate-700/80 dark:shadow-none bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shapes className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span className="text-lg font-semibold dark:text-white">Doodleverse</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavigateButton route='/login' className="px-4 py-2 dark:text-gray-200 dark:hover:text-gray-300 text-gray-600 hover:text-gray-900">
              Login
            </NavigateButton>
            <NavigateButton route='/signup' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </NavigateButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 pt-32 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold dark:text-gray-300 text-gray-900 mb-6">
            Create and Collaborate on{' '}
            <br />
            <span className="text-blue-600 dark:text-blue-400">Drawings</span> Easily
          </h1>
          <p className="text-xl dark:text-gray-400 text-gray-600 mb-12">
            A simple, intuitive drawing tool for diagrams, sketches, and illustrations.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <NavigateButton route='/signup'>Get Started</NavigateButton>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard className='dark:bg-slate-600' icon={<Pencil />} title="Intuitive Drawing" description="Easy-to-use tools that feel natural and responsive"/>
          <FeatureCard className='dark:bg-slate-600' icon={<Users />} title="Real-time Collaboration" description="Work together with your team in real-time"/>
          <FeatureCard className='dark:bg-slate-600' icon={<Share2 />} title="Live Sharing" description="Share your drawings instantly with anyone"/>
        </div>
      </main>

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
      <footer className="bg-white dark:bg-slate-800 border-t dark:border-t-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shapes className="h-6 w-6 dark:text-blue-500 text-blue-600" />
            <span className="text-lg font-semibold dark:text-white">Doodleverse</span>
          </div>
          <p className="text-center dark:text-white/70 text-gray-600">
            © 2024 Doodleverse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
