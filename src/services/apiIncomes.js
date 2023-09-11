import { supabase } from "./supabase";

export async function getIncomes() {
  const { data, error } = await supabase.from("incomes").select("*");

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
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
