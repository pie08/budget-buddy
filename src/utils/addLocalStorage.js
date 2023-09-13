export function addLocalStorage(key, initialValue, value) {
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;
  localStorage.setItem(key, JSON.stringify([...storedValue, value]));
}
