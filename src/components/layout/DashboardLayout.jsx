import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-full max-w-[1400px] min-h-screen md:h-[90vh] md:min-h-[800px] bg-[#f8f9fa]
                    md:rounded-[30px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
      <Sidebar />

      <main className="grow flex flex-col px-4 py-3 md:px-8 md:py-4 overflow-y-auto bg-[#f8f9fa]">
        <Topbar />
        {children}
        <Footer />
      </main>
    </div>
  );
}