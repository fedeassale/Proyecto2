import pool from "../config/db.js";

export class ImagenDAO {
	static async obtenerImagenPorId()  {
		try {
			const result = await pool.query(
				// "SELECT url_imagen FROM musica.imagenes ");
				"SELECT i.url_imagen, f.nombre_festival AS nombre_festival FROM musica.imagenes i JOIN musica.festivales f ON f.imagen_id = i.id");
				return result.rows;
		} catch (error) {
			console.error("Error al obtener la imagen de la BD:", error);
			throw error;
		}
  	};
}