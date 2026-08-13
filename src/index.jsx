import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  // Navigation & Active View State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sales' | 'marketing' | 'reminders'
  const [subSection, setSubSection] = useState('all'); // 'cash' | 'credit' | 'feedback'
  
  // Data State
  const [salesRecords, setSalesRecords] = useState([
    { id: 1, type: 'Cash', customer: 'Abebe T.', amount: 150000, date: '2026-08-10', status: 'Completed' },
    { id: 2, type: 'Credit', customer: 'Commercial Bank Fleet', amount: 8574291, date: '2026-08-01', status: 'Pending' },
  ]);

  const [serviceReminders, setServiceReminders] = useState([
    { id: 1, plate: '3-A1234', customer: 'Mulugeta T.', targetKm: '65,000 km', dueDate: '2026-08-18', status: 'Due Soon' },
    { id: 2, plate: '3-B9876', customer: 'Commercial Bank Fleet', targetKm: '120,000 km', dueDate: '2026-08-15', status: 'Overdue' },
  ]);

  // New Data Entry Forms State
  const [newSale, setNewSale] = useState({ customer: '', amount: '', type: 'Cash' });
  const [newReminder, setNewReminder] = useState({ plate: '', customer: '', targetKm: '', dueDate: '' });

  // Form Handlers
  const handleAddSale = (e) => {
    e.preventDefault();
    if (!newSale.customer || !newSale.amount) return;
    setSalesRecords([...salesRecords, { ...newSale, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'Completed' }]);
    setNewSale({ customer: '', amount: '', type: 'Cash' });
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.plate || !newReminder.customer) return;
    setServiceReminders([...serviceReminders, { ...newReminder, id: Date.now(), status: 'Due Soon' }]);
    setNewReminder({ plate: '', customer: '', targetKm: '', dueDate: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* --- TOP HEADER NAVIGATION BAR --- */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">Greenlight Automotive Center</h1>
          <p className="text-xs text-green-400 font-medium">Sales & Marketing Master Control Platform</p>
        </div>

        {/* SMART ACTION NAVIGATION BUTTONS */}
        <div className="flex gap-2 my-2 sm:my-0">
          <button 
            onClick={() => { setActiveTab('overview'); setSubSection('all'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === 'overview' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            🏠 Dashboard Overview
          </button>
          <button 
            onClick={() => { setActiveTab('sales'); setSubSection('all'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === 'sales' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            💰 Sales Module
          </button>
          <button 
            onClick={() => { setActiveTab('marketing'); setSubSection('all'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === 'marketing' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            📢 Marketing Module
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Search Plate #, VIN, Invoice..." 
            className="bg-slate-800 text-sm px-3 py-2 rounded border border-slate-700 focus:outline-none focus:border-green-500 w-64"
          />
          <button className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm font-bold">Search</button>
        </div>
      </header>

      {/* --- MAIN CONTENT SWITCHER --- */}
      <main className="p-6 max-w-7xl mx-auto">
        
        {/* VIEW 1: MASTER DASHBOARD OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-green-400 border-b border-slate-800 pb-2">Sales & Marketing Master Control Center</h2>

            {/* SECTION 1: SALES METRICS & SMART ACTION BUTTONS */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">💰 Sales Metrics</h3>
                <button 
                  onClick={() => setActiveTab('sales')}
                  className="text-xs text-green-400 hover:underline font-semibold"
                >
                  View All Sales Data →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* SMART CARD: THIS MONTH TOTAL SALES */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex justify-between items-start hover:border-slate-700 transition">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">This Month Total Sales</span>
                    <p className="text-2xl font-bold text-green-400 mt-2">245,651 ETB</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('sales'); setSubSection('all'); }}
                    className="bg-green-950 text-green-400 border border-green-800 text-xs px-3 py-1.5 rounded-lg hover:bg-green-900 font-semibold"
                  >
                    + Enter Data
                  </button>
                </div>

                {/* SMART CARD: TOTAL CASH SALES */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex justify-between items-start hover:border-slate-700 transition">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Cash Sales</span>
                    <p className="text-2xl font-bold text-white mt-2">2,856,472 ETB</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('sales'); setSubSection('cash'); }}
                    className="bg-slate-800 text-slate-300 border border-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-700 font-semibold"
                  >
                    View Details
                  </button>
                </div>

                {/* SMART CARD: TOTAL CREDIT SALES */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl border-l-4 border-l-red-500 flex justify-between items-start hover:border-slate-700 transition">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Credit Sales</span>
                    <p className="text-2xl font-bold text-red-400 mt-2">8,574,291 ETB</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('sales'); setSubSection('credit'); }}
                    className="bg-red-950 text-red-400 border border-red-800 text-xs px-3 py-1.5 rounded-lg hover:bg-red-900 font-semibold"
                  >
                    Manage Credit
                  </button>
                </div>

              </div>
            </div>

            {/* SECTION 2: CUSTOMER & REPUTATION */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">👥 Customer & Reputation</h3>
                <button 
                  onClick={() => setActiveTab('marketing')}
                  className="text-xs text-green-400 hover:underline font-semibold"
                >
                  Manage Marketing →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Total No. of Customers</span>
                  <p className="text-3xl font-bold text-white mt-2">872</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl border-l-4 border-l-amber-500">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Critical Customer Feedback</span>
                  <p className="text-3xl font-bold text-amber-400 mt-2">0</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Positive Feedbacks</span>
                  <p className="text-3xl font-bold text-green-400 mt-2">49</p>
                </div>
              </div>
            </div>

            {/* SECTION 3: UPCOMING SERVICE REMINDERS SMART TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-300">🚙 Upcoming Vehicle Service Reminders</h3>
                <button 
                  onClick={() => { setActiveTab('reminders'); }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold"
                >
                  + Add New Reminder
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="p-3">Plate Number</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Target Km</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {serviceReminders.map((reminder) => (
                      <tr key={reminder.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-semibold text-white">{reminder.plate}</td>
                        <td className="p-3">{reminder.customer}</td>
                        <td className="p-3">{reminder.targetKm}</td>
                        <td className="p-3">{reminder.dueDate}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${reminder.status === 'Overdue' ? 'bg-red-900/50 text-red-400' : 'bg-amber-900/50 text-amber-400'}`}>
                            {reminder.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button className="bg-green-700 hover:bg-green-600 text-white px-2.5 py-1 rounded text-xs font-semibold">
                            📱 Send Reminder
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

        {/* VIEW 2: DEDICATED SALES MODULE & DATA ENTRY */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-400">💰 Sales Module & Data Management</h2>
              <button 
                onClick={() => setActiveTab('overview')}
                className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1.5 rounded"
              >
                ← Back to Overview
              </button>
            </div>

            {/* DATA ENTRY FORM */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Enter New Transaction Data</h3>
              <form onSubmit={handleAddSale} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Customer Name / Organization</label>
                  <input 
                    type="text" 
                    value={newSale.customer} 
                    onChange={(e) => setNewSale({ ...newSale, customer: e.target.value })}
                    placeholder="e.g. Mulugeta T." 
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Amount (ETB)</label>
                  <input 
                    type="number" 
                    value={newSale.amount} 
                    onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
                    placeholder="e.g. 150000" 
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Payment Type</label>
                  <select 
                    value={newSale.type} 
                    onChange={(e) => setNewSale({ ...newSale, type: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white"
                  >
                    <option value="Cash">Cash Transaction</option>
                    <option value="Credit">Credit Transaction</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold p-2 rounded">
                    + Record Sale
                  </button>
                </div>
              </form>
            </div>

            {/* SALES RECORDS TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sales Records History</h3>
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Amount (ETB)</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {salesRecords
                    .filter(s => subSection === 'all' || s.type.toLowerCase() === subSection)
                    .map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-mono text-slate-500">#{sale.id}</td>
                      <td className="p-3 font-semibold text-white">{sale.customer}</td>
                      <td className="p-3">{sale.type}</td>
                      <td className="p-3 font-bold text-green-400">{Number(sale.amount).toLocaleString()} ETB</td>
                      <td className="p-3">{sale.date}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${sale.status === 'Completed' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* VIEW 3: MARKETING MODULE */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-400">📢 Marketing & Social Reach Control</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
                <span className="text-slate-400 text-sm">TikTok Followers</span>
                <p className="text-4xl font-extrabold text-white mt-2">100K</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
                <span className="text-slate-400 text-sm">Telegram Subscribers</span>
                <p className="text-4xl font-extrabold text-blue-400 mt-2">2K</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
                <span className="text-slate-400 text-sm">Facebook Followers</span>
                <p className="text-4xl font-extrabold text-indigo-400 mt-2">10K</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: ADD SERVICE REMINDER FORM */}
        {activeTab === 'reminders' && (
          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-green-400">🚗 Add Vehicle Service Reminder</h2>
            <form onSubmit={handleAddReminder} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Plate Number</label>
                <input 
                  type="text" 
                  value={newReminder.plate}
                  onChange={(e) => setNewReminder({ ...newReminder, plate: e.target.value })}
                  placeholder="3-A1234" 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  value={newReminder.customer}
                  onChange={(e) => setNewReminder({ ...newReminder, customer: e.target.value })}
                  placeholder="Mulugeta T." 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Target Km</label>
                <input 
                  type="text" 
                  value={newReminder.targetKm}
                  onChange={(e) => setNewReminder({ ...newReminder, targetKm: e.target.value })}
                  placeholder="65,000 km" 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 text-white p-2 rounded font-semibold">
                  Save Reminder
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('overview')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

// MOUNT TO ROOT
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
