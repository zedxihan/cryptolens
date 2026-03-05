import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";

export default function Topbar() {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4">
  
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-6">

      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={logo} alt="CryptoLens Logo" className="w-8 h-8" />
        <span className="text-lg font-semibold tracking-tight">CryptoLens</span>
      </div>

      {/* Search */}
      <div className="flex items-center bg-slate-100 rounded-xl px-3 py-2 w-full max-w-md
                      focus-within:ring-2 focus-within:ring-green-500">
        <MagnifyingGlassIcon  className="w-5 h-5 text-slate-500" />
        <input type="text" placeholder="Search coins..." className="bg-transparent outline-none ml-2 text-sm
                                                                    w-full placeholder:text-slate-500" />
        <span className="text-xs text-slate-500">/</span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">

        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50
                            shadow-sm hover:shadow-md active:shadow-sm active:scale-95 transition cursor-pointer">
          Login
        </button>

        <button className="px-4 py-2 text-sm text-white font-medium bg-green-500 rounded-lg hover:bg-green-600
                            shadow-sm hover:shadow-lg active:shadow-md active:scale-95 transition cursor-pointer">
          Sign Up
        </button>
      </div>

      </div>
    </header>
  )
}