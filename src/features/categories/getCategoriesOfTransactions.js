/**
 *
 * @param {Array} categories array of category objects
 * @param {Array} data transaction data from server
 * @returns
 * @description adds transaction data to categories
 */
export function getCategoriesOfTransactions(categories, data) {
  const finalCategories = categories
    .map((category) => {
      // Get transactions with the current category
      const filteredData = data.filter(
        (transaction) => transaction.category === category.name
      );

      const totalAmount = filteredData.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );

      return {
        name: category.name,
        totalAmount,
        transactions: filteredData.length,
        colors: category.colors,
      };
    })
    .filter((category) => category.transactions > 0);

  return finalCategories;
}
