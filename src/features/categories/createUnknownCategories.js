import { addLocalStorage } from "../../utils/addLocalStorage";

export function createUnknownCategories(data, categories, storageKey) {
  const transactions = data.map((transaction) => {
    const isUnknown =
      categories.filter((cur) => cur.name === transaction.category).length ===
      0;

    if (isUnknown) {
      addLocalStorage(storageKey, [], transaction.category.toLowerCase());
    }
    return transaction;
  });

  return transactions;
}
