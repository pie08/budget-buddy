import { supabase } from "./supabase";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

export async function getBudgets({ page, filter, sortBy } = {}) {
  let query = supabase.from("budgets").select("*", { count: "exact" });

  // filter
  if (filter) {
    if (Array.isArray(filter)) {
      filter.forEach(
        ({ method, field, value }) => (query = query[method](field, value))
      );
    } else {
      query = query[filter.method](filter.field, filter.value);
    }
  }

  // pagination
  if (page) {
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

export async function getBudgetById(id) {
  const { data, error } = await supabase
    .from("budgets")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function createBudget(newBudget) {
  const { data, error } = await supabase.from("budgets").insert(newBudget);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function deleteBudget(id) {
  const { error } = await supabase.from("budgets").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
  return;
}

export async function updateBudget({ data, id }) {
  const { data: budget, error } = await supabase
    .from("budgets")
    .update(data)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return budget;
}
