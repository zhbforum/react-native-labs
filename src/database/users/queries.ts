import type { SQLiteDatabase } from 'react-native-sqlite-storage';

import type { UserData } from '@context/types';

export type UserRecord = UserData & {
  id: number;
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type CreateUserInput = UserData & {
  password: string;
};

const USER_COLUMNS = `
  u.id,
  u.name,
  u.surname,
  u.email,
  u.password,
  u.created_at AS createdAt,
  u.updated_at AS updatedAt,
  u.last_login_at AS lastLoginAt
`;

export async function createUsersTable(db: SQLiteDatabase): Promise<void> {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_login_at TEXT
    );
  `);
}

export async function createCurrentUserTable(
  db: SQLiteDatabase,
): Promise<void> {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS current_user (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      user_id INTEGER,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);
}

export async function seedDemoUser(
  db: SQLiteDatabase,
  demoUser: CreateUserInput,
): Promise<void> {
  await db.executeSql(
    `
      INSERT OR IGNORE INTO users (name, surname, email, password)
      VALUES (?, ?, ?, ?);
    `,
    [
      demoUser.name.trim(),
      demoUser.surname.trim(),
      demoUser.email.trim().toLowerCase(),
      demoUser.password,
    ],
  );
}

export async function createUser(
  db: SQLiteDatabase,
  user: CreateUserInput,
): Promise<UserRecord> {
  await db.executeSql(
    `
      INSERT INTO users (name, surname, email, password)
      VALUES (?, ?, ?, ?);
    `,
    [
      user.name.trim(),
      user.surname.trim(),
      user.email.trim().toLowerCase(),
      user.password,
    ],
  );

  const createdUser = await getUserByEmail(db, user.email);

  if (!createdUser) {
    throw new Error('Failed to create user.');
  }

  return createdUser;
}

export async function getUserByEmail(
  db: SQLiteDatabase,
  email: string,
): Promise<UserRecord | null> {
  const [result] = await db.executeSql(
    `
      SELECT ${USER_COLUMNS}
      FROM users u
      WHERE lower(u.email) = lower(?)
      LIMIT 1;
    `,
    [email.trim()],
  );

  return mapUserRow(result.rows.item(0));
}

export async function getUserByCredentials(
  db: SQLiteDatabase,
  credentials: UserCredentials,
): Promise<UserRecord | null> {
  const [result] = await db.executeSql(
    `
      SELECT ${USER_COLUMNS}
      FROM users u
      WHERE lower(u.email) = lower(?) AND u.password = ?
      LIMIT 1;
    `,
    [credentials.email.trim(), credentials.password],
  );

  return mapUserRow(result.rows.item(0));
}

export async function setCurrentUser(
  db: SQLiteDatabase,
  userId: number,
): Promise<void> {
  await db.executeSql(
    `
      INSERT OR REPLACE INTO current_user (id, user_id, updated_at)
      VALUES (1, ?, CURRENT_TIMESTAMP);
    `,
    [userId],
  );

  await db.executeSql(
    `
      UPDATE users
      SET last_login_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?;
    `,
    [userId],
  );
}

export async function clearCurrentUser(db: SQLiteDatabase): Promise<void> {
  await db.executeSql('DELETE FROM current_user WHERE id = 1;');
}

export async function getCurrentUser(
  db: SQLiteDatabase,
): Promise<UserRecord | null> {
  const [result] = await db.executeSql(`
    SELECT ${USER_COLUMNS}
    FROM users u
    INNER JOIN current_user ON current_user.user_id = u.id
    WHERE current_user.id = 1
    LIMIT 1;
  `);

  return mapUserRow(result.rows.item(0));
}

export function toUserData(user: UserRecord): UserData {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
  };
}

function mapUserRow(row: any): UserRecord | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    surname: row.surname,
    email: row.email,
    password: row.password,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    lastLoginAt: row.lastLoginAt ?? null,
  };
}
