import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {};
  const handleSignup = async (credentials) => {
    const { email, password, username, name } = credentials;

    if (password.length < 3) {
      return (errorMessage.value = "Password is too short");
    }

    if (username.length < 4) {
      return (errorMessage.value = "Username is too short");
    }
    if (name.length < 4) {
      return (errorMessage.value = "Name is too short");
    }

    if (!validateEmail(email)) {
      return (errorMessage.value = "Please provide valid email");
    }

    const { data: userWithUsername } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (userWithUsername) {
      return (errorMessage.value = "Username already registered");
    }

    const { data: userWithEmail } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();

    if (userWithEmail) {
      return (errorMessage.value = "Email already registered");
    }

    errorMessage.value = "";

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return (errorMessage.value = error.message);
    }

    await supabase.from("users").insert({
      name,
      username,
      email,
    });
  };
  const handleLogout = () => {};
  const getUser = () => {};

  const clearErrorMessage = () => {
    errorMessage.value = "";
  };

  return {
    user,
    errorMessage,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
  };
});
