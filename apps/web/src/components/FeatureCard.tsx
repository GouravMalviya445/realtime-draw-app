interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({icon, title, description, className=""}: FeatureCardProps) {
  return (
    <div className={`bg-white p-6 group rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition duration-200 ease-in ${className}`}>
      <div className="w-10 h-10 dark:bg-blue-300 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:text-green-600 transition duration-200 ease-in">
        {icon}
      </div>
      <h3 className="text-lg font-semibold dark:text-white/80 text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-white/50">
        {description}
      </p>
    </div>
  )
}