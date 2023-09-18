import { supabase } from "./supabase";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

export async function getBudgets({ page, filter, sortBy } = {}) {
  let query = supabase.from("budgets").select("*", { count: "exact" });

  // filter
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // pagination
  if (page > 0) {
    const from = pageSize * page - pageSize;
    const to = pageSize * page - 1;

    query = query.range(from, to);
  }

  // sort
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.isAscending });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, count };
}

export async function createBudget(newBudget) {
  const { data, error } = await supabase.from("budgets").insert(newBudget);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
