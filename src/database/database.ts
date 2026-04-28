import SQLite from 'react-native-sqlite-storage';
import type { SQLiteDatabase } from 'react-native-sqlite-storage';

import { AUTH_DEMO_CREDENTIALS } from '@screens/AuthScreen/constants';

import { createFavoritePhotosTable } from './gallery/queries';
import { createNewsTable, seedNews } from './news/queries';
import { seedNewsData } from './news/seed';
import {
  createCurrentUserTable,
  createUsersTable,
  seedDemoUser,
} from './users/queries';

const DATABASE_NAME = 'react_native_labs.db';

SQLite.enablePromise(true);

let database: Promise<SQLiteDatabase> | null = null;
let initialization: Promise<SQLiteDatabase> | null = null;

export function getDatabase(): Promise<SQLiteDatabase> {
  if (!database) {
    database = SQLite.openDatabase({
      name: DATABASE_NAME,
      location: 'default',
    });
  }

  return database;
}

export async function initializeDatabase(): Promise<SQLiteDatabase> {
  if (!initialization) {
    initialization = (async () => {
      try {
        const db = await getDatabase();

        await db.executeSql('PRAGMA foreign_keys = ON;');

        await createUsersTable(db);
        await createCurrentUserTable(db);
        await createFavoritePhotosTable(db);
        await createNewsTable(db);

        await seedDemoUser(db, AUTH_DEMO_CREDENTIALS);
        await seedNews(db, seedNewsData);

        return db;
      } catch (error) {
        initialization = null;
        throw error;
      }
    })();
  }

  return initialization;
}
