import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getDatabase, initializeDatabase } from '../database/database';
import { formatDatabaseError } from '../database/errors';
import {
  clearCurrentUser,
  getCurrentUser,
  getUserByEmail,
  setCurrentUser,
  toUserData,
} from '../database/users/queries';
import type { AppContextType, UserData } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapDatabase() {
      try {
        const db = await initializeDatabase();
        const currentUser = await getCurrentUser(db);

        if (isMounted && currentUser) {
          setUser(toUserData(currentUser));
        }
      } catch (error) {
        console.warn(
          'Failed to initialize local database.',
          formatDatabaseError(error),
        );
      }
    }

    bootstrapDatabase();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateUser = useCallback((nextUser: UserData | null) => {
    setUser(nextUser);

    async function syncCurrentUser() {
      try {
        const db = await getDatabase();

        if (!nextUser) {
          await clearCurrentUser(db);
          return;
        }

        const persistedUser = await getUserByEmail(db, nextUser.email);

        if (persistedUser) {
          await setCurrentUser(db, persistedUser.id);
        }
      } catch (error) {
        console.warn(
          'Failed to sync current user.',
          formatDatabaseError(error),
        );
      }
    }

    syncCurrentUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser: updateUser,
    }),
    [updateUser, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}
