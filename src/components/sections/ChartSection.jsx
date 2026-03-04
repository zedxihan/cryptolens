import Card from "../ui/Card";
import LineChart from "../charts/LineChart";

export default function ChartSection() {
  return (
    <Card className="col-span-full border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Portfolio Performance</h2>
          <p className="text-sm text-slate-500">Overview of your asset growth over time</p>
        </div>
        <select className="bg-slate-100/50 hover:bg-slate-100 border-none text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-colors cursor-pointer text-slate-700 font-medium">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>
      <LineChart />
    </Card>
  );
}
