import React, { useState } from 'react';

export default function ReportGenerator() {
  const [reportType, setReportType] = useState('executive_summary');
  const [dateRange, setDateRange] = useState('this_month');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrintReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print(); // Triggers print/save as PDF with custom print stylesheet
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div style={styles.container}>
      {/* 1. Control Panel (Hidden during PDF print) */}
      <div className="no-print" style={styles.controlPanel}>
        <h2 style={styles.title}>📊 Executive Report Generator</h2>
        <p style={styles.subtitle}>Generate branded PDF reports for management decision-making.</p>
        
        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Select Report Focus:</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={styles.select}>
              <option value="executive_summary">Executive Master Summary</option>
              <option value="sales_credit">Sales & Debt Aging Analysis</option>
              <option value="tenders_cpo">Tender Win/Loss & CPO Exposure</option>
              <option value="service_retention">Vehicle Service Retention & Reminders</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Time Frame:</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={styles.select}>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="this_quarter">This Quarter</option>
              <option value="this_year">This Year</option>
            </select>
          </div>

          <button onClick={handlePrintReport} style={styles.generateBtn} disabled={isGenerating}>
            {isGenerating ? 'Preparing Report...' : '📄 Download / Print PDF Report'}
          </button>
        </div>
      </div>

      {/* 2. Formal Printable Report Template */}
      <div id="printable-report" style={styles.reportSheet}>
        {/* Official Header */}
        <div style={styles.reportHeader}>
          <div style={styles.brandBox}>
            <img src="/assets/gac-logo.png" alt="GLAC Logo" style={styles.logo} />
            <div>
              <h1 style={styles.companyName}>GREENLIGHT AUTOMOTIVE CENTER</h1>
              <p style={styles.companySub}>Sales & Marketing Department | Addis Ababa, Ethiopia</p>
            </div>
          </div>
          <div style={styles.metaBox}>
            <p style={styles.metaText}><strong>Report Date:</strong> {new Date().toLocaleDateString()}</p>
            <p style={styles.metaText}><strong>Period:</strong> {dateRange.replace('_', ' ').toUpperCase()}</p>
            <p style={styles.metaText}><strong>Doc Ref:</strong> GLAC-RPT-{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>
        </div>

        <hr style={styles.divider} />

        <h2 style={styles.reportTitle}>
          {reportType === 'executive_summary' && 'Executive Performance & Financial Summary'}
          {reportType === 'sales_credit' && 'Sales Breakdown & Credit Debt Aging Report'}
          {reportType === 'tenders_cpo' && 'Tender Win/Loss Analytics & Bank Guarantee (CPO) Risk'}
          {reportType === 'service_retention' && 'Vehicle Maintenance Retention & Service Logs'}
        </h2>

        {/* Executive Summary Section */}
        <table style={styles.summaryTable}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>KPI Metric</th>
              <th>Recorded Value (ETB / Count)</th>
              <th>Status / Variance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Cash Sales</td>
              <td><strong>2,856,472 ETB</strong></td>
              <td style={{ color: 'green' }}>● On Target</td>
            </tr>
            <tr>
              <td>Total Credit Sales</td>
              <td><strong>8,574,291 ETB</strong></td>
              <td style={{ color: 'orange' }}>● Requires Collection</td>
            </tr>
            <tr>
              <td>Active Contracts & Tenders</td>
              <td><strong>4 Contracts | 3 Active Tenders</strong></td>
              <td style={{ color: 'blue' }}>● Pending Decision</td>
            </tr>
            <tr>
              <td>Active CPO Guarantees Lock-up</td>
              <td><strong>350,000 ETB</strong></td>
              <td style={{ color: 'green' }}>● All Active</td>
            </tr>
          </tbody>
        </table>

        {/* Official Sign-off Block for Higher Management */}
        <div style={styles.signatureBlock}>
          <div style={styles.sigLine}>
            <p style={styles.sigTitle}>Prepared By (Sales & Marketing Manager)</p>
            <p style={styles.sigSub}>Signature: ______________________</p>
          </div>
          <div style={styles.sigLine}>
            <p style={styles.sigTitle}>Approved By (General Manager)</p>
            <p style={styles.sigSub}>Signature: ______________________</p>
          </div>
        </div>
      </div>

      {/* Embedded CSS for Print Styling */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background-color: #FFFFFF !important; color: #000000 !important; }
          #printable-report { border: none !important; box-shadow: none !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: { padding: '20px', color: '#FFF' },
  controlPanel: { backgroundColor: '#1E293B', padding: '20px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #334155' },
  title: { margin: 0, fontSize: '20px', color: '#16A34A' },
  subtitle: { margin: '5px 0 15px 0', fontSize: '13px', color: '#94A3B8' },
  filterRow: { display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '12px', color: '#CBD5E1' },
  select: { padding: '8px 12px', borderRadius: '4px', backgroundColor: '#334155', color: '#FFF', border: 'none' },
  generateBtn: { backgroundColor: '#16A34A', color: '#FFF', padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' },
  
  // Print Template Styling (Clean light theme for paper/PDF export)
  reportSheet: { backgroundColor: '#FFFFFF', color: '#000000', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.3)', fontFamily: 'Arial, sans-serif' },
  reportHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brandBox: { display: 'flex', alignItems: 'center', gap: '15px' },
  logo: { height: '50px' },
  companyName: { margin: 0, fontSize: '18px', color: '#0F172A' },
  companySub: { margin: 0, fontSize: '11px', color: '#475569' },
  metaBox: { textAlign: 'right' },
  metaText: { margin: '2px 0', fontSize: '11px', color: '#334155' },
  divider: { margin: '15px 0', borderTop: '2px solid #16A34A' },
  reportTitle: { fontSize: '16px', margin: '15px 0', color: '#0F172A', textAlign: 'center' },
  summaryTable: { width: '100%', borderCollapse: 'collapse', marginTop: '15px', fontSize: '13px' },
  tableHeader: { backgroundColor: '#F1F5F9', textAlign: 'left' },
  signatureBlock: { display: 'flex', justifyContent: 'space-between', marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' },
  sigLine: { width: '45%' },
  sigTitle: { fontSize: '12px', fontWeight: 'bold', margin: 0 },
  sigSub: { fontSize: '12px', color: '#64748B', marginTop: '25px' }
};
