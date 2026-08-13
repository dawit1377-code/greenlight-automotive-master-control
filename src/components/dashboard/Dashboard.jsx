import React from 'react';

export default function Dashboard({ data }) {
  // Fallback mock data matching your sketch values for immediate preview
  const stats = data || {
    thisMonthSales: "245,651 ETB",
    totalCashSales: "2,856,472 ETB",
    totalCreditSales: "8,574,291 ETB",
    totalCustomers: 872,
    criticalFeedback: 0,
    positiveFeedback: 49,
    activeContracts: 4,
    submittedTenders: 17,
    activeTenders: 3,
    socialFollowers: {
      tiktok: "100K",
      telegram: "2K",
      facebook: "10K"
    },
    upcomingServices: [
      { plate: "3-A1234", customer: "Mulugeta T.", dueKm: "65,000 km", dueDate: "2026-08-18", status: "Due Soon" },
      { plate: "3-B9876", customer: "Commercial Bank Fleet", dueKm: "120,000 km", dueDate: "2026-08-15", status: "Overdue" }
    ]
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Sales & Marketing Master Control Center</h2>
      
      {/* 1. SALES METRICS SECTION */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeader}>💰 Sales Metrics</h3>
        <div style={styles.grid}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>This Month Total Sales</span>
            <span style={styles.cardValueGreen}>{stats.thisMonthSales}</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Total Cash Sales</span>
            <span style={styles.cardValue}>{stats.totalCashSales}</span>
          </div>
          <div style={{ ...styles.card, borderLeft: '4px solid #EF4444' }}>
            <span style={styles.cardLabel}>Total Credit Sales</span>
            <span style={styles.cardValueRed}>{stats.totalCreditSales}</span>
          </div>
        </div>
      </section>

      {/* 2. CUSTOMER & FEEDBACK SECTION */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeader}>👥 Customer & Reputation</h3>
        <div style={styles.grid}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Total No. of Customers</span>
            <span style={styles.cardValue}>{stats.totalCustomers}</span>
          </div>
          <div style={{ ...styles.card, borderLeft: '4px solid #EF4444' }}>
            <span style={styles.cardLabel}>Critical Customer Feedback</span>
            <span style={{ ...styles.cardValue, color: stats.criticalFeedback > 0 ? '#EF4444' : '#10B981' }}>
              {stats.criticalFeedback}
            </span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Positive Feedbacks</span>
            <span style={styles.cardValueGreen}>{stats.positiveFeedback}</span>
          </div>
        </div>
      </section>

      {/* 3. B2B & TENDER MANAGEMENT SECTION */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeader}>📑 B2B Contracts, Tenders & CPO</h3>
        <div style={styles.grid}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Active Contracts</span>
            <span style={styles.cardValue}>{stats.activeContracts}</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Total Tenders Submitted</span>
            <span style={styles.cardValue}>{stats.submittedTenders}</span>
          </div>
          <div style={{ ...styles.card, borderLeft: '4px solid #F59E0B' }}>
            <span style={styles.cardLabel}>Active Tenders</span>
            <span style={{ ...styles.cardValue, color: '#F59E0B' }}>{stats.activeTenders}</span>
          </div>
        </div>
      </section>

      {/* 4. AUTOMATED SERVICE REMINDERS WIDGET */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeader}>🚘 Upcoming Vehicle Service Reminders</h3>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Plate Number</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Target Km</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.upcomingServices.map((item, idx) => (
                <tr key={idx} style={styles.tr}>
                  <td style={styles.td}><strong>{item.plate}</strong></td>
                  <td style={styles.td}>{item.customer}</td>
                  <td style={styles.td}>{item.dueKm}</td>
                  <td style={styles.td}>{item.dueDate}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: item.status === 'Overdue' ? '#FEE2E2' : '#FEF3C7',
                      color: item.status === 'Overdue' ? '#991B1B' : '#92400E'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.actionBtn}>📲 Send Reminder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. SOCIAL MEDIA REACH */}
      <section style={styles.section}>
        <h3 style={styles.sectionHeader}>📲 Social Media Reach</h3>
        <div style={styles.grid}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>TikTok Followers</span>
            <span style={styles.cardValue}>{stats.socialFollowers.tiktok}</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Telegram Subscribers</span>
            <span style={styles.cardValue}>{stats.socialFollowers.telegram}</span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Facebook Followers</span>
            <span style={styles.cardValue}>{stats.socialFollowers.facebook}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Styling matching GLAC dark/slate theme
const styles = {
  container: {
    padding: '25px',
    backgroundColor: '#0F172A',
    minHeight: '100vh',
    color: '#F8FAFC',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#16A34A',
    borderBottom: '2px solid #1E293B',
    paddingBottom: '10px'
  },
  section: {
    marginBottom: '30px'
  },
  sectionHeader: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#94A3B8'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  card: {
    backgroundColor: '#1E293B',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  cardLabel: {
    fontSize: '13px',
    color: '#94A3B8',
    fontWeight: '500'
  },
  cardValue: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  cardValueGreen: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#16A34A'
  },
  cardValueRed: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#EF4444'
  },
  tableContainer: {
    backgroundColor: '#1E293B',
    borderRadius: '8px',
    border: '1px solid #334155',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px'
  },
  tableHeaderRow: {
    backgroundColor: '#334155',
    color: '#F8FAFC'
  },
  th: {
    padding: '12px 15px'
  },
  tr: {
    borderBottom: '1px solid #334155'
  },
  td: {
    padding: '12px 15px',
    color: '#CBD5E1'
  },
  actionBtn: {
    backgroundColor: '#16A34A',
    color: '#FFF',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  }
};
