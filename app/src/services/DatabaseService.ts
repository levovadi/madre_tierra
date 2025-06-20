// services/DatabaseService.ts
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;


export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('tasks.db');
  }
  return db;
};

export const initDB = async (): Promise<void> => {
  const db = await getDB();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS completed_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      completed_at TEXT NOT NULL
    );
  `);
};

export const saveCompletedTask = async (taskId: number, name: string): Promise<void> => {
  const db = await getDB();
  const date = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO completed_tasks (task_id, name, completed_at) VALUES (?, ?, ?)`,
    [taskId, name, date]
  );
};


export const getLastCompletedTasks = async (limit: number): Promise<any[]> => {
  const db = await getDB();
  try {
    return await db.getAllAsync(
      `SELECT * FROM completed_tasks ORDER BY completed_at DESC LIMIT ?`,
      [limit]
    );
  } catch (e) {
    console.error('Error fetching last completed tasks:', e);
    return [];
  }
};

export const getCompletedTasks = async (): Promise<
  { id: number; name: string; completed_at: string }[]
> => {
  if (!db) db = await SQLite.openDatabaseAsync('tasks.db');

  return await db.getAllAsync(
    'SELECT * FROM completed_tasks ORDER BY completed_at DESC'
  );
};

export const deleteCompletedTask = async (id: number): Promise<void> => {
  const db = await getDB();
  await db.runAsync(`DELETE FROM completed_tasks WHERE id = ?`, [id]);
};