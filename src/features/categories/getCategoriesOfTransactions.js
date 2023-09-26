export function getCategoriesOfTransactions(categories, data) {
  const finalCategories = categories
    .map((category) => {
      // Get expenses with the current category
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