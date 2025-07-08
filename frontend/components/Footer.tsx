import { TrendingUp } from "lucide-react";

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-12 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-2 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              SpendPilot
            </span>
          </div>
          <div className="flex items-center gap-8 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
        <div className="border-t text-sm border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {year} SpendPilot. Powered by AI Agents and data analysis
            technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
