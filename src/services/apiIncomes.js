import { supabase } from "./supabase";
import { getCategories } from "../features/categories/getCategories";
import { createUnknownCategories } from "../features/categories/createUnknownCategories";
import { PAGE_SIZE } from "../utils/constants";
const pageSize = PAGE_SIZE;

export async function getIncomes({ page, filter, sortBy } = {}) {
  let query = supabase
    .from("incomes")
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

  const categories = getCategories("income");

  // create a category for all incomes with an unknown category
  createUnknownCategories(data, categories, "customIncomeCategories");

  return { incomes: data, count };
}

export async function getIncomesAfterDate(date) {
  let query = supabase.from("incomes").select().neq("category", null);

  if (date) query = query.gte("created_at", date);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  const categories = getCategories("income");

  // create a category for all incomes with an unknown category
  createUnknownCategories(data, categories, "customIncomeCategories");

  return data;
}

export async function getIncomesByCategory({ category, page, sortBy }) {
  let query = supabase
    .from("incomes")
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

export async function createIncome(newIncome) {
  const { data, error } = await supabase.from("incomes").insert(newIncome);

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function deleteIncome(id) {
  const { error } = await supabase.from("incomes").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
  return;
}

export async function updateIncome({ data, id }) {
  const { data: income, error } = await supabase
    .from("incomes")
    .update(data)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }
  return income;
}
