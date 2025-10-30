// IndexedDB utilities for storing ads locally
const DB_NAME = 'SmartToolsHub';
const STORE_NAME = 'freeAds';
const DB_VERSION = 1;

export interface Ad {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  location: string;
  images: string[];
  createdAt: number;
  views: number;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('category', 'category', { unique: false });
        objectStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
};

export const saveAd = async (ad: Ad): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(ad);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getAllAds = async (): Promise<Ad[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

export const getAdById = async (id: string): Promise<Ad | undefined> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const updateAdViews = async (id: string): Promise<void> => {
  const ad = await getAdById(id);
  if (ad) {
    ad.views = (ad.views || 0) + 1;
    await saveAd(ad);
  }
};

export const deleteAd = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const exportAds = async (): Promise<string> => {
  const ads = await getAllAds();
  return JSON.stringify(ads, null, 2);
};

export const importAds = async (jsonData: string): Promise<void> => {
  const ads: Ad[] = JSON.parse(jsonData);
  for (const ad of ads) {
    await saveAd(ad);
  }
};
