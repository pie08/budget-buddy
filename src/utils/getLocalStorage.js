export function getLocalStorage(key, defaultValue = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (err) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
}
