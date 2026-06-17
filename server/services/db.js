// ─────────────────────────────────────────────────────────────
//  db.js  —  Unified Database Service (MongoDB with JSON Fallback)
// ─────────────────────────────────────────────────────────────
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_DIR = path.resolve(__dirname, '../data/blogs_db');

// Ensure local JSON DB directory exists
if (!fs.existsSync(LOCAL_DB_DIR)) {
  fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
}

const initializeJSONFile = (filename, defaultValue = []) => {
  const filePath = path.join(LOCAL_DB_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
  }
};

initializeJSONFile('users.json');
initializeJSONFile('blogs.json');
initializeJSONFile('categories.json');
initializeJSONFile('tags.json');

// ── Database State ────────────────────────────────────────────
let mongoClient = null;
let dbInstance = null;
let isUsingMongo = false;

// ── Helpers for Local JSON Database ───────────────────────────
const readJSON = (filename) => {
  const filePath = path.join(LOCAL_DB_DIR, filename);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading local DB file ${filename}:`, err.message);
    return [];
  }
};

const writeJSON = (filename, data) => {
  const filePath = path.join(LOCAL_DB_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// ── DB Connection Lifecycle ───────────────────────────────────
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[DB] No MONGODB_URI environment variable detected. Using Local File-Based JSON Database.');
    isUsingMongo = false;
    return false;
  }

  try {
    console.log('[DB] Attempting to connect to MongoDB Atlas...');
    mongoClient = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    await mongoClient.connect();
    
    // Parse database name from connection string, default to 'orvion'
    const dbName = uri.split('/').pop()?.split('?')[0] || 'orvion';
    dbInstance = mongoClient.db(dbName);
    isUsingMongo = true;
    console.log(`[DB] Successfully connected to MongoDB database: "${dbName}"`);
    return true;
  } catch (err) {
    console.warn(`[DB] Failed to connect to MongoDB Atlas: ${err.message}. Falling back to Local File-Based JSON Database.`);
    isUsingMongo = false;
    dbInstance = null;
    if (mongoClient) {
      try {
        await mongoClient.close();
      } catch (_) {}
      mongoClient = null;
    }
    return false;
  }
};

// ── Collection Implementations ─────────────────────────────────
const makeCollection = (filename) => {
  const collName = filename.replace('.json', '');

  return {
    find: async (query = {}) => {
      if (isUsingMongo && dbInstance) {
        try {
          const docs = await dbInstance.collection(collName).find(query).toArray();
          // Map MongoDB _id object to id string for frontend compatibility
          return docs.map(doc => ({ ...doc, id: doc.id || doc._id.toString() }));
        } catch (err) {
          console.warn(`[DB] MongoDB find error: ${err.message}. Falling back to local file.`, query);
        }
      }

      // JSON Fallback
      const items = readJSON(filename);
      return items.filter(item => {
        for (const key in query) {
          if (query[key] !== undefined && item[key] !== query[key]) {
            return false;
          }
        }
        return true;
      });
    },

    findOne: async (query = {}) => {
      if (isUsingMongo && dbInstance) {
        try {
          const doc = await dbInstance.collection(collName).findOne(query);
          if (doc) return { ...doc, id: doc.id || doc._id.toString() };
          return null;
        } catch (err) {
          console.warn(`[DB] MongoDB findOne error: ${err.message}. Falling back to local file.`, query);
        }
      }

      // JSON Fallback
      const items = readJSON(filename);
      return items.find(item => {
        for (const key in query) {
          if (query[key] !== undefined && item[key] !== query[key]) {
            return false;
          }
        }
        return true;
      }) || null;
    },

    insertOne: async (doc) => {
      const newDoc = { ...doc };
      if (!newDoc.id && !newDoc._id) {
        // Simple random string id for local fallback
        newDoc.id = Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      }

      if (isUsingMongo && dbInstance) {
        try {
          const docForMongo = { ...newDoc };
          if (docForMongo.id) docForMongo._id = docForMongo.id; // Map id to _id
          await dbInstance.collection(collName).insertOne(docForMongo);
          return newDoc;
        } catch (err) {
          console.warn(`[DB] MongoDB insertOne error: ${err.message}. Saving to local file instead.`, newDoc);
        }
      }

      // JSON Fallback
      const items = readJSON(filename);
      items.push(newDoc);
      writeJSON(filename, items);
      return newDoc;
    },

    updateOne: async (query, updateFields) => {
      // updateFields is expected to contain { $set: { ... } } or just properties
      const sets = updateFields.$set || updateFields;

      if (isUsingMongo && dbInstance) {
        try {
          const res = await dbInstance.collection(collName).updateOne(query, { $set: sets });
          return res.modifiedCount > 0;
        } catch (err) {
          console.warn(`[DB] MongoDB updateOne error: ${err.message}. Updating local file instead.`, query);
        }
      }

      // JSON Fallback
      const items = readJSON(filename);
      let updatedCount = 0;
      const newItems = items.map(item => {
        let match = true;
        for (const key in query) {
          if (item[key] !== query[key]) {
            match = false;
            break;
          }
        }
        if (match) {
          updatedCount++;
          return { ...item, ...sets, updatedAt: new Date().toISOString() };
        }
        return item;
      });

      if (updatedCount > 0) {
        writeJSON(filename, newItems);
        return true;
      }
      return false;
    },

    deleteOne: async (query) => {
      if (isUsingMongo && dbInstance) {
        try {
          const res = await dbInstance.collection(collName).deleteOne(query);
          return res.deletedCount > 0;
        } catch (err) {
          console.warn(`[DB] MongoDB deleteOne error: ${err.message}. Deleting from local file instead.`, query);
        }
      }

      // JSON Fallback
      const items = readJSON(filename);
      const filtered = items.filter(item => {
        let match = true;
        for (const key in query) {
          if (item[key] !== query[key]) {
            match = false;
            break;
          }
        }
        return !match;
      });

      if (filtered.length !== items.length) {
        writeJSON(filename, filtered);
        return true;
      }
      return false;
    }
  };
};

export const Users = makeCollection('users.json');
export const Blogs = makeCollection('blogs.json');
export const Categories = makeCollection('categories.json');
export const Tags = makeCollection('tags.json');
