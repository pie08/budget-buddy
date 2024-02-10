import { getLocalStorage } from "../../utils/getLocalStorage";

export function deleteCustomCategory(key, category) {
  const filteredCategories = getLocalStorage(key, []).filter(
    (cat) => cat !== category
  );
  localStorage.setItem(key, JSON.stringify(filteredCategories));
}
