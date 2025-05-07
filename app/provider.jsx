"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    // Fetch on mount
    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser(); // Re-fetch user info on login/logout
    });

    // Cleanup the listener on unmount
    return () => {
      listener.subscription?.unsubscribe?.();
    };
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      return;
    }

    // Check if user already exists in the "Users" table
    const { data: existingUsers } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    // If not, create new user
    if (!existingUsers || existingUsers.length === 0) {
      const { data: newUser, error } = await supabase
        .from("Users")
        .insert([
          {
            name: user.user_metadata?.name,
            email: user.email,
            picture: user.user_metadata?.picture,
          },
        ])
        .select()
        .single(); // Immediately fetch the inserted user

      if (!error) {
        setUser(newUser);
      }
    } else {
      setUser(existingUsers[0]);
    }
  };

  return ( 
    <UserDetailContext.Provider value={{ user, setUser }}>
        <div>{children}</div>
    </UserDetailContext.Provider>
    
)
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}