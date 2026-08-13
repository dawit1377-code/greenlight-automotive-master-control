import React, { useState, useMemo } from 'react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sales' | 'marketing' | 'tenders' | 'reminders' | 'reports'
  const [salesFilter, setSalesFilter] = useState('all'); // 'all' | 'cash' | 'credit'
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Forms State
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [showAddTenderModal, setShowAddTenderModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState(null);

  // --- DATA STATES ---
  const [salesRecords, setSalesRecords] = useState([
    { id: 101, invoiceNo: 'INV-2026-081', customer: 'Commercial Bank Fleet', amount: 8574291, type: 'Credit', service: 'Fleet Maintenance', date: '2026-08-01', status: 'Pending' },
    { id: 102, invoiceNo: 'INV-2026-082', customer: 'Abebe T. (Private)', amount: 150000, type: 'Cash', service: 'Engine Overhaul', date: '2026-08-10', status: 'Completed' },
    { id: 103, invoiceNo: 'INV-2026-083', customer: 'Ethio Telecom Logistics', amount: 2856472, type: 'Credit', service: 'Transmission Service', date: '2026-08-11', status: 'Pending' },
    { id: 104, invoiceNo: 'INV-2026-084', customer: 'Mulugeta T.', amount: 95000, type: 'Cash', service: 'Brake Replacement & Alignment', date: '2026-08-12', status: 'Completed' }
  ]);

  const [serviceReminders, setServiceReminders] = useState([
    { id: 1, plate: '3-A1234', customer: 'Mulugeta T.', vehicle: 'Toyota Hilux 2022', currentKm: '59,800', targetKm: '60,000 km', dueDate: '2026-08-18', status: 'Due Soon', phone: '+251911223344' },
    { id: 2, plate: '3-B9876', customer: 'Commercial Bank Fleet', vehicle: 'Isuzu NPR Truck', currentKm: '121,500', targetKm: '120,000 km', dueDate: '2026-08-05', status: 'Overdue', phone: '+251911889900' },
    { id: 3, plate: '3-C4567', customer: 'Selam Bus Line', vehicle: 'Yutong Bus', currentKm: '198,000', targetKm: '200,000 km', dueDate: '2026-08-25', status: 'Scheduled', phone: '+251922334455' }
  ]);

  const [tenders, setTenders] = useState([
    { id: 1, refNo: 'TND-2026-004', client: 'Ministry of Transport', title: 'Annual Fleet General Overhaul', cpoAmount: '450,000 ETB', bank: 'Awash Bank CPO', deadline: '2026-08-28', status: 'Active Bid' },
    { id: 2, refNo: 'TND-2026-002', client: 'Ethiopian Electric Utility', title: 'Heavy Duty Truck Spare Parts Supply', cpoAmount: '1,200,000 ETB', bank: 'CBE CPO', deadline: '2026-08-15', status: 'Under Review' },
    { id: 3, refNo: 'TND-2026-001', client: 'United Nations Fleet', title: 'Preventive Maintenance SLA 2026/27', cpoAmount: '300,000 ETB', bank: 'Dashen Bank CPO', deadline: '2026-07-30', status: 'Awarded' }
  ]);

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, customer: 'Dawit S.', rating: 5, category: 'Positive', comment: 'Fast diagnosis on suspension issues. Excellent service team.', date: '2026-08-09' },
    { id: 2, customer: 'Kebede A.', rating: 4, category: 'Positive', comment: 'Good quality workmanship, though wait time was slightly long.', date: '2026-08-07' },
    { id: 3, customer: 'Yonas M.', rating: 2, category: 'Critical', comment: 'Spare part delivery took 3 days extra. Needs faster turnaround.', date: '2026-08-02' }
  ]);

  // Forms Input State
  const [newSale, setNewSale] = useState({ customer: '', invoiceNo: '', amount: '', type: 'Cash', service: 'General Maintenance' });
  const [newReminder, setNewReminder] = useState({ plate: '', customer: '', vehicle: '', targetKm: '', dueDate: '', phone: '' });
  const [newTender, setNewTender] = useState({ refNo: '', client: '', title: '', cpoAmount: '', bank: '', deadline: '' });

  // Notifications Helper
  const triggerToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // --- HANDLERS ---
  const handleAddSale = (e) => {
    e.preventDefault();
    if (!newSale.customer || !newSale.amount) return;
    const record = {
      ...newSale,
      id: Date.now(),
      invoiceNo: newSale.invoiceNo || `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      amount: Number(newSale.amount),
      date: new Date().toISOString().split('T')[0],
      status: newSale.type === 'Cash' ? 'Completed' : 'Pending'
    };
    setSalesRecords([record, ...salesRecords]);
    setNewSale({ customer: '', invoiceNo: '', amount: '', type: 'Cash', service: 'General Maintenance' });
    setShowAddSaleModal(false);
    triggerToast('New sale record successfully created!');
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.plate || !newReminder.customer) return;
    const reminder = {
      ...newReminder,
      id: Date.now(),
      currentKm: 'N/A',
      status: 'Due Soon'
    };
    setServiceReminders([reminder, ...serviceReminders]);
    setNewReminder({ plate: '', customer: '', vehicle: '', targetKm: '', dueDate: '', phone: '' });
    setShowAddReminderModal(false);
    triggerToast('Service reminder scheduled successfully!');
  };

  const handleAddTender = (e) => {
    e.preventDefault();
    if (!newTender.title || !newTender.client) return;
    const tender = {
      ...newTender,
      id: Date.now(),
      refNo: newTender.refNo || `TND-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active Bid'
    };
    setTenders([tender, ...tenders]);
    setNewTender({ refNo: '', client: '', title: '', cpoAmount: '', bank: '', deadline: '' });
    setShowAddTenderModal(false);
    triggerToast('New Tender/CPO record registered!');
  };

  const handleSendReminderSMS = (plate, customer, phone) => {
    triggerToast(`Automated Service Alert sent to ${customer} (${plate}) via SMS/WhatsApp!`);
  };

  // --- COMPUTED METRICS ---
  const totalCashSales = useMemo(() => {
    return salesRecords.filter(s => s.type === 'Cash').reduce((acc, curr) => acc + curr.amount, 0);
  }, [salesRecords]);

  const totalCreditSales = useMemo(() => {
    return salesRecords.filter(s => s.type === 'Credit').reduce((acc, curr) => acc + curr.amount, 0);
  }, [salesRecords]);

  const totalMonthlySales = useMemo(() => {
    return totalCashSales + totalCreditSales;
  }, [totalCashSales, totalCreditSales]);

  // Global Search Filter
  const filteredSalesRecords = useMemo(() => {
    return salesRecords.filter(s => {
      const matchesType = salesFilter === 'all' || s.type.toLowerCase() === salesFilter;
      const matchesSearch = s.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.service.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [salesRecords, salesFilter, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* TOAST NOTIFICATION */}
      {notificationMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-green-500 text-slate-950 px-5 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-3 animate-bounce">
          <span>✅</span>
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* --- TOP BRANDED NAVIGATION HEADER --- */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center font-extrabold text-slate-950 text-xl shadow-lg shadow-green-900/30">
            GL
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">Greenlight Automotive Center</h1>
            <p className="text-xs text-green-400 font-semibold tracking-wider">Sales & Marketing Master Control Platform</p>
          </div>
        </div>

        {/* TOP MODULE NAV TABS */}
        <nav className="flex flex-wrap gap-1.5 my-3 lg:my-0 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'overview' ? 'bg-green-600 text-white shadow-md shadow-green-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('sales'); setSalesFilter('all'); }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'sales' ? 'bg-green-600 text-white shadow-md shadow-green-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            💰 Sales Module
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'marketing' ? 'bg-green-600 text-white shadow-md shadow-green-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            📢 Marketing
          </button>
          <button 
            onClick={() => setActiveTab('tenders')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'tenders' ? 'bg-green-600 text-white shadow-md shadow-green-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            📄 B2B & Tenders
          </button>
          <button 
            onClick={() => setActiveTab('reminders')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'reminders' ? 'bg-green-600 text-white shadow-md shadow-green-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            🚗 Service Reminders
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'reports' ? 'bg-green-600 text-white shadow-md shadow-green-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            📈 Executive Reports
          </button>
        </nav>

        {/* SEARCH ENGINE */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Plate #, Invoice, Client..." 
              className="w-full bg-slate-950 text-xs px-3.5 py-2 pl-8 rounded-lg border border-slate-800 focus:outline-none focus:border-green-500 text-slate-200 placeholder-slate-500"
            />
            <span className="absolute left-2.5 top-2 text-xs text-slate-500">🔍</span>
          </div>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1.5 rounded">Clear</button>
          )}
        </div>
      </header>

      {/* --- MAIN SYSTEM BODY --- */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-8">

        {/* ========================================================================= */}
        {/* TAB 1: MASTER DASHBOARD OVERVIEW                                          */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Executive Dashboard Overview</h2>
                <p className="text-xs text-slate-400">Real-time telemetry across revenue, credit limits, customer reputation, and service pipelines.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddSaleModal(true)}
                  className="bg-green-600 hover:bg-green-500 text-slate-950 text-xs px-4 py-2.5 rounded-xl font-extrabold transition shadow-lg shadow-green-900/30 flex items-center gap-1.5"
                >
                  ➕ Record New Sale
                </button>
                <button 
                  onClick={() => setShowAddReminderModal(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition border border-slate-700"
                >
                  🚙 Schedule Service
                </button>
              </div>
            </div>

            {/* SECTION 1: FINANCIAL METRICS CARDS */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Sales & Revenue Metrics
                </h3>
                <button onClick={() => { setActiveTab('sales'); setSalesFilter('all'); }} className="text-xs text-green-400 hover:underline font-semibold">
                  Open Sales Control Module →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Total Monthly Sales */}
                <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Combined Sales</span>
                      <p className="text-3xl font-black text-green-400 mt-2">{totalMonthlySales.toLocaleString()} ETB</p>
                      <p className="text-[11px] text-slate-500 mt-1">Calculated from all ledger postings</p>
                    </div>
                    <span className="p-3 bg-green-950 border border-green-800 text-green-400 rounded-xl text-xl">💰</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Total Entries: {salesRecords.length}</span>
                    <button onClick={() => setShowAddSaleModal(true)} className="text-xs font-bold text-green-400 hover:text-green-300">+ Add Entry</button>
                  </div>
                </div>

                {/* Total Cash Sales */}
                <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Cash Receipts</span>
                      <p className="text-3xl font-black text-white mt-2">{totalCashSales.toLocaleString()} ETB</p>
                      <p className="text-[11px] text-slate-500 mt-1">Direct completed settlement</p>
                    </div>
                    <span className="p-3 bg-slate-800 text-slate-300 rounded-xl text-xl">💵</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Cash Flow Ratio: {((totalCashSales / (totalMonthlySales || 1)) * 100).toFixed(1)}%</span>
                    <button onClick={() => { setActiveTab('sales'); setSalesFilter('cash'); }} className="text-xs font-bold text-slate-300 hover:text-white">View Cash</button>
                  </div>
                </div>

                {/* Total Credit Sales */}
                <div className="bg-slate-900/90 border border-slate-800 border-l-4 border-l-red-500 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outstanding Credit Ledger</span>
                      <p className="text-3xl font-black text-red-400 mt-2">{totalCreditSales.toLocaleString()} ETB</p>
                      <p className="text-[11px] text-slate-500 mt-1">Pending B2B & corporate invoices</p>
                    </div>
                    <span className="p-3 bg-red-950 border border-red-900 text-red-400 rounded-xl text-xl">⚠️</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center">
                    <span className="text-xs text-red-400 font-semibold">Requires Collection Follow-up</span>
                    <button onClick={() => { setActiveTab('sales'); setSalesFilter('credit'); }} className="text-xs font-bold text-red-400 hover:underline">Manage Credit</button>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 2: CUSTOMER REPUTATION & TENDERS SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Customer Feedback Metrics */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">👥 Customer Reputation</h3>
                  <button onClick={() => setActiveTab('marketing')} className="text-xs text-green-400 hover:underline">Marketing Center →</button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Clients</span>
                    <span className="text-xl font-black text-white mt-1 block">872</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-green-400 uppercase font-bold block">Positive</span>
                    <span className="text-xl font-black text-green-400 mt-1 block">49</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">Critical</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">1</span>
                  </div>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="font-bold text-slate-300">Latest Review snippet:</p>
                  <p className="text-slate-400 italic">"{feedbacks[0].comment}"</p>
                  <span className="text-[10px] text-green-400 font-semibold block">— {feedbacks[0].customer} ({feedbacks[0].rating} ★)</span>
                </div>
              </div>

              {/* Active Contracts & Tenders */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 lg:col-span-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">📄 Active B2B Tenders & Guarantees</h3>
                  <button onClick={() => setActiveTab('tenders')} className="text-xs text-green-400 hover:underline">View All Tenders →</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tenders.map((t) => (
                    <div key={t.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-slate-500">{t.refNo}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.status === 'Awarded' ? 'bg-green-950 text-green-400' : 'bg-blue-950 text-blue-400'}`}>{t.status}</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1">{t.title}</p>
                      <p className="text-[11px] text-slate-400">{t.client}</p>
                      <p className="text-xs font-bold text-green-400 pt-1 border-t border-slate-900">CPO: {t.cpoAmount}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* SECTION 3: SERVICE REMINDERS SMART TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">🚙 Upcoming Vehicle Service Reminders</h3>
                  <p className="text-xs text-slate-400">Automated odometer tracking & maintenance triggers for individual and fleet vehicles.</p>
                </div>
                <button 
                  onClick={() => setShowAddReminderModal(true)}
                  className="bg-green-600 hover:bg-green-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md transition"
                >
                  + Add Reminder
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Plate Number</th>
                      <th className="p-3">Customer / Organization</th>
                      <th className="p-3">Vehicle Model</th>
                      <th className="p-3">Target Odometer</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {serviceReminders.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-mono font-bold text-white">{r.plate}</td>
                        <td className="p-3 font-semibold text-slate-200">{r.customer}</td>
                        <td className="p-3 text-slate-400">{r.vehicle}</td>
                        <td className="p-3 font-semibold text-green-400">{r.targetKm}</td>
                        <td className="p-3 text-slate-300">{r.dueDate}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${r.status === 'Overdue' ? 'bg-red-950/80 text-red-400 border border-red-800' : 'bg-amber-950/80 text-amber-400 border border-amber-800'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => handleSendReminderSMS(r.plate, r.customer, r.phone)}
                            className="bg-green-950 hover:bg-green-900 text-green-400 border border-green-800 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ml-auto"
                          >
                            📱 Dispatch Alert
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SALES MODULE & CREDIT MANAGEMENT                                  */}
        {/* ========================================================================= */}
        {activeTab === 'sales' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">💰 Sales Ledger & Credit Control</h2>
                <p className="text-xs text-slate-400">Track all cash transactions, credit balances, and generate invoice records.</p>
              </div>
              <button 
                onClick={() => setShowAddSaleModal(true)}
                className="bg-green-600 hover:bg-green-500 text-slate-950 text-xs px-4 py-2.5 rounded-xl font-extrabold transition shadow-lg shadow-green-900/30"
              >
                ➕ Record New Sale
              </button>
            </div>

            {/* Filter Tabs & Summary Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold mr-2">Filter Ledger:</span>
                <button 
                  onClick={() => setSalesFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${salesFilter === 'all' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  All Transactions ({salesRecords.length})
                </button>
                <button 
                  onClick={() => setSalesFilter('cash')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${salesFilter === 'cash' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  Cash Only
                </button>
                <button 
                  onClick={() => setSalesFilter('credit')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${salesFilter === 'credit' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  Credit Ledgers
                </button>
              </div>

              <div className="text-xs font-bold text-slate-300">
                Filtered Total: <span className="text-green-400 font-extrabold">{filteredSalesRecords.reduce((a,b) => a + b.amount, 0).toLocaleString()} ETB</span>
              </div>
            </div>

            {/* Sales Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Customer / Organization</th>
                      <th className="p-3">Service / Repair Scope</th>
                      <th className="p-3">Payment Type</th>
                      <th className="p-3">Amount (ETB)</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredSalesRecords.length > 0 ? (
                      filteredSalesRecords.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-3 font-mono font-bold text-slate-400">{s.invoiceNo}</td>
                          <td className="p-3 font-bold text-white">{s.customer}</td>
                          <td className="p-3 text-slate-300">{s.service}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.type === 'Cash' ? 'bg-slate-800 text-slate-300' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                              {s.type}
                            </span>
                          </td>
                          <td className="p-3 font-black text-green-400 text-sm">{s.amount.toLocaleString()} ETB</td>
                          <td className="p-3 text-slate-400">{s.date}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${s.status === 'Completed' ? 'bg-green-950 text-green-400' : 'bg-amber-950 text-amber-400'}`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-slate-500 italic">No transaction records match your filter criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MARKETING MODULE                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'marketing' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black text-white">📢 Marketing & Digital Reach Control</h2>
              <p className="text-xs text-slate-400">Monitor brand performance across social channels, campaigns, and customer feedback metrics.</p>
            </div>

            {/* Social Reach Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">🎵</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">TikTok Audience</span>
                <p className="text-4xl font-black text-white">100,000+</p>
                <p className="text-[11px] text-green-400 font-semibold">+12% growth this month</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">✈️</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Telegram Community</span>
                <p className="text-4xl font-black text-blue-400">2,000+</p>
                <p className="text-[11px] text-slate-400">Active subscriber broadcast</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">📘</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Facebook Page Likes</span>
                <p className="text-4xl font-black text-indigo-400">10,000+</p>
                <p className="text-[11px] text-slate-400">Corporate engagement rate 8.4%</p>
              </div>
            </div>

            {/* Feedback & Ratings Log */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">💬 Customer Reviews & Feedback Logs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feedbacks.map((fb) => (
                  <div key={fb.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs">{fb.customer}</span>
                      <span className="text-xs font-bold text-amber-400">{'★'.repeat(fb.rating)}</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{fb.comment}"</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                      <span>{fb.date}</span>
                      <span className={fb.category === 'Positive' ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>{fb.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: B2B & TENDERS MODULE                                              */}
        {/* ========================================================================= */}
        {activeTab === 'tenders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white">📄 B2B Contracts, Tenders & CPO Guarantees</h2>
                <p className="text-xs text-slate-400">Manage corporate tenders, bid security bonds (CPO), and bank guarantees.</p>
              </div>
              <button 
                onClick={() => setShowAddTenderModal(true)}
                className="bg-green-600 hover:bg-green-500 text-slate-950 text-xs px-4 py-2.5 rounded-xl font-extrabold transition"
              >
                ➕ Register Tender / CPO
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Ref Code</th>
                    <th className="p-3">Procuring Organization</th>
                    <th className="p-3">Tender Title</th>
                    <th className="p-3">CPO Amount</th>
                    <th className="p-3">Issuing Bank</th>
                    <th className="p-3">Deadline</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tenders.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-mono font-bold text-slate-400">{t.refNo}</td>
                      <td className="p-3 font-bold text-white">{t.client}</td>
                      <td className="p-3 text-slate-200">{t.title}</td>
                      <td className="p-3 font-bold text-green-400">{t.cpoAmount}</td>
                      <td className="p-3 text-slate-400">{t.bank}</td>
                      <td className="p-3 text-slate-300">{t.deadline}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${t.status === 'Awarded' ? 'bg-green-950 text-green-400' : 'bg-blue-950 text-blue-400'}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SERVICE REMINDERS DEDICATED MODULE                                 */}
        {/* ========================================================================= */}
        {activeTab === 'reminders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white">🚗 Odometer & Service Reminders Engine</h2>
                <p className="text-xs text-slate-400">Automated service tracking to ensure recurring customer retention.</p>
              </div>
              <button 
                onClick={() => setShowAddReminderModal(true)}
                className="bg-green-600 hover:bg-green-500 text-slate-950 text-xs px-4 py-2.5 rounded-xl font-extrabold transition"
              >
                + Add Service Vehicle
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Plate Number</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Vehicle Details</th>
                      <th className="p-3">Phone Contact</th>
                      <th className="p-3">Target Service KM</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {serviceReminders.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-mono font-bold text-white">{r.plate}</td>
                        <td className="p-3 font-semibold text-slate-200">{r.customer}</td>
                        <td className="p-3 text-slate-400">{r.vehicle}</td>
                        <td className="p-3 text-slate-300">{r.phone}</td>
                        <td className="p-3 font-bold text-green-400">{r.targetKm}</td>
                        <td className="p-3 text-slate-300">{r.dueDate}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${r.status === 'Overdue' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => handleSendReminderSMS(r.plate, r.customer, r.phone)}
                            className="bg-green-600 hover:bg-green-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition"
                          >
                            Send SMS Alert
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: EXECUTIVE REPORTS & ANALYTICS                                      */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-black text-white">📈 Executive Analytics & Reporting Engine</h2>
              <p className="text-xs text-slate-400">Generate executive financial digests, credit risk assessments, and marketing ROI summaries.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Greenlight Automotive Executive Monthly Summary</h3>
                <p className="text-xs text-slate-400 mt-1">Includes Cash vs Credit ratios, active CPO exposure, and upcoming service conversions.</p>
              </div>
              <button 
                onClick={() => triggerToast('Executive Monthly Report generated and saved to your Downloads!')}
                className="bg-green-600 hover:bg-green-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-green-900/30"
              >
                📥 Export PDF Summary
              </button>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Revenue Composition</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Cash Collections</span>
                    <span className="font-bold text-green-400">{totalCashSales.toLocaleString()} ETB</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${(totalCashSales / (totalMonthlySales || 1)) * 100}%` }}></div>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Credit Invoices</span>
                    <span className="font-bold text-red-400">{totalCreditSales.toLocaleString()} ETB</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${(totalCreditSales / (totalMonthlySales || 1)) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Service Pipeline Efficiency</h4>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-slate-300">Service Reminders Converted</span>
                  <span className="font-bold text-white">84%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Average Job Card Value</span>
                  <span className="font-bold text-white">185,000 ETB</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- MODAL DIALOGS --- */}

      {/* 1. RECORD SALE MODAL */}
      {showAddSaleModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">➕ Record New Transaction</h3>
              <button onClick={() => setShowAddSaleModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Customer / Organization Name</label>
                <input 
                  type="text" required value={newSale.customer} onChange={(e) => setNewSale({ ...newSale, customer: e.target.value })}
                  placeholder="e.g. Ethiopian Airlines Fleet" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Amount (ETB)</label>
                  <input 
                    type="number" required value={newSale.amount} onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
                    placeholder="e.g. 250000" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Payment Type</label>
                  <select value={newSale.type} onChange={(e) => setNewSale({ ...newSale, type: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option value="Cash">Cash Transaction</option>
                    <option value="Credit">Credit Ledger</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Service Category / Scope</label>
                <input 
                  type="text" value={newSale.service} onChange={(e) => setNewSale({ ...newSale, service: e.target.value })}
                  placeholder="e.g. Engine Overhaul & Diagnostic" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 text-slate-950 font-extrabold p-2.5 rounded-xl text-xs">Save Transaction</button>
                <button type="button" onClick={() => setShowAddSaleModal(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl text-xs">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. SCHEDULE SERVICE REMINDER MODAL */}
      {showAddReminderModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">🚙 Register Vehicle Service Reminder</h3>
              <button onClick={() => setShowAddReminderModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            <form onSubmit={handleAddReminder} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Plate Number</label>
                  <input type="text" required value={newReminder.plate} onChange={(e) => setNewReminder({ ...newReminder, plate: e.target.value })} placeholder="3-A9988" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Customer / Owner</label>
                  <input type="text" required value={newReminder.customer} onChange={(e) => setNewReminder({ ...newReminder, customer: e.target.value })} placeholder="Client Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Target Odometer (KM)</label>
                  <input type="text" value={newReminder.targetKm} onChange={(e) => setNewReminder({ ...newReminder, targetKm: e.target.value })} placeholder="75,000 km" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Due Date</label>
                  <input type="date" value={newReminder.dueDate} onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Phone Number for Alerts</label>
                <input type="text" value={newReminder.phone} onChange={(e) => setNewReminder({ ...newReminder, phone: e.target.value })} placeholder="+2519..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 text-slate-950 font-extrabold p-2.5 rounded-xl text-xs">Save Reminder</button>
                <button type="button" onClick={() => setShowAddReminderModal(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl text-xs">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. TENDER & CPO MODAL */}
      {showAddTenderModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">📄 Register B2B Tender / CPO Guarantee</h3>
              <button onClick={() => setShowAddTenderModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>
            <form onSubmit={handleAddTender} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Procuring Client / Ministry</label>
                <input type="text" required value={newTender.client} onChange={(e) => setNewTender({ ...newTender, client: e.target.value })} placeholder="e.g. Ministry of Innovation" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Tender Title</label>
                <input type="text" required value={newTender.title} onChange={(e) => setNewTender({ ...newTender, title: e.target.value })} placeholder="Fleet Repair Service Contract" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">CPO Amount (ETB)</label>
                  <input type="text" value={newTender.cpoAmount} onChange={(e) => setNewTender({ ...newTender, cpoAmount: e.target.value })} placeholder="500,000 ETB" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Issuing Bank</label>
                  <input type="text" value={newTender.bank} onChange={(e) => setNewTender({ ...newTender, bank: e.target.value })} placeholder="CBE / Awash" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 text-slate-950 font-extrabold p-2.5 rounded-xl text-xs">Save Tender Record</button>
                <button type="button" onClick={() => setShowAddTenderModal(false)} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl text-xs">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SYSTEM FOOTER --- */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4 text-center text-slate-500 text-xs">
        Greenlight Automotive Center © 2026 Enterprise Control System — Integrated Sales & Marketing Intelligence
      </footer>

    </div>
  );
}
