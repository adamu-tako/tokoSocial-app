export const getItem = (value: any): string | null => {
  return localStorage.getItem(value);
};

export const getItemAsObject = <T>(value: string): T => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {} as T;
  }
};

export const getItemAsArray = <T>(value: string): T[] => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return [] as T[];
  }
};

export const setItem = (key: string, value: any): void => {
  return localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Does the same thing with setItem. Just making the function explicit
 * @param key
 * @param value
 * @returns
 */
export const saveItemAsObject = (key: string, value: any): void => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const saveItemAsString = (key: string, value: string): void => {
  return localStorage.setItem(key, value);
};
