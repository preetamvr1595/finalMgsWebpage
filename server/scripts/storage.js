const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '..', 'data.json');

const defaultData = {
  products: [],
  collections: [],
  offers: [],
  settings: {},
  rates: { gold24: 15656, gold22: 14910, silver: 292, tickerText: 'ON FESTIVAL OFFERS', manual: true },
  users: []
};

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
}

const getDB = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return defaultData;
  }
};

const mongoose = require('mongoose');

const saveDB = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  // Background backup to MongoDB Atlas if connected
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (mongoUri && mongoose.connection && mongoose.connection.readyState === 1) {
    let DBBackup;
    try {
      DBBackup = mongoose.model('DBBackup');
    } catch (e) {
      const dbBackupSchema = new mongoose.Schema({
        key: { type: String, default: 'mgs_db_backup', unique: true },
        data: mongoose.Schema.Types.Mixed,
        updatedAt: { type: Date, default: Date.now }
      });
      DBBackup = mongoose.model('DBBackup', dbBackupSchema);
    }

    DBBackup.updateOne(
      { key: 'mgs_db_backup' },
      { data, updatedAt: new Date() },
      { upsert: true }
    ).catch(err => console.error('[DB Backup] Failed to backup to MongoDB Atlas:', err));
  }
};

module.exports = {
  find: (model) => getDB()[model] || [],
  findById: (model, id) => (getDB()[model] || []).find(item => item._id === id || item.id === id),
  create: (model, data) => {
    const db = getDB();
    const newItem = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() };
    if (!db[model]) db[model] = [];
    db[model].push(newItem);
    saveDB(db);
    return newItem;
  },
  update: (model, id, data) => {
    const db = getDB();
    const index = (db[model] || []).findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    db[model][index] = { ...db[model][index], ...data, updatedAt: new Date().toISOString() };
    saveDB(db);
    return db[model][index];
  },
  remove: (model, id) => {
    const db = getDB();
    const initialCount = (db[model] || []).length;
    db[model] = (db[model] || []).filter(item => item._id !== id && item.id !== id);
    const finalCount = db[model].length;
    saveDB(db);
    return initialCount !== finalCount;
  },
  // Settings helpers
  getSetting: (key) => {
    const db = getDB();
    return db.settings?.[key];
  },
  setSetting: (key, value) => {
    const db = getDB();
    if (!db.settings) db.settings = {};
    db.settings[key] = value;
    saveDB(db);
    return value;
  },
  // Rates helpers
  getRates: () => {
    const rates = getDB().rates || {};
    return {
      gold24: rates.gold24 || 15656,
      gold22: rates.gold22 || 14910,
      silver: rates.silver || 292,
      tickerText: rates.tickerText || 'ON FESTIVAL OFFERS',
      manual: rates.manual !== undefined ? rates.manual : true,
      lastUpdated: rates.lastUpdated || new Date().toISOString()
    };
  },
  setRates: (data) => {
    const db = getDB();
    db.rates = { ...data, lastUpdated: new Date().toISOString() };
    saveDB(db);
    return db.rates;
  },
  // Users helpers
  findUser: (username) => {
    const db = getDB();
    return (db.users || []).find(u => u.username === username);
  },
  createUser: (data) => {
    const db = getDB();
    if (!db.users) db.users = [];
    const newUser = { ...data, _id: Date.now().toString() };
    db.users.push(newUser);
    saveDB(db);
    return newUser;
  }
};