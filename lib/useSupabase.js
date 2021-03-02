import React, { useState, useEffect, useContext, createContext } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const session = supabase.auth.session();
  const [user, setUser] = useState(null);

  // setUser(session.user);
  useEffect(() => {
    setUser(session?.user);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log('session when page load', session);
          setUser(session.user);
        } else {
          console.log('NO?');
          setUser(false);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout: () => supabase.auth.signOut() }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
