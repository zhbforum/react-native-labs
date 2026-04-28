import type { SQLiteDatabase } from 'react-native-sqlite-storage';

export async function createFavoritePhotosTable(
  db: SQLiteDatabase,
): Promise<void> {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS favorite_photos (
      user_id INTEGER NOT NULL,
      photo_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, photo_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

export async function getFavoritePhotoIds(
  db: SQLiteDatabase,
  userId: number,
): Promise<number[]> {
  const [result] = await db.executeSql(
    `
      SELECT photo_id AS photoId
      FROM favorite_photos
      WHERE user_id = ?
      ORDER BY created_at DESC;
    `,
    [userId],
  );

  return result.rows.raw().map(row => row.photoId);
}

export async function addFavoritePhoto(
  db: SQLiteDatabase,
  userId: number,
  photoId: number,
): Promise<void> {
  await db.executeSql(
    `
      INSERT OR IGNORE INTO favorite_photos (user_id, photo_id)
      VALUES (?, ?);
    `,
    [userId, photoId],
  );
}

export async function removeFavoritePhoto(
  db: SQLiteDatabase,
  userId: number,
  photoId: number,
): Promise<void> {
  await db.executeSql(
    `
      DELETE FROM favorite_photos
      WHERE user_id = ? AND photo_id = ?;
    `,
    [userId, photoId],
  );
}
