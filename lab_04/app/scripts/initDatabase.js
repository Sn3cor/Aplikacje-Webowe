const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('database.db');

const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER
    )`;

const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        bookId INTEGER NOT NULL,
        quantity INTEGER NOT NULL
    )`;

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL

    )`;


db.run(createBooksTable, (err) => {
    if (err) {
        return console.error('Error creating table: ', err.message);
    }

    console.log('Table books created successfully');
});

db.run(createOrdersTable, (err) => {
    if (err) {
        return console.error('Error creating table: ', err.message);
    }

    console.log('Table orders created successfully');
});

db.run(createUsersTable, (err) => {
    if (err) {
        return console.error('Error creating table: ', err.message);
    }

    console.log('Table users created successfully');
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Database connection closed')
})