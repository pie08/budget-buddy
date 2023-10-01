import { addLocalStorage } from "../../utils/addLocalStorage";

export function createUnknownCategories(data, categories, storageKey) {
  data.forEach((transaction) => {
    // check if category exists
    const isUnknown =
      categories.filter((cur) => cur.name === transaction.category).length ===
      0;

    // is does not exists, create
    if (isUnknown) {
      addLocalStorage(storageKey, [], transaction.category.toLowerCase());
    }
  });
}
