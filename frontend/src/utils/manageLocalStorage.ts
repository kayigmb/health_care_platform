/**
 * These are some field names used in local storage.
 *
 */
export const LocalStorageStores = {
  TOKEN: "token",
  USER: "user"
} as const;

/**
 * LocalStorageStores is a constant object that defines the keys used in local storage.
 */
export type LocalStorageKey = (typeof LocalStorageStores)[keyof typeof LocalStorageStores];

/**
 * gets an item from local storage by key.
 * @param key : LocalStorageKey
 * @returns The parsed value from local storage or null if not found or an error occurs.
 */
export function getFromLocalStorage<T>(key: LocalStorageKey): T | null {
  try {
    const item: string | null = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  } catch (error) {
    console.log("Error getting from local storage", error);
    return null;
  }
}

/**
 * Sets an item in local storage with the specified key and value.
 * @param key : LocalStorageKey
 * @param value : T - The type value to be stored
 */
export function setToLocalStorage<T>(key: LocalStorageKey, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting to local storage", error);
  }
}

/**
 * Removes an item from local storage by key.
 * @param key : LocalStorageKey
 */
export function removeFromLocalStorage(key: LocalStorageKey): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from local storage", error);
  }
}

/**
 * Clears all items from local storage.
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing local storage", error);
  }
}
