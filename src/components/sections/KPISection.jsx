import KPIBox from "../cards/KPIBox";

export default function KPISection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <KPIBox title="Total Balance" value="$124,500.00" change={5.2} />
      <KPIBox title="24h Profit" value="+$3,240.50" change={2.1} />
      <KPIBox title="Active Assets" value="12" />
      <KPIBox title="Win Rate" value="68%" change={-1.4} />
    </div>
  );
}
