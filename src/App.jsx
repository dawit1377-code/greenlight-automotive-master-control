import React, { useState } from 'react';

// --- EMBEDDED LOGO COMPONENT ---
const BrandLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center w-10 h-10">
      <div className="w-2 h-2 rounded-full bg-slate-400 mb-0.5"></div>
      <div className="w-2 h-2 rounded-full bg-slate-400 mb-0.5"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]"></div>
    </div>
    <div>
      <h1 className="font-extrabold text-slate-800 tracking-tight text-base leading-none">
        GREEN LIGHT
      </h1>
      <p className="text-[9px] text-emerald-600 font-bold tracking-wider uppercase mt-0.5">
        Automotive Center
      </p>
    </div>
  </div>
);

// --- INITIAL DATA STORE ---
const INITIAL_SALES = [
  { id: 'INV-2026-081', client: 'Commercial Bank Fleet', scope: 'Fleet Maintenance', type: 'Credit', amount: 8574291, date: '2026-08-01', status: 'Pending' },
  { id: 'INV-2026-082', client: 'Abebe T. (Private)', scope: 'Engine Overhaul', type: 'Cash', amount: 150000, date: '2026-08-10', status: 'Completed' },
  { id: 'INV-2026-083', client: 'Ethio Telecom Logistics', scope: 'Transmission Service', type: 'Credit', amount: 2856472, date: '2026-08-11', status: 'Pending' },
  { id: 'INV-2026-084', client: 'Mulugeta T.', scope: 'Brake Replacement & Alignment', type: 'Cash', amount: 95000, date: '2026-08-12', status: 'Completed' },
];

const INITIAL_TENDERS = [
  { id: 'TND-2026-01', client: 'Commercial Bank Fleet', scope: 'Annual Fleet Maintenance Contract', budget: 12000000, deadline: '2026-09-15', status: 'Submitted' },
  { id: 'TND-2026-02', client: 'Heineken Breweries Dispatch', scope: 'Heavy Truck Engine Servicing', budget: 5500000, deadline: '2026-08-30', status: 'In Review' },
  { id: 'TND-2026-03', client: 'Ethio Telecom Fleet', scope: 'Quarterly Diagnostic & Maintenance', budget: 8200000, deadline: '2026-10-01', status: 'Awarded' },
];

const INITIAL_SERVICES = [
  { plate: 'AA-2-34812', model: 'Toyota Hilux 2023', owner: 'Greenlight Corporate Fleet', service: 'Full Synthetic Oil Change', lastService: '2026-07-15', status: 'Due Soon' },
  { plate: 'AA-3-98211', model: 'Isuzu NPR Truck', owner: 'Heineken Dispatch', service: 'Brake Pad & Rotor Renewal', lastService: '2026-06-10', status: 'Overdue' },
  { plate: 'AA-2-11002', model: 'Nissan Patrol', owner: 'Private Client', service: 'Transmission Flush & Calibration', lastService: '2026-08-05', status: 'Up to Date' },
];

