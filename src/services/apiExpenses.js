import { supabase } from "./supabase";
import expenseCategories from "../data/expenseCategories.json";
import { getCategories } from "../features/categories/getCategories";
import { createUnknownCategories } from "../features/categories/createUnknownCategories";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

export async function getExpenses({ page, filter, sortBy } = {}) {
  let query = supabase
    .from("expenses")
    .select("*", { count: "exact" })
    .neq("category", null);

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

  const categories = getCategories(
    "customExpenseCategories",
    expenseCategories
  );

  // create a category for all expenses with an unknown category
  createUnknownCategories(data, categories, "customExpenseCategories");

  return { expenses: data, count };
}

export async function getExpensesAfterDate(date) {
  let query = supabase.from("expenses").select().neq("category", null);

  if (date) query = query.gte("created_at", date);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  const categories = getCategories(
    "customExpenseCategories",
    expenseCategories
  );

  // create a category for all expenses with an unknown category
  createUnknownCategories(data, categories, "customExpenseCategories");

  return data;
}

export async function getExpensesByCategory({ category, page, sortBy }) {
  let query = supabase
    .from("expenses")
    .select("*", { count: "exact" })
    .eq("category", category);

  // pagination
  if (page > 0) {
    const from = pageSize * page - pageSize;
    const to = pageSize * page - 1;

    query = query.range(from, to);
  }

  // sort
  query = query.order(sortBy.field, { ascending: sortBy.isAscending });

  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, count };
}

export async function createExpense(newExpense) {
  const { data, error } = await supabase.from("expenses").insert(newExpense);

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function deleteExpense(id) {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
  return;
}

export async function updateExpense({ data, id }) {
  const { data: expense, error } = await supabase
    .from("expenses")
    .update(data)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }
  return expense;
}
