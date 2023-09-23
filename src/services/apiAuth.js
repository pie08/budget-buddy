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

export async function updateUser({ firstName, lastName, avatar }) {
  let updateData;
  if (firstName)
    updateData = { ...updateData, data: { ...updateData?.data, firstName } };
  if (lastName)
    updateData = { ...updateData, data: { ...updateData?.data, lastName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);
    throw error;
  }

  if (!avatar) return data;

  // add user avatar to storage bucket
  const fileName = `user-avatar-${data.user.id}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, { upsert: true });

  if (storageError) {
    console.error(storageError);
    throw storageError;
  }

  // add avatar url to user meta data
  const { updatedUser, updatedError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/sign/avatars/${fileName}`,
    },
  });

  if (updatedError) {
    console.error(updatedError);
    throw updatedError;
  }

  return updatedUser;
}