const INITIAL_MARKETING = [
  { channel: 'Telegram Outreach (EthioSera)', campaign: 'Corporate Fleet Package', leads: 142, conversions: 18, roi: '+34%' },
  { channel: 'TikTok Video Showcase', campaign: 'Engine Overhaul Highlights', leads: 890, conversions: 45, roi: '+52%' },
  { channel: 'Direct B2B Email Outreach', campaign: 'Addis Enterprise Maintenance', leads: 28, conversions: 6, roi: '+22%' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data States
  const [sales, setSales] = useState(INITIAL_SALES);
  const [tenders, setTenders] = useState(INITIAL_TENDERS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [marketing, setMarketing] = useState(INITIAL_MARKETING);

  // Modal State
  const [modalType, setModalType] = useState(null); // 'sale', 'tender', 'service'
  const [formData, setFormData] = useState({});

  // Calculations
  const totalGross = sales.reduce((a, c) => a + c.amount, 0);
  const cashCollected = sales.filter(s => s.type === 'Cash').reduce((a, c) => a + c.amount, 0);
  const creditOutstanding = sales.filter(s => s.type === 'Credit').reduce((a, c) => a + c.amount, 0);

  // Filter Helper
  const filterByQuery = (item, keys) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return keys.some(k => item[k]?.toString().toLowerCase().includes(q));
  };

  // Entry Handler
  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (modalType === 'sale') {
      const newSale = {
        id: `INV-2026-0${sales.length + 85}`,
        client: formData.client || 'General Client',
        scope: formData.scope || 'General Maintenance',
        type: formData.type || 'Cash',
        amount: parseFloat(formData.amount || 0),
        date: new Date().toISOString().split('T')[0],
        status: formData.status || 'Completed'
      };
      setSales([newSale, ...sales]);
    } else if (modalType === 'tender') {
      const newTender = {
        id: `TND-2026-0${tenders.length + 1}`,
        client: formData.client || 'Corporate Client',
        scope: formData.scope || 'Fleet Service Tender',
        budget: parseFloat(formData.budget || 0),
        deadline: formData.deadline || '2026-09-30',
        status: formData.status || 'Submitted'
      };
      setTenders([newTender, ...tenders]);
    } else if (modalType === 'service') {
      const newService = {
        plate: formData.plate || 'AA-2-00000',
        model: formData.model || 'Standard Vehicle',
        owner: formData.owner || 'Client',
        service: formData.service || 'Scheduled Maintenance',
        lastService: new Date().toISOString().split('T')[0],
        status: 'Up to Date'
      };
      setServices([newService, ...services]);
    }
    setModalType(null);
    setFormData({});
  };

  // CSV Export
  const exportToCSV = (data, filename) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(v => `"${v}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between print:hidden">
        <div>
          <div className="p-5 border-b border-slate-800 bg-slate-950">
            <BrandLogo />
          </div>

          <div className="px-5 py-2.5 bg-emerald-950/40 border-b border-emerald-900/30 text-[10px] text-emerald-400 font-bold tracking-widest uppercase">
            "A Better Way To Go"
          </div>

          <nav className="p-3 space-y-1">
            {[
              { id: 'dashboard', label: 'Executive Dashboard' },
              { id: 'sales', label: 'Sales & Credit Ledger' },
              { id: 'tenders', label: 'B2B & Fleet Tenders' },
              { id: 'service', label: 'Vehicle Service Logs' },
              { id: 'marketing', label: 'Digital Reach Control' },
              { id: 'reports', label: 'Reports & Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-[10px] text-slate-400">
          <span>v2.6 Enterprise</span>
          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">READY TO USE</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        
        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm print:hidden">
          <div className="w-80">
            <input 
              type="text"
              placeholder="Live Search Across All Data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
            >
              🖨️ Print / PDF Report
            </button>

            <button 
              onClick={() => setModalType(activeTab === 'tenders' ? 'tender' : activeTab === 'service' ? 'service' : 'sale')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg shadow-md transition-all"
            >
              + Record Entry
            </button>
          </div>
        </header>

        {/* WORKSPACE & PRINT OUTPUT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 print:p-0">
          
          {/* PRINT BRANDED HEADER */}
          <div className="hidden print:block border-b-2 border-emerald-500 pb-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">GREEN LIGHT AUTOMOTIVE CENTER</h1>
                <p className="text-xs font-bold text-emerald-600 uppercase">A Better Way To Go — Official Executive Report</p>
                <p className="text-xs text-slate-500 mt-1">Addis Ababa, Ethiopia | Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right text-xs text-slate-600">
                <p className="font-bold">Master Management System Output</p>
                <p>Status: Confidential Executive Summary</p>
              </div>
            </div>
          </div>

          {/* KPI METRICS SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Total Gross Revenue</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{totalGross.toLocaleString()} ETB</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ Direct & Receivable Combined</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Cash Settled</p>
              <h3 className="text-xl font-black text-emerald-600 mt-1">{cashCollected.toLocaleString()} ETB</h3>
              <p className="text-[10px] text-slate-500 mt-1">Immediate Payments</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Outstanding Corporate Credit</p>
              <h3 className="text-xl font-black text-amber-600 mt-1">{creditOutstanding.toLocaleString()} ETB</h3>
              <p className="text-[10px] text-amber-600 font-bold mt-1">Pending Invoices</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Active Fleet B2B Tenders</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{tenders.length} Active Bids</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">Commercial B2B Contracts</p>
            </div>
          </div>

          {/* VIEW MODULE: SALES & CREDIT LEDGER */}
          {(activeTab === 'dashboard' || activeTab === 'sales' || activeTab === 'reports') && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 print:border-none print:p-0">
              <div className="flex justify-between items-center mb-4 print:hidden">
                <h3 className="text-sm font-extrabold text-slate-800">Sales & Corporate Credit Ledger</h3>
                <button 
                  onClick={() => exportToCSV(sales, 'GLAC_Sales_Ledger')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-bold"
                >
                  📥 Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-bold">
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Client / Company</th>
                      <th className="p-3">Scope of Work</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Amount (ETB)</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sales.filter(s => filterByQuery(s, ['id', 'client', 'scope', 'type'])).map(row => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-emerald-600">{row.id}</td>
                        <td className="p-3 font-semibold text-slate-800">{row.client}</td>
                        <td className="p-3 text-slate-600">{row.scope}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.type === 'Cash' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {row.type}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-900">{row.amount.toLocaleString()} ETB</td>
                        <td className="p-3 text-slate-500">{row.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
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

          {/* VIEW MODULE: B2B TENDERS */}
          {(activeTab === 'tenders' || activeTab === 'reports') && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 print:border-none print:p-0">
              <div className="flex justify-between items-center mb-4 print:hidden">
                <h3 className="text-sm font-extrabold text-slate-800">B2B & Fleet Service Tenders</h3>
                <button 
                  onClick={() => exportToCSV(tenders, 'GLAC_B2B_Tenders')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 rounded font-bold"
                >
                  📥 Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-bold">
                      <th className="p-3">Tender ID</th>
                      <th className="p-3">Target Enterprise</th>
                      <th className="p-3">Contract Scope</th>
                      <th className="p-3">Estimated Value (ETB)</th>
                      <th className="p-3">Submission Deadline</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tenders.filter(t => filterByQuery(t, ['id', 'client', 'scope', 'status'])).map(row => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-700">{row.id}</td>
                        <td className="p-3 font-semibold text-slate-800">{row.client}</td>
                        <td className="p-3 text-slate-600">{row.scope}</td>
                        <td className="p-3 font-bold text-emerald-600">{row.budget.toLocaleString()} ETB</td>
                        <td className="p-3 text-slate-500">{row.deadline}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">
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

          {/* VIEW MODULE: VEHICLE SERVICE LOGS */}
          {(activeTab === 'service' || activeTab === 'reports') && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 print:border-none print:p-0">
              <h3 className="text-sm font-extrabold text-slate-800 mb-4">Vehicle Maintenance & Service Logs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-bold">
                      <th className="p-3">Plate #</th>
                      <th className="p-3">Vehicle Model</th>
                      <th className="p-3">Owner / Organization</th>
                      <th className="p-3">Service Provided</th>
                      <th className="p-3">Last Service</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {services.filter(s => filterByQuery(s, ['plate', 'model', 'owner', 'service'])).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{row.plate}</td>
                        <td className="p-3 text-slate-700">{row.model}</td>
                        <td className="p-3 text-slate-600">{row.owner}</td>
                        <td className="p-3 text-slate-600">{row.service}</td>
                        <td className="p-3 text-slate-500">{row.lastService}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            row.status === 'Due Soon' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
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

          {/* VIEW MODULE: DIGITAL REACH CONTROL */}
          {activeTab === 'marketing' && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <h3 className="text-sm font-extrabold text-slate-800 mb-4">Digital Marketing & Lead Generation ROI</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {marketing.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                    <p className="text-xs font-bold text-emerald-600">{m.channel}</p>
                    <p className="text-xs font-semibold text-slate-800">{m.campaign}</p>
                    <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
                      <span>Leads: <strong>{m.leads}</strong></span>
                      <span>Converted: <strong>{m.conversions}</strong></span>
                      <span className="text-emerald-600 font-bold">{m.roi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL SYSTEM */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase">
                {modalType === 'sale' ? 'Record New Transaction' : modalType === 'tender' ? 'Add B2B Tender' : 'Log Vehicle Service'}
              </h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveEntry} className="space-y-3 text-xs">
              {modalType === 'sale' && (
                <>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Client / Company Name</label>
                    <input type="text" required placeholder="e.g. Commercial Bank Fleet" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, client: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Scope of Work</label>
                    <input type="text" placeholder="e.g. Engine Overhaul" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, scope: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 block mb-1 font-semibold">Payment Type</label>
                      <select className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Cash">Cash Receipt</option>
                        <option value="Credit">Credit Invoice</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-600 block mb-1 font-semibold font-semibold">Amount (ETB)</label>
                      <input type="number" required placeholder="150000" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, amount: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              {modalType === 'tender' && (
                <>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Target Company</label>
                    <input type="text" required placeholder="e.g. Heineken Ethiopia" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, client: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Tender Scope</label>
                    <input type="text" placeholder="e.g. Annual Fleet Maintenance" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, scope: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Estimated Budget (ETB)</label>
                    <input type="number" required placeholder="5000000" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, budget: e.target.value})} />
                  </div>
                </>
              )}

              {modalType === 'service' && (
                <>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Plate Number</label>
                    <input type="text" required placeholder="AA-2-12345" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, plate: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Vehicle Model & Owner</label>
                    <input type="text" placeholder="Toyota Hilux - Enterprise Client" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, owner: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Service Details</label>
                    <input type="text" placeholder="Full Synthetic Oil & Filter Service" className="w-full border border-slate-300 rounded p-2 text-slate-800" onChange={e => setFormData({...formData, service: e.target.value})} />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-emerald-500 text-slate-950 font-black">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
