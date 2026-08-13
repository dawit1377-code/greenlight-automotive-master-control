import React, { useState } from 'react';

export default function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch({ query: value, category: filterCategory });
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    if (onSearch) {
      onSearch({ query: searchQuery, category });
    }
  };

  return (
    <header style={styles.header}>
      {/* 1. Branding & Company Logo Section */}
      <div style={styles.brandingContainer}>
        <img 
          src="/assets/gac-logo.png" 
          alt="GLAC Logo" 
          style={styles.logo} 
          onError={(e) => { e.target.style.display = 'none'; }} // Fallback if image isn't loaded yet
        />
        <div>
          <h1 style={styles.companyTitle}>Greenlight Automotive Center</h1>
          <p style={styles.subTitle}>Sales & Marketing Master Control Platform</p>
        </div>
      </div>

      {/* 2. Global Search Engine Bar */}
      <div style={styles.searchContainer}>
        <select 
          value={filterCategory} 
          onChange={handleCategoryChange} 
          style={styles.filterSelect}
        >
          <option value="all">All Modules</option>
          <option value="sales">Sales & Invoices</option>
          <option value="customers">Customers</option>
          <option value="vehicles">Vehicles (Plate/VIN)</option>
          <option value="tenders">Tenders & Win/Loss</option>
          <option value="cpo">CPO & Bank Guarantees</option>
          <option value="feedback">Feedback Logs</option>
        </select>

        <input
          type="text"
          placeholder="Search by Plate #, VIN, Customer Name, Invoice #, Tender Ref..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        
        <button style={styles.searchButton}>
          🔍 Search
        </button>
      </div>
    </header>
  );
}

// Inline Styles (easily adapted to Tailwind or CSS Modules later)
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#0F172A', // Dark enterprise slate theme
    color: '#FFFFFF',
    borderBottom: '3px solid #16A34A', // Greenlight accent color
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  brandingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logo: {
    height: '45px',
    width: 'auto',
    borderRadius: '4px',
  },
  companyTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: '0.5px',
  },
  subTitle: {
    margin: 0,
    fontSize: '12px',
    color: '#94A3B8',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    maxWidth: '650px',
    backgroundColor: '#1E293B',
    borderRadius: '6px',
    padding: '4px',
    border: '1px solid #334155',
  },
  filterSelect: {
    backgroundColor: '#334155',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px 0 0 4px',
    fontSize: '13px',
    cursor: 'pointer',
    outline: 'none',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    padding: '8px 14px',
    color: '#FFFFFF',
    fontSize: '14px',
    outline: 'none',
  },
  searchButton: {
    backgroundColor: '#16A34A', // Greenlight primary green
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
  },
};
