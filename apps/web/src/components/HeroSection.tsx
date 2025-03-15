import { ArrowRight, Pencil, Share2, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import Link from "next/link";

export function HeroSection() {
  return (
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
          <Link href="/signup">
            <button className="px-8 py-4 group bg-blue-600 hover:font-bold text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-4 mx-auto">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition ease-in duration-100" />
            </button>
          </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard className='dark:bg-slate-600' icon={<Pencil />} title="Intuitive Drawing" description="Easy-to-use tools that feel natural and responsive"/>
        <FeatureCard className='dark:bg-slate-600' icon={<Users />} title="Real-time Collaboration" description="Work together with your team in real-time"/>
        <FeatureCard className='dark:bg-slate-600' icon={<Share2 />} title="Live Sharing" description="Share your drawings instantly with anyone"/>
      </div>
    </main>
  )
}