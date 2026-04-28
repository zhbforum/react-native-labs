import type { SQLiteDatabase } from 'react-native-sqlite-storage';

import type { NewsItem } from '@components/NewsCard';

type NewsRow = {
  id: number;
  title: string;
  description: string;
  image: string;
  source: string;
  publishedAt: string;
  url: string;
};

const NEWS_COLUMNS = `
  id,
  title,
  description,
  image,
  source,
  published_at AS publishedAt,
  url
`;

export async function createNewsTable(db: SQLiteDatabase): Promise<void> {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      source TEXT NOT NULL,
      published_at TEXT NOT NULL,
      url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function seedNews(
  db: SQLiteDatabase,
  news: NewsItem[],
): Promise<void> {
  for (const [index, item] of news.entries()) {
    await db.executeSql(
      `
        INSERT OR REPLACE INTO news (
          id,
          title,
          description,
          image,
          source,
          published_at,
          url,
          sort_order,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
      `,
      [
        item.id,
        item.title,
        item.description,
        item.image,
        item.source,
        item.publishedAt,
        item.url,
        index,
      ],
    );
  }
}

export async function getNewsList(db: SQLiteDatabase): Promise<NewsItem[]> {
  const [result] = await db.executeSql(`
    SELECT ${NEWS_COLUMNS}
    FROM news
    ORDER BY sort_order ASC, published_at DESC, id ASC;
  `);

  return result.rows.raw().map(mapRequiredNewsRow);
}

export async function getNewsById(
  db: SQLiteDatabase,
  newsId: number,
): Promise<NewsItem | null> {
  const [result] = await db.executeSql(
    `
      SELECT ${NEWS_COLUMNS}
      FROM news
      WHERE id = ?
      LIMIT 1;
    `,
    [newsId],
  );

  return mapNewsRow(result.rows.item(0));
}

function mapNewsRow(row: NewsRow | undefined): NewsItem | null {
  if (!row) {
    return null;
  }

  return mapRequiredNewsRow(row);
}

function mapRequiredNewsRow(row: NewsRow): NewsItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    source: row.source,
    publishedAt: row.publishedAt,
    url: row.url,
  };
}
