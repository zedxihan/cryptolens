export default function KPIBox({ title, value, change }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col gap-2">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        {change && (
          <span className={`text-sm ${change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  );
}
