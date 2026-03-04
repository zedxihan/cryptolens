import { useState } from "react";
import { 
  HomeIcon, 
  ChartPieIcon, 
  ChartBarSquareIcon, 
  CalendarDaysIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  Cog6ToothIcon 
} from "@heroicons/react/24/outline";
import { 
  HomeIcon as HomeSolid,
  ChartPieIcon as ChartPieSolid,
  ChartBarSquareIcon as ChartBarSquareSolid,
  CalendarDaysIcon as CalendarDaysSolid,
  BriefcaseIcon as BriefcaseSolid,
  ClockIcon as ClockSolid
} from "@heroicons/react/24/solid";

const navItems = [
  { id: "dashboard", icon: HomeIcon, activeIcon: HomeSolid },
  { id: "analytics", icon: ChartPieIcon, activeIcon: ChartPieSolid },
  { id: "reports", icon: ChartBarSquareIcon, activeIcon: ChartBarSquareSolid },
  { id: "calendar", icon: CalendarDaysIcon, activeIcon: CalendarDaysSolid },
  { id: "portfolio", icon: BriefcaseIcon, activeIcon: BriefcaseSolid },
  { id: "history", icon: ClockIcon, activeIcon: ClockSolid }
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const navItemClasses = (isActive) =>
  `p-3 rounded-xl transition-all duration-300 group relative cursor-pointer
                  hover:scale-100 active:scale-90
                  ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`;

  return (
    <div className="h-screen w-20 bg-[#121216] flex flex-col items-center
                   justify-between py-8 border-r border-white/5">
      <div className="flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="w-12 h-12 bg-white rounded-full flex items-center
                        justify-center mb-4 cursor-pointer overflow-hidden p-[2px]">
          <div className="w-full h-full bg-[#121216] rounded-full flex items-center justify-center p-1">
             <div className="w-full h-full bg-linear-to-br from-green-300 to-green-500
                             rounded-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-[#121216] rotate-45 transform"></div>
             </div>
          </div>
        </div>

        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isActive = active === item.id;
            const Icon = isActive ? item.activeIcon : item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={navItemClasses(isActive)}
              >
                <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? "scale-100" : ""}`} />
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-xl -z-10 animate-zoom-in" />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100
                                  rounded-xl -z-10 transition-opacity duration-300" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        onClick={() => setActive("settings")}
        className={navItemClasses(active === "settings")}
      >
        <Cog6ToothIcon className={`w-6 h-6 transition-all duration-300 ${active === "settings" ? "scale-100" : ""}`} />
      </button>
    </div>
  );
}

