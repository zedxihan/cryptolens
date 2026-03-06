import { useState } from "react";
import logo from "../../assets/logo.svg";
import {
  Home,
  PieChart,
  BarChart2,
  Calendar,
  Briefcase,
  Clock,
  Settings
} from "lucide-react";

const navItems = [
  { id: "dashboard", icon: Home },
  { id: "analytics", icon: PieChart },
  { id: "reports", icon: BarChart2 },
  { id: "calendar", icon: Calendar },
  { id: "portfolio", icon: Briefcase },
  { id: "history", icon: Clock }
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const navItemClasses = (isActive) =>
    `p-3 rounded-xl transition-all duration-300 group relative cursor-pointer
    hover:scale-105 active:scale-95
    ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`;

  const SidebarItem = ({item}) => {
    const isActive = active === item.id;
    const Icon = item.icon;

    return (
      <button
        type="button"
        onClick={() => setActive(item.id)}
        className={navItemClasses(isActive)}
        aria-label={item.id}
      >
        <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "scale-110" : ""}`}/>
        
        {isActive && (
          <div className="absolute inset-0 bg-white/10 rounded-xl -z-10 animate-zoom-in" />)}
        {!isActive && (
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100
                          rounded-xl -z-10 transition-opacity duration-300" />)}
      </button>
    );
  }
  return (
    <div className="h-full w-22 bg-[#121216] flex flex-col items-center
                    justify-between py-6 md:py-8 border-r border-white/5 shrink-0">
    <div className="flex flex-col items-center  gap-10">

      <img src={logo} className="w-12 h-12 cursor-pointer" alt="logo" />

    <nav className="flex flex-col items-center gap-6">
      {navItems.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}

    </nav>
    </div>

    <button
      type="button"
      onClick={() => setActive("settings")}
      className={navItemClasses(active === "settings")}
      aria-label="settings"
    >
      <Settings className={`w-6 h-6 transition-all duration-300 ${active === "settings" 
                                ? "scale-105" : ""}`} />
    </button>

    </div>
  );
}
