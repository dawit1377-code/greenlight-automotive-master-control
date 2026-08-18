import React, { useState } from 'react';

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
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});

  // Calculations
  const totalGross = sales.reduce((a, c) => a + c.amount, 0);
  const cashCollected = sales.filter(s => s.type === 'Cash').reduce((a, c) => a + c.amount, 0);
  const creditOutstanding = sales.filter(s => s.type === 'Credit').reduce((a, c) => a + c.amount, 0);

  // Search Filter
  const filterByQuery = (item, keys) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return keys.some(k => item[k]?.toString().toLowerCase().includes(q));
  };

  // Form Submission
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
    <div className="app-container">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <h1 className="brand-title">GREEN LIGHT</h1>
            <p className="brand-subtitle">Automotive Center</p>
          </div>

          <div className="tagline-banner">
            "A Better Way To Go"
          </div>

          <nav className="nav-menu">
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
                className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && <span>●</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <span>v2.6 Enterprise</span>
          <span className="status-badge">READY TO USE</span>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <main className="main-wrapper">
        
        {/* TOP NAVBAR */}
        <header className="top-navbar">
          <input 
            type="text"
            placeholder="Live Search Across All Data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div>
            <button onClick={() => window.print()} className="btn-secondary">
              🖨️ Print / PDF Report
            </button>
            <button 
              onClick={() => setModalType(activeTab === 'tenders' ? 'tender' : activeTab === 'service' ? 'service' : 'sale')}
              className="btn-primary"
            >
              + Record Entry
            </button>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <div className="content-area">
          
          {/* KPI METRICS */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">Total Gross Revenue</div>
              <div className="kpi-value">{totalGross.toLocaleString()} ETB</div>
              <div className="kpi-subtext">Direct & Receivables Combined</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-label">Cash Settled</div>
              <div className="kpi-value green">{cashCollected.toLocaleString()} ETB</div>
              <div className="kpi-subtext">Immediate Payments</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-label">Outstanding Credit</div>
              <div className="kpi-value amber">{creditOutstanding.toLocaleString()} ETB</div>
              <div className="kpi-subtext">Pending Invoices</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-label">Active B2B Tenders</div>
              <div className="kpi-value">{tenders.length} Active Bids</div>
              <div className="kpi-subtext">Commercial Contracts</div>
            </div>
          </div>

          {/* MODULE: SALES LEDGER */}
          {(activeTab === 'dashboard' || activeTab === 'sales' || activeTab === 'reports') && (
            <div className="panel-card">
              <div className="panel-header">
                <h3 className="panel-title">Sales & Corporate Credit Ledger</h3>
                <button onClick={() => exportToCSV(sales, 'GLAC_Sales')} className="btn-secondary" style={{padding: '4px 10px', fontSize: '11px'}}>📥 Export CSV</button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Client / Company</th>
                      <th>Scope of Work</th>
                      <th>Type</th>
                      <th>Amount (ETB)</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.filter(s => filterByQuery(s, ['id', 'client', 'scope', 'type'])).map(row => (
                      <tr key={row.id}>
                        <td style={{fontFamily: 'monospace', fontWeight: 'bold', color: '#10b981'}}>{row.id}</td>
                        <td style={{fontWeight: '700'}}>{row.client}</td>
                        <td>{row.scope}</td>
                        <td>
                          <span className={`badge ${row.type === 'Cash' ? 'badge-cash' : 'badge-credit'}`}>
                            {row.type}
                          </span>
                        </td>
                        <td style={{fontWeight: '800'}}>{row.amount.toLocaleString()} ETB</td>
                        <td>{row.date}</td>
                        <td><span className="badge badge-status">{row.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: B2B TENDERS */}
          {(activeTab === 'tenders' || activeTab === 'reports') && (
            <div className="panel-card">
              <div className="panel-header">
                <h3 className="panel-title">B2B & Fleet Service Tenders</h3>
                <button onClick={() => exportToCSV(tenders, 'GLAC_Tenders')} className="btn-secondary" style={{padding: '4px 10px', fontSize: '11px'}}>📥 Export CSV</button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Tender ID</th>
                      <th>Target Enterprise</th>
                      <th>Contract Scope</th>
                      <th>Value (ETB)</th>
                      <th>Deadline</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenders.filter(t => filterByQuery(t, ['id', 'client', 'scope', 'status'])).map(row => (
                      <tr key={row.id}>
                        <td style={{fontFamily: 'monospace', fontWeight: 'bold'}}>{row.id}</td>
                        <td style={{fontWeight: '700'}}>{row.client}</td>
                        <td>{row.scope}</td>
                        <td style={{fontWeight: '800', color: '#10b981'}}>{row.budget.toLocaleString()} ETB</td>
                        <td>{row.deadline}</td>
                        <td><span className="badge badge-status">{row.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: SERVICE LOGS */}
          {(activeTab === 'service' || activeTab === 'reports') && (
            <div className="panel-card">
              <div className="panel-header">
                <h3 className="panel-title">Vehicle Maintenance & Service Logs</h3>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Plate #</th>
                      <th>Vehicle Model</th>
                      <th>Owner / Enterprise</th>
                      <th>Service Details</th>
                      <th>Last Service</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.filter(s => filterByQuery(s, ['plate', 'model', 'owner', 'service'])).map((row, idx) => (
                      <tr key={idx}>
                        <td style={{fontFamily: 'monospace', fontWeight: 'bold'}}>{row.plate}</td>
                        <td>{row.model}</td>
                        <td>{row.owner}</td>
                        <td>{row.service}</td>
                        <td>{row.lastService}</td>
                        <td><span className="badge badge-status">{row.status}</span></td>
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
      {modalType && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 style={{fontSize: '14px', fontWeight: '800', textTransform: 'uppercase'}}>
                {modalType === 'sale' ? 'Record New Transaction' : modalType === 'tender' ? 'Add B2B Tender' : 'Log Vehicle Service'}
              </h3>
              <button onClick={() => setModalType(null)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px'}}>✕</button>
            </div>

            <form onSubmit={handleSaveEntry}>
              {modalType === 'sale' && (
                <>
                  <div className="form-group">
                    <label>Client / Company Name</label>
                    <input type="text" required placeholder="e.g. Commercial Bank Fleet" onChange={e => setFormData({...formData, client: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Scope of Work</label>
                    <input type="text" placeholder="e.g. Engine Overhaul" onChange={e => setFormData({...formData, scope: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Payment Type</label>
                    <select onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Cash">Cash Receipt</option>
                      <option value="Credit">Credit Invoice</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Amount (ETB)</label>
                    <input type="number" required placeholder="150000" onChange={e => setFormData({...formData, amount: e.target.value})} />
                  </div>
                </>
              )}

              {modalType === 'tender' && (
                <>
                  <div className="form-group">
                    <label>Target Company</label>
                    <input type="text" required placeholder="e.g. Heineken Ethiopia" onChange={e => setFormData({...formData, client: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Tender Scope</label>
                    <input type="text" placeholder="e.g. Annual Fleet Maintenance" onChange={e => setFormData({...formData, scope: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Estimated Value (ETB)</label>
                    <input type="number" required placeholder="5000000" onChange={e => setFormData({...formData, budget: e.target.value})} />
                  </div>
                </>
              )}

              {modalType === 'service' && (
                <>
                  <div className="form-group">
                    <label>Plate Number</label>
                    <input type="text" required placeholder="AA-2-12345" onChange={e => setFormData({...formData, plate: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Vehicle Model & Owner</label>
                    <input type="text" placeholder="Toyota Hilux - Enterprise Client" onChange={e => setFormData({...formData, owner: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Service Details</label>
                    <input type="text" placeholder="Full Synthetic Oil & Filter Service" onChange={e => setFormData({...formData, service: e.target.value})} />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="button" onClick={() => setModalType(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
