import { supabase } from "./supabase";
import expenseCategories from "../data/expenseCategories.json";
import { getCategories } from "../features/categories/getCategories";
import { createUnknownCategories } from "../features/categories/createUnknownCategories";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

/**
 * Get expenses
 * @param {{page: number, filter: {field: string, value: string}, sortBy: {field: string, isAscending: boolean}}} options
 * @returns
 */
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

  const categories = getCategories("expense");

  // create a category for all expenses with an unknown category
  createUnknownCategories(data, categories, "customExpenseCategories");

  return { expenses: data, count };
}

/**
 * Get expenses after a date
 * @param {date | boolean} date -
 * @returns
 */
export async function getExpensesAfterDate(date) {
  let query = supabase.from("expenses").select().neq("category", null);

  // if date provided else get all expenses
  if (date) query = query.gte("created_at", date);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  const categories = getCategories("expense");

  // create a category for all expenses with an unknown category
  createUnknownCategories(data, categories, "customExpenseCategories");

  return data;
}

/**
 * Get expenses by category
 * @param {{category: string, page: number, sortBy: {field: string, isAscending: boolean}}} options
 * @returns
 */
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
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.isAscending });

  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, count };
}

/**
 * Create a new expense
 * @param {object} newExpense - New expense data
 * @returns {Promise.object} Newly created expense
 */
export async function createExpense(newExpense) {
  const { data, error } = await supabase.from("expenses").insert(newExpense);

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

/**
 * Delete an expense
 * @param {number} id - ID for expense in database
 * @returns
 */
export async function deleteExpense(id) {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
  return;
}

/**
 *
 * @param {{data: object, id: number}} Parameter - The ID of the expense to updat along with the new data
 * @returns {Promise.object} Expense
 */
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
