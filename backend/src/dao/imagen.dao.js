import pool from "../config/db.js";

export class ImagenDAO {
static async obtenerImagenPorId()  {
    try {
      const result = await pool.query(
        "SELECT url_imagen FROM musica.imagenes ");
        return result.rows;
    } catch (error) {
      console.error("Error al obtener la imagen de la BD:", error);
      throw error;
    }
  };
}