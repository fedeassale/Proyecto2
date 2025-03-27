import pool from "../config/db.js";

export class FormDAO {
    static async create(data) {
        try {
        const { asunto, ingreso, categoria } = data;
        const query = "INSERT INTO musica.forms (asunto, ingreso, categoria) VALUES ($1, $2, $3) RETURNING *";
        const values = [asunto, ingreso, categoria];
        const result = await pool.query(query, values);
        console.log("Resultado de la consulta de inserción:", result);
        return result.rows[0];
    } catch (error) {
        console.error("Error al ejecutar la consulta SQL:", error);
        throw new Error("Error al insertar en la base de datos");
    }
    }

    static async findAll() {
        const result = await pool.query("SELECT * FROM musica.forms");
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query("SELECT * FROM musica.forms WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async updateById(id, data) {
        const { asunto, ingreso, categoria } = data;
        const query = "UPDATE musica.forms SET asunto = $1, ingreso = $2, categoria = $3 WHERE id = $4 RETURNING *";
        const values = [asunto, ingreso, categoria, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async deleteById(id) {
        const query = "DELETE FROM musica.forms WHERE id = $1 RETURNING *";
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}