import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ncxxdhyajpzkzblemnyk.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
