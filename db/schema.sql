-- Greenlight Automotive Center (GLAC) - Local Master Database Schema

-- 1. CUSTOMERS TABLE (B2C & B2B)
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_or_name VARCHAR(150) NOT NULL,
    customer_type VARCHAR(20) DEFAULT 'Retail', -- 'Retail' or 'Corporate/B2B'
    phone_number VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    tin_number VARCHAR(50),
    credit_limit DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. VEHICLES TABLE (Linked to Customers)
CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    plate_number VARCHAR(30) NOT NULL UNIQUE,
    vin_number VARCHAR(50) UNIQUE,
    make VARCHAR(50) NOT NULL,         -- e.g., Toyota
    model VARCHAR(50) NOT NULL,        -- e.g., Prado
    year_manufactured INTEGER,
    current_odometer_km INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 3. SALES & INVOICES (Cash vs. Credit)
CREATE TABLE IF NOT EXISTS sales_transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id INTEGER NOT NULL,
    vehicle_id INTEGER,                -- Optional for general non-vehicle sales
    payment_type VARCHAR(20) NOT NULL, -- 'Cash' or 'Credit'
    total_amount_etb DECIMAL(12, 2) NOT NULL,
    amount_paid_etb DECIMAL(12, 2) DEFAULT 0.00,
    due_date DATE,                     -- Required for Credit sales
    payment_status VARCHAR(20) DEFAULT 'Unpaid', -- 'Paid', 'Partial', 'Overdue'
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
);

-- 4. VEHICLE SERVICE REMINDERS (Automated Engine)
CREATE TABLE IF NOT EXISTS service_schedules (
    schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    last_service_date DATE NOT NULL,
    last_service_odometer_km INT NOT NULL,
    next_service_due_date DATE NOT NULL,
    next_service_due_km INT NOT NULL,
    reminder_status VARCHAR(30) DEFAULT 'Pending', -- 'Pending', '1st_Notice_Sent', 'Booked', 'Overdue'
    notes TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- 5. TENDERS & WIN/LOSS ANALYTICS
CREATE TABLE IF NOT EXISTS tenders (
    tender_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tender_ref_number VARCHAR(100) NOT NULL UNIQUE,
    client_organization VARCHAR(150) NOT NULL,
    tender_title VARCHAR(255) NOT NULL,
    submission_deadline DATE NOT NULL,
    bid_amount_etb DECIMAL(14, 2) NOT NULL,
    cpo_amount_etb DECIMAL(12, 2),
    status VARCHAR(30) DEFAULT 'Active', -- 'Draft', 'Submitted', 'Won', 'Lost', 'Cancelled'
    win_loss_reason TEXT,                 -- e.g., 'Price competition', 'Technical evaluation'
    competitor_winner VARCHAR(150),       -- Optional: track who won if lost
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. CPO & BANK GUARANTEES (Risk Management)
CREATE TABLE IF NOT EXISTS cpo_bank_guarantees (
    cpo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tender_id INTEGER,                    -- Linked to a specific tender if applicable
    issuing_bank VARCHAR(100) NOT NULL,
    cpo_number VARCHAR(100) NOT NULL UNIQUE,
    amount_etb DECIMAL(12, 2) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'Active', -- 'Active', 'Released', 'Forfeited', 'Expired'
    FOREIGN KEY (tender_id) REFERENCES tenders(tender_id) ON DELETE SET NULL
);

-- 7. EXTERNAL CUSTOMER FEEDBACK LOGS
CREATE TABLE IF NOT EXISTS customer_feedback (
    feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name VARCHAR(150),
    phone_or_email VARCHAR(100),
    feedback_type VARCHAR(20) NOT NULL,  -- 'Critical' or 'Positive'
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comments TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'External App', -- 'External App', 'Manual Import', 'Direct'
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
