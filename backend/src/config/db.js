import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "musica",
    password: "506727",
    port: 5432,
});

pool.connect()
    .then(() => console.log("Conexión a PostgreSQL exitosa"))
    .catch((err) => console.error("Error de conexión a PostgreSQL", err.stack));

export default pool;
