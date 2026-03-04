import DashboardLayout from "../components/layout/DashboardLayout";
import KPISection from "../components/sections/KPISection";
import ChartSection from "../components/sections/ChartSection";
import MarketTableSection from "../components/sections/MarketTableSection";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <KPISection />
        <ChartSection />
        <MarketTableSection />
      </div>
    </DashboardLayout>
  );
}
