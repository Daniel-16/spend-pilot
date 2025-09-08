import { TrendingUp } from "lucide-react";

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <footer
      className="relative px-4 sm:px-6 py-8 sm:py-12 md:py-2 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 md:mb-0">
            <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-blue-600 bg-clip-text text-transparent">
              SpendPilot
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base text-gray-700 order-last md:order-none">
            <a 
              href="#" 
              className="hover:text-blue-500 transition-colors duration-200 font-medium"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="hover:text-blue-500 transition-colors duration-200 font-medium"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="hover:text-blue-500 transition-colors duration-200 font-medium"
            >
              Support
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-4 sm:pt-6 md:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            &copy; {year} SpendPilot. Powered by AI Agents and data analysis technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}