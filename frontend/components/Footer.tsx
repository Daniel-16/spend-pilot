import { TrendingUp } from "lucide-react";

export function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      className="relative px-6 py-14 overflow-hidden bg-white"
      style={{ transform: `translateY(${scrollY * 0.04}px)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(2,6,23,0.03) 0 1px, transparent 2px 120px), repeating-linear-gradient(90deg, rgba(2,6,23,0.03) 0 2px, transparent 2px 120px)",
          backgroundSize: "120px 120px, 120px 120px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-7xl px-6 py-8 h-full">
            <div className="grid grid-cols-8 gap-4 h-full">
              {Array.from({ length: 4 * 6 }).map((_, i) => {
                const isBlue = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className={`rounded-lg w-full pointer-events-none transition-all transform ${
                      isBlue
                        ? "bg-gradient-to-br from-blue-400/25 to-cyan-200/10 border border-blue-200/30 shadow-sm"
                        : "bg-white/30 border border-slate-100/40"
                    }`}
                    style={{ height: "120px" }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
          <div className="flex items-center gap-8 text-gray-700">
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
        <div className="border-t text-sm border-white/10 mt-8 pt-8 text-center text-gray-700">
          <p>
            &copy; {year} SpendPilot. Powered by AI Agents and data analysis
            technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
