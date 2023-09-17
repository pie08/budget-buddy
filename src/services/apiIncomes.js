import { addLocalStorage } from "../utils/addLocalStorage";
import { supabase } from "./supabase";
import incomeCategories from "../data/incomeCategories.json";
import { getCategories } from "../features/categories/getCategories";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

export async function getIncomes({ page, filter, sortBy } = {}) {
  let query = supabase.from("incomes").select("*", { count: "exact" });

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

  const categories = getCategories("customIncomeCategories", incomeCategories);

  // create a category for all incomes with an unknown category
  const incomes = data
    .filter((income) => {
      const isNull = income.category === null;
      const isInvalidName = income.category.split(" ").length < 1;
      if (isNull || isInvalidName) deleteIncome(income.id);
      return !isNull && !isInvalidName;
    })
    .map((income) => {
      const isUnknown =
        categories.filter((cur) => cur.name === income.category).length === 0;

      if (isUnknown) {
        addLocalStorage(
          "customIncomeCategories",
          [],
          income.category.toLowerCase()
        );
      }
      return income;
    });

  return { incomes, count };
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
