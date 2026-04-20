
import InteractiveDates from "./interactivedates";

export default function Hero() {
  
  return (
    <div id="#Home" className="h-screen flex flex-col justify-center items-center relative overflow-hidden">

      {/* Background animation */}
     <InteractiveDates/>

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[120px] opacity-30 rounded-full"></div>

      {/* Content */}
      <div className="z-10 text-center">
       <h1 className="text-5xl font-bold mb-6">
          Advanced Scheduling Platform <br />
          <span className="text-purple-400">Built for Growth</span>
        </h1>

        <button className="px-6 py-3 bg-purple-500 rounded-xl shadow-lg hover:scale-105 transition" onClick={() => window.open("/signup", "_blank")}>
          Start 30-Day Free Trial
        </button>
      </div>
    </div>
  );
}
