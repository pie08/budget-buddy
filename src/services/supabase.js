import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ncxxdhyajpzkzblemnyk.supabase.co";
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jeHhkaHlhanB6a3pibGVtbnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwNDA0NjUsImV4cCI6MjAwOTYxNjQ2NX0.MXXNLBDhgqwaUQVw0R3LABmqiwt7PsAP6ZZJXqJV1_A";
export const supabase = createClient(supabaseUrl, supabaseKey);
