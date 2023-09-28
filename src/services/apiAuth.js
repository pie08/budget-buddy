import { supabase, supabaseUrl } from "./supabase";

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

export async function signup({ email, password, firstName, lastName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
      },
    },
  });

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

  // get user from server
  const { data: user, error } = await supabase.auth.getUser();
  console.log(user);

  // user does not exist
  if (error && !user.user) logout();

  if (error) {
    console.error(error);
    throw new Error(error.message);
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

export async function updateUser({ password, firstName, lastName, avatar }) {
  // configure the update data
  let updateData;
  if (firstName)
    updateData = { ...updateData, data: { ...updateData?.data, firstName } };
  if (lastName)
    updateData = { ...updateData, data: { ...updateData?.data, lastName } };
  if (password) updateData = { ...updateData, password };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);
    throw error;
  }

  if (!avatar) return data;

  // add user avatar to storage bucket
  const fileName = `user-avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError);
    throw storageError;
  }

  // add avatar url to user meta data
  const { updatedUser, updatedError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updatedError) {
    console.error(updatedError);
    throw updatedError;
  }

  return updatedUser;
}

export async function sendPasswordReset(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
