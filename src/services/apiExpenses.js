import { supabase } from "./supabase";

export async function getExpenses() {
  const { data, error } = await supabase.from("expenses").select("*");

  if (error) {
    console.log(error);
    throw new Error("Could not get your expenses");
  }
  return data;
}
