import * as SQLite from "expo-sqlite";

const nameDB = "db.db";

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        // await db.execAsync(`DROP TABLE movements;`);
        await db.execAsync(`CREATE TABLE IF NOT EXISTS movements (
            id INTEGER PRIMARY KEY NOT NULL,
            description TEXT NOT NULL, 
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            pending BOOLEAN NOT NULL,
            adjustment TEXT NOT NULL,
            typeMovement TEXT NOT NULL
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
  date: string,
  pending: string,
  adjustment: string,
  typeMovement: string
) => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        const resultInser = await db.runAsync(
          `INSERT INTO movements (description, amount, date, pending, adjustment, typeMovement) VALUES (?, ?, ?, ?, ?, ?);`,
          [description, amount, date, pending, adjustment, typeMovement]
        );
        resolve(resultInser);
      })
      .catch((error) => {
        console.log("Error al insertar movimiento:", error);
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
        console.log(JSON.stringify(resultInser));
        resolve(resultInser);
      })
      .catch((error) => {
        reject(error);
        return false;
      });
  });
};

const updateMovement = (
  id: number,
  description: string,
  amount: string,
  date: string,
  pending: string,
  adjustment: string,
  typeMovement: string
) => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        const resultUpdate = await db.runAsync(
          `UPDATE movements 
           SET description = ?, amount = ?, date = ?, pending = ?, adjustment = ?, typeMovement = ?
           WHERE id = ?;`,
          [description, amount, date, pending, adjustment, typeMovement, id]
        );
        resolve(resultUpdate);
      })
      .catch((error) => {
        console.log("Error al actualizar movimiento:", error);
        reject(error);
        return false;
      });
  });
};

export { initDatabase, insertMovement, fetchMovements, updateMovement };
