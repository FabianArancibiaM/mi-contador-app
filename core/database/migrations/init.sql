-- SQL commands to initialize the database schema for the mi-contador-app

CREATE TABLE IF NOT EXISTS movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    movement_type TEXT NOT NULL,
    date TEXT NOT NULL,
    is_movement BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS movement_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    type TEXT NOT NULL,
    disabled BOOLEAN NOT NULL DEFAULT 0
);