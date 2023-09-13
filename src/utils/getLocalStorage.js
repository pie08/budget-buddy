export function getLocalStorage(key, defaultValue = []) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}
