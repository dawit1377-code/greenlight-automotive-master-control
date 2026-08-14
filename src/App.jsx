import React, { useState } from 'react';

// --- INLINE SVG ICON COMPONENTS (Zero External Dependencies) ---
const IconDashboard = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconDollar = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 0V4m0 2e12 8m0 0v2m0 0v2m0-6h-1m1 0h1m-1 10h-1m1 0h1" />
  </svg>
);

const IconMarketing = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconTenders = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconService = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

const IconPrinter = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

// --- INITIAL MOCK DATA ---
const INITIAL_SALES = [
  { id: 'INV-2026-081', client: 'Commercial Bank Fleet', scope: 'Fleet Maintenance', type: 'Credit', amount: 8574291, date: '2026-08-01', status: 'Pending' },
  { id: 'INV-2026-082', client: 'Abebe T. (Private)', scope: 'Engine Overhaul', type: 'Cash', amount: 150000, date: '2026-08-10', status: 'Completed' },
  { id: 'INV-2026-083', client: 'Ethio Telecom Logistics', scope: 'Transmission Service', type: 'Credit', amount: 2856472, date: '2026-08-11', status: 'Pending' },
  { id: 'INV-2026-084', client: 'Mulugeta T.', scope: 'Brake Replacement & Alignment', type: 'Cash', amount: 95000, date: '2026-08-12', status: 'Completed' },
];

