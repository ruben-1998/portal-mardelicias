import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage } from 'utils/utils';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const userLocal = getLocalStorage('user');
    if (!user && userLocal) {
      setUser(JSON.parse(userLocal));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.user_metadata.role === 'admin');
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        setIsAdmin: (isAdmin) => setIsAdmin(isAdmin),
        user,
        setUser: (user) => setUser(user)
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
