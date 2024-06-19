# Task: Tech Web Backend (Only Backend)
This application must meet the following main requirements:
- Able to create new notes
- Able to display all notes
- Able to display a single note
- Able to modify notes (title, date, and content)
- Able to delete notes

## Rules:
- Mandatory task
- Must use the provided database
- SQL commands are attached in the appendix
- Prohibited from changing table structure and data types
- Use a .env file (Template in the appendix)
- Must have a .gitignore file (Template in the appendix)

## Tech
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]

## Installation and Usage
Clone repository
```sh
git clone https://github.com/ejeee/notes_semar-t-.git
cd notes_semar-t-
```

Install the dependencies

```sh
npm install
```

Setup Database
Use the SQL commands provided in the appendix to create and setup the database:

```sh
CREATE DATABASE notes_db;
USE notes_db;
CREATE TABLE notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    datetime DATETIME NOT NULL,
    note LONGTEXT NOT NULL
);
```
Configure Environment Variables
Create a .env file in your project's root directory and adjust its contents based on the template below:

```sh
APP_PORT=3000
HOST=localhost
USER=root
PASSWORD=""
DATABASE=notes_db
```

Start the Server

```sh
node index.js
```
