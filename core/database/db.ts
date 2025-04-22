import * as SQLite from "expo-sqlite";

const nameDB = "db.db";

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        // await db.execAsync(`DROP TABLE IF EXISTS movements;`);
        await db.execAsync(`CREATE TABLE IF NOT EXISTS movements (
            id INTEGER PRIMARY KEY NOT NULL,
            description TEXT NOT NULL, 
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            pending BOOLEAN NOT NULL,
            adjustment TEXT NOT NULL,
            typeMovement TEXT NOT NULL,
            category TEXT NOT NULL,
            paymentMethod TEXT NOT NULL,
            notes TEXT,
            recurring BOOLEAN NOT NULL
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
  typeMovement: string,
  category: string,
  paymentMethod: string,
  notes: string,
  recurring: boolean
) => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        const resultInsert = await db.runAsync(
          `INSERT INTO movements (description, amount, date, pending, adjustment, typeMovement, category, paymentMethod, notes, recurring) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            description,
            amount,
            date,
            pending,
            adjustment,
            typeMovement,
            category,
            paymentMethod,
            notes,
            recurring,
          ]
        );
        resolve(resultInsert);
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
        const resultFetch = await db.getAllAsync(
          `SELECT * FROM movements;`,
          []
        );
        resolve(resultFetch);
      })
      .catch((error) => {
        console.log("Error al obtener movimientos:", error);
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
  typeMovement: string,
  category: string,
  paymentMethod: string,
  notes: string,
  recurring: boolean
) => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabaseAsync(nameDB)
      .then(async (db) => {
        const resultUpdate = await db.runAsync(
          `UPDATE movements 
           SET description = ?, amount = ?, date = ?, pending = ?, adjustment = ?, typeMovement = ?, category = ?, paymentMethod = ?, notes = ?, recurring = ?
           WHERE id = ?;`,
          [
            description,
            amount,
            date,
            pending,
            adjustment,
            typeMovement,
            category,
            paymentMethod,
            notes,
            recurring,
            id,
          ]
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
