import { openDB } from 'idb';

const dbName = 'productCache';
const storeName = 'products';
const version = 1;

export const initDB = async () => {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    },
  });
  return db;
};

export const cacheProduct = async (productId, data) => {
  const db = await initDB();
  await db.put(storeName, data, productId);
};

export const getCachedProduct = async (productId) => {
  const db = await initDB();
  return await db.get(storeName, productId);
}; 