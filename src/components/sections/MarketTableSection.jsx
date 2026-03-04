import Card from "../ui/Card";

export default function MarketTableSection() {
  return (
    <Card className="border border-slate-100 shadow-sm overflow-hidden">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Market Overview</h2>
        <p className="text-sm text-slate-500">Top assets by market capitalization</p>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Asset</th>
              <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Price</th>
              <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">24h Change</th>
              <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Market Cap</th>
              <th className="py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:shadow transition-shadow">BTC</div>
                  <div>
                    <div className="font-bold text-slate-800">Bitcoin</div>
                    <div className="text-xs text-slate-500">BTC</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-slate-800 font-bold">$64,230.00</td>
              <td className="py-4 px-4 text-emerald-500 font-medium">
                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-xs w-max">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  +2.4%
                </span>
              </td>
              <td className="py-4 px-4 text-slate-600 font-medium hidden sm:table-cell">$1.2T</td>
              <td className="py-4 px-4 text-right">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors opacity-0 group-hover:opacity-100">Trade</button>
              </td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:shadow transition-shadow">ETH</div>
                  <div>
                    <div className="font-bold text-slate-800">Ethereum</div>
                    <div className="text-xs text-slate-500">ETH</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-slate-800 font-bold">$3,450.00</td>
              <td className="py-4 px-4 text-rose-500 font-medium">
                <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md text-xs w-max">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                  -1.2%
                </span>
              </td>
              <td className="py-4 px-4 text-slate-600 font-medium hidden sm:table-cell">$400B</td>
              <td className="py-4 px-4 text-right">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors opacity-0 group-hover:opacity-100">Trade</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
