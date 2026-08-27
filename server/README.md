# Wilson Sporting Goods — API server

Express 5 + SQLite backend. The database uses Node's built-in `node:sqlite`
module, so there are **no native dependencies** to compile.

## Run

From the project root:

```
npm run server
```

…or from this folder: `npm start`. The API listens on http://localhost:3001.

On first run, `data/wsg.db` is created and seeded automatically from
`src/data/products.js` and `src/data/brands.js`. To force a full reseed:

```
npm run seed
```

> Node prints an `ExperimentalWarning` for `node:sqlite` — that is expected and
> harmless.

## Endpoints

| Method | Path                  | Notes                              |
| ------ | --------------------- | ---------------------------------- |
| GET    | `/api/health`         | Health check                       |
| GET    | `/api/products`       | Supports `?brand=`, `?category=`, `?q=` |
| GET    | `/api/products/:id`   | 404 if not found                   |
| GET    | `/api/brands`         | All brands                         |
| GET    | `/api/brands/:id`     | 404 if not found                   |

In development, Vite proxies `/api` to this server (see `vite.config.js`), so
the frontend can call `/api/...` directly with no CORS setup.

## Dev workflow

Run the two processes in separate terminals:

```
npm run server   # this API on :3001
npm run dev      # the Vite frontend on :5173
```
