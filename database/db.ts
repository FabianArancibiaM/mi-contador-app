import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

let db;
const nameDB = "db.db";

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        await db.execAsync(`CREATE TABLE IF NOT EXISTS movements (
            id INTEGER PRIMARY KEY NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            movement TEXT NOT NULL,
            fecha TEXT NOT NULL,
            isMovement BOOLEAN NOT NULL
          );`);
        resolve(true);
      })
      .catch((error) => {
        reject(error);
        return false;
      });
  });
};

const insertMovement = (
  description: string,
  amount: string,
  movement: string,
  fecha: string,
  isMovement: string
) => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        const resultInser = await db.runAsync(
          `INSERT INTO movements (description, amount, movement, fecha, isMovement) VALUES (?, ?, ?, ?, ?);`,
          [description, amount, movement, fecha, isMovement]
        );
        resolve(resultInser);
      })
      .catch((error) => {
        reject(error);
        return false;
      });
  });
};

const fetchMovements = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        const resultInser = await db.getAllAsync(
          `SELECT * FROM movements;`,
          []
        );
        resolve(resultInser);
      })
      .catch((error) => {
        reject(error);
        return false;
      });
  });
};

export { initDatabase, insertMovement, fetchMovements };
