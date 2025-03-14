import { NavigateButton } from "./NavigateButton";
import { Shapes } from "lucide-react";

export function Navbar() {
  return (
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
  )
}