import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'
import { mkdirSync } from 'node:fs'

// The SQLite file lives in server/data/ and is resolved relative to this
// module, so it works regardless of the current working directory.
const dataDir = join(import.meta.dirname, 'data')
mkdirSync(dataDir, { recursive: true })

export const db = new DatabaseSync(join(dataDir, 'wsg.db'))

// Column names match the shape the frontend expects, so `SELECT *` can be
// returned straight to the client without any field renaming.
db.exec(`
  CREATE TABLE IF NOT EXISTS brands (
    id     TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    type   TEXT NOT NULL,
    logo   TEXT,
    banner TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    brand       TEXT NOT NULL,
    brandId     TEXT NOT NULL,
    category    TEXT NOT NULL,
    price       INTEGER NOT NULL,
    image       TEXT NOT NULL,
    hoverImage  TEXT,
    description TEXT NOT NULL
  );
`)
