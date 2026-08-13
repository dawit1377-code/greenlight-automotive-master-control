const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

let mainWindow;
let db;

// 1. Initialize Local Database on Computer Hard Drive
function initLocalDatabase() {
  const userDataPath = app.getPath('userData');
  const dbDirPath = path.join(userDataPath, 'data');
  
  // Ensure the local /data directory exists on disk
  if (!fs.existsSync(dbDirPath)) {
    fs.mkdirSync(dbDirPath, { recursive: true });
  }

  const dbFilePath = path.join(dbDirPath, 'gac_master.db');
  console.log(`[GLAC] Local Database File Path: ${dbFilePath}`);

  // Connect to local SQLite database file on hard drive
  db = new Database(dbFilePath);
  
  // Auto-execute schema to ensure tables exist
  const schemaPath = path.join(__dirname, 'db', 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
    console.log('[GLAC] Local Database Schema Applied Successfully.');
  }
}

// 2. Create Desktop Application Window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'Greenlight Automotive Center - Master Control',
    icon: path.join(__dirname, 'public', 'assets', 'gac-logo.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the app UI
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }

  // Remove default menu bar for clean enterprise desktop look
  mainWindow.setMenuBarVisibility(false);
}

// App Lifecycle Events
app.whenReady().then(() => {
  initLocalDatabase();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handler: Database Queries
ipcMain.handle('db-query', async (event, { sql, params = [] }) => {
  try {
    const stmt = db.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return { success: true, data: stmt.all(...params) };
    } else {
      const result = stmt.run(...params);
      return { success: true, data: result };
    }
  } catch (err) {
    console.error('[GLAC DB Error]:', err.message);
    return { success: false, error: err.message };
  }
});