const INITIAL_SERVICE_LOGS = [
  { plate: 'AA-2-34812', model: 'Toyota Hilux 2023', owner: 'Greenlight Corporate Fleet', lastService: '2026-07-15', nextDueKm: '125,000 km', status: 'Due Soon' },
  { plate: 'AA-3-98211', model: 'Isuzu NPR Truck', owner: 'Heineken Breweries Dispatch', lastService: '2026-06-10', nextDueKm: '80,000 km', status: 'Overdue' },
  { plate: 'AA-2-11002', model: 'Nissan Patrol', owner: 'Private Client', lastService: '2026-08-05', nextDueKm: '45,000 km', status: 'Up to Date' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [salesLedger, setSalesLedger] = useState(INITIAL_SALES);
  const [serviceLogs, setServiceLogs] = useState(INITIAL_SERVICE_LOGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportSection, setReportSection] = useState('all');

  // New Record State
  const [newEntry, setNewEntry] = useState({
    client: '',
    scope: '',
    type: 'Cash',
    amount: '',
    status: 'Completed'
  });

  const totalSales = salesLedger.reduce((acc, curr) => acc + curr.amount, 0);
  const cashSales = salesLedger.filter(s => s.type === 'Cash').reduce((acc, curr) => acc + curr.amount, 0);
  const creditSales = salesLedger.filter(s => s.type === 'Credit').reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newEntry.client || !newEntry.amount) return;

    const entry = {
      id: `INV-2026-0${salesLedger.length + 85}`,
      client: newEntry.client,
      scope: newEntry.scope || 'General Maintenance & Inspection',
      type: newEntry.type,
      amount: parseFloat(newEntry.amount),
      date: new Date().toISOString().split('T')[0],
      status: newEntry.status
    };

    setSalesLedger([entry, ...salesLedger]);
    setNewEntry({ client: '', scope: '', type: 'Cash', amount: '', status: 'Completed' });
    setIsModalOpen(false);
  };

  const triggerPrintReport = () => {
    window.print();
  };

  return (
    <div className="flex h-screen bg-[#0B0F17] text-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col justify-between print:hidden">
        <div>
          {/* BRANDING HEADER WITH TRAFFIC LIGHT LOGO */}
          <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center p-1 shadow-md">
              <div className="w-2 h-2 rounded-full bg-slate-600 mb-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-slate-600 mb-0.5"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            </div>
            <div>
              <h1 className="font-black tracking-tight text-white leading-none text-base">
                GREEN LIGHT
              </h1>
              <p className="text-[9px] text-emerald-400 font-semibold tracking-wider uppercase mt-1">
                Automotive Center
              </p>
            </div>
          </div>

          <div className="px-5 py-2 bg-emerald-950/40 border-b border-emerald-900/30 text-[10px] text-emerald-300 font-medium tracking-wide">
            "A BETTER WAY TO GO"
          </div>

          {/* NAVIGATION MENU */}
          <nav className="p-3 space-y-1">
            {[
              { id: 'dashboard', label: 'Executive Dashboard', icon: IconDashboard },
              { id: 'sales', label: 'Sales & Credit Ledger', icon: IconDollar },
              { id: 'marketing', label: 'Digital Reach Control', icon: IconMarketing },
              { id: 'tenders', label: 'B2B & Fleet Tenders', icon: IconTenders },
              { id: 'service', label: 'Vehicle Service Logs', icon: IconService },
              { id: 'reports', label: 'Reports & Analytics', icon: IconPrinter },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <Icon />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SYSTEM STATUS */}
        <div className="p-4 border-t border-slate-800 bg-[#0F172A]">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-slate-300">v2.6 Enterprise</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-bold">MASTER</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0B0F17]">
        
        {/* TOP BAR */}
        <header className="h-16 border-b border-slate-800 bg-[#111827]/60 px-6 flex items-center justify-between print:hidden">
          <div className="w-72">
            <input 
              type="text"
              placeholder="Search Invoice, Client, Plate #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={triggerPrintReport}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center space-x-2 border border-slate-700 transition-all"
            >
              <IconPrinter />
              <span>Print Official Report</span>
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <IconPlus />
              <span>Record New Sale</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE & REPORT PRINT VIEW */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 print:p-0 print:overflow-visible">
          
          {/* PRINT ONLY EXECUTIVE HEADER */}
          <div className="hidden print:block mb-6 border-b-2 border-emerald-500 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-black tracking-wide">GREEN LIGHT AUTOMOTIVE CENTER</h1>
                <p className="text-xs text-emerald-700 font-bold uppercase">A Better Way To Go — Official Executive Report</p>
                <p className="text-xs text-slate-500">Addis Ababa, Ethiopia | Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right text-xs text-slate-600">
                <p className="font-bold">Master Control System Output</p>
                <p>Status: Confidential / Executive Internal</p>
              </div>
            </div>
          </div>

          {/* DASHBOARD TAB */}
          {(activeTab === 'dashboard' || activeTab === 'reports') && (
            <div className="space-y-6">
              {/* KPI CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 font-medium">Total Gross Revenue</p>
                  <h3 className="text-xl font-bold text-white mt-1">{totalSales.toLocaleString()} ETB</h3>
                  <p className="text-[10px] text-emerald-400 mt-1 font-semibold">↑ Combined Receipts & Receivables</p>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 font-medium">Cash Collected</p>
                  <h3 className="text-xl font-bold text-emerald-400 mt-1">{cashSales.toLocaleString()} ETB</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Direct Settlement</p>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 font-medium">Outstanding Corporate Credit</p>
                  <h3 className="text-xl font-bold text-amber-400 mt-1">{creditSales.toLocaleString()} ETB</h3>
                  <p className="text-[10px] text-amber-500/80 mt-1">Pending Invoice Balances</p>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400 font-medium">Active Fleet B2B Contracts</p>
                  <h3 className="text-xl font-bold text-white mt-1">4 Tenders</h3>
                  <p className="text-[10px] text-emerald-400 mt-1">Heineken, CBE, Ethio Telecom</p>
                </div>
              </div>
            </div>
          )}

          {/* SALES LEDGER TABLE */}
          {(activeTab === 'sales' || activeTab === 'dashboard' || activeTab === 'reports') && (
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 print:border-none print:p-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-200 print:text-black">Sales Ledger & Outstanding Credit Portfolio</h3>
                <span className="text-xs text-slate-400 font-mono print:hidden">{salesLedger.length} Total Postings</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 print:text-black">
                  <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 print:bg-slate-200 print:text-black">
                    <tr>
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Customer / Organization</th>
                      <th className="p-3">Service Scope</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Amount (ETB)</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 print:divide-slate-300">
                    {salesLedger
                      .filter(s => s.client.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3 font-mono text-emerald-400 font-bold print:text-black">{row.id}</td>
                          <td className="p-3 font-semibold text-slate-100 print:text-black">{row.client}</td>
                          <td className="p-3 text-slate-400 print:text-slate-700">{row.scope}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.type === 'Cash' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {row.type}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-100 print:text-black">{row.amount.toLocaleString()} ETB</td>
                          <td className="p-3 text-slate-400 print:text-black">{row.date}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                              row.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SERVICE REMINDERS TAB */}
          {(activeTab === 'service' || activeTab === 'reports') && (
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 print:border-none print:p-0">
              <h3 className="text-sm font-bold text-slate-200 mb-4 print:text-black">Vehicle Service Tracking & Fleet Reminders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 print:text-black">
                  <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 print:bg-slate-200 print:text-black">
                    <tr>
                      <th className="p-3">Plate Number</th>
                      <th className="p-3">Vehicle Model</th>
                      <th className="p-3">Owner / Organization</th>
                      <th className="p-3">Last Service</th>
                      <th className="p-3">Next Due Mileage</th>
                      <th className="p-3">Alert Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 print:divide-slate-300">
                    {serviceLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="p-3 font-mono font-bold text-slate-100 print:text-black">{log.plate}</td>
                        <td className="p-3 text-slate-300 print:text-black">{log.model}</td>
                        <td className="p-3 text-slate-400 print:text-black">{log.owner}</td>
                        <td className="p-3 text-slate-400 print:text-black">{log.lastService}</td>
                        <td className="p-3 font-mono text-emerald-400 font-semibold print:text-black">{log.nextDueKm}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.status === 'Overdue' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            log.status === 'Due Soon' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* RECORD ENTRY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111827] border border-slate-800 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Record New Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            
            <form onSubmit={handleAddEntry} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Customer / Organization Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Commercial Bank Fleet"
                  value={newEntry.client}
                  onChange={(e) => setNewEntry({...newEntry, client: e.target.value})}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Scope of Maintenance</label>
                <input 
                  type="text" 
                  placeholder="e.g. Full Fleet Diagnostic & Brake Renewal"
                  value={newEntry.scope}
                  onChange={(e) => setNewEntry({...newEntry, scope: e.target.value})}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Payment Method</label>
                  <select 
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({...newEntry, type: e.target.value})}
                    className="w-full bg-[#0B0F17] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Cash">Cash Receipt</option>
                    <option value="Credit">Credit Invoice</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Amount (ETB)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="250000"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                    className="w-full bg-[#0B0F17] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-3.5 py-1.5 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
