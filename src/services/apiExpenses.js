import { supabase } from "./supabase";

export async function getExpenses() {
  const { data, error } = await supabase.from("expenses").select("*");

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getExpensesById(id) {
  const { data, error } = await supabase.from("expenses").eq("id", id).select();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
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
