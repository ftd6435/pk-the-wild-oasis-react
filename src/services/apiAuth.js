import supabase, { supabaseUrl } from "./supabase";

export async function getUsers() {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) throw new Error("Users could not be loaded");

  console.log(users);
  return users;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = supabase.auth.signUp();

  if (error) throw new Error(error.message);
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error("There was an error signing up the user");

  return data;
}

export async function updateUser({ fullName, password, avatar }) {
  // 1. Check if there is Password OR FullName
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // 2. Update data
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  // 3. Stop if there is NO avatar
  if (!avatar) return data;

  // 4. Upload the avatar image
  const avatarName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 4. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
