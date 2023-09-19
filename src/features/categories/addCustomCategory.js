import { getLocalStorage } from "../../utils/getLocalStorage";

export function addCustomCategory(key, newCategory) {
  const stored = getLocalStorage(key, []).filter(
    (category) => category !== newCategory
  );
  localStorage.setItem(key, JSON.stringify([...stored, newCategory]));
}
