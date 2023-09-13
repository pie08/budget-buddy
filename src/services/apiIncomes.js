import { supabase } from "./supabase";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

export async function getIncomes({ page }) {
  let query = supabase.from("incomes").select("*", { count: "exact" });

  // pagination
  if (page) {
    const from = pageSize * page - pageSize;
    const to = pageSize * page - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw error;
  }
  return { data, count };
}

export async function getIncomesById(id) {
  const { data, error } = await supabase.from("incomes").eq("id", id).select();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
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
