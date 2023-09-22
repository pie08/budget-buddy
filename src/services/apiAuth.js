import { supabase } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log(data);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getUser() {
  // check if currently logged in user
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw error;
  }

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw error;
  }
}
