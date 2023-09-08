export function formatCurrency(value) {
  return Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
}
