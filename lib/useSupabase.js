import React, { useState, useEffect, useContext, createContext } from 'react';
import { supabase } from '../utils/supabase';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signup = async (email, password) => {
    return supabase.auth
      .signUp({
        email,
        password,
      })
      .then(({ user }) => {
        setUser(user);
        return user;
      });
  };

  const signin = async (email, password) => {
    return supabase.auth
      .signIn({
        email,
        password,
      })
      .then(({ user }) => {
        setUser(user);
        return user;
      });
  };

  const signout = () => {
    return supabase.auth.signOut();
  };

  return {
    user,
    signin,
    signup,
    signout,
  };
}
