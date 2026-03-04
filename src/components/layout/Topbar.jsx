export default function Topbar() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 transition-all">
      <div className="md:hidden flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded shadow-sm"></div>
        <h1 className="text-lg font-bold tracking-tight">CryptoDash</h1>
      </div>
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative">
          <input type="text" placeholder="Search assets..." className="w-full bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <div className="w-2 h-2 rounded-full border border-white bg-rose-500 absolute top-1 right-1"></div>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 shadow-sm border-2 border-white cursor-pointer hover:shadow-md transition-shadow"></div>
      </div>
    </header>
  );
}
