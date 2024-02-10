import { addCustomCategory } from "./addCustomCategory";

export function createUnknownCategories(data, categories, storageKey) {
  data.forEach((transaction) => {
    // check if category exists
    const isUnknown =
      categories.filter((cur) => cur.name === transaction.category).length ===
      0;

    // if does not exists, create
    if (isUnknown) {
      addCustomCategory(storageKey, transaction.category);
    }
  });
}
