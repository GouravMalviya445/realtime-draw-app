import { Shapes } from "lucide-react"

export function Footer() { 
  return (
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
  )
}