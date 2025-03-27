import pool from "../config/db.js";

export class MusicaDAO {
  //LLamar a todos los datos
	static async findAllArtist() {
		const result = await pool.query(
			'SELECT musica.artistas.id AS artist_id, musica.artistas.nombre,musica.artistas.genero, musica.albums.id AS album_id, musica.albums.name, musica.canciones.id AS song_id, musica.canciones.titulo,musica.canciones.duracion FROM musica.artistas   LEFT JOIN  musica.albums  ON musica.artistas.id = musica.albums.artist_id  LEFT JOIN  musica.canciones  ON musica.albums.id = musica.canciones.album_id ORDER BY musica.canciones.titulo , musica.albums.name,musica.artistas.nombre')
		return result.rows;            
	}
	//Insertar todos los datos
	static async insertarDatos(nombre, genero, name, titulo, duracion,artist_id, album_id) {
		const client = await pool.connect();
		try {
			// Iniciar la transacción
			await client.query("BEGIN");
			// Insertar artista
			if (!artist_id) {
				const artistaQuery = `INSERT INTO musica.artistas (nombre, genero) VALUES ($1, $2) RETURNING id`;
				const artistaValues = [nombre, genero];
				const artistaResult = await client.query(artistaQuery, artistaValues);
				artist_id = artistaResult.rows[0].id;
			}
			// Insertar álbum asociado al artista
			if (!album_id) {
				const albumQuery = `INSERT INTO musica.albums (name, artist_id) VALUES ($1, $2) RETURNING id`;
				const albumValues = [name, artist_id];
				const albumResult = await client.query(albumQuery, albumValues);
				album_id = albumResult.rows[0].id;
			}
			// Insertar canción asociada al álbum
			const cancionQuery = `INSERT INTO musica.canciones (titulo, duracion, album_id) VALUES ($1, $2, $3)`;
			const cancionValues = [titulo, duracion, album_id];
			await client.query(cancionQuery, cancionValues); 
			// Confirmar la transacción
			await client.query("COMMIT");
			return { artist_id, album_id };
		} catch (error) {
			await client.query("ROLLBACK"); // Revertir cambios en caso de error
			console.error("Error en la transacción:", error);
		} finally {
			client.release(); 
		}
	}
	//Actualizar todos los datos
	static async updateData(artist_id, nombre, genero, album_id, name, id, titulo, duracion) {
		const client = await pool.connect();
		try{
			await client.query("BEGIN");

			if(nombre !==undefined || genero !== undefined) {
				const artistQuery = 'UPDATE musica.artistas SET nombre = COALESCE($1, nombre), genero = COALESCE($2, genero) WHERE id = $3'
				await client.query(artistQuery,[nombre,genero,artist_id]);
			}

			if(album_id && name !== undefined) {
				const albumQuery = `UPDATE musica.albums SET name = $1 WHERE id = $2`;
				await client.query(albumQuery,[name, album_id]);
			}

			if(id && (titulo !== undefined || duracion !== undefined )) {
				const songQuery =  `UPDATE musica.canciones SET titulo = COALESCE($1, titulo), duracion = COALESCE($2, duracion) WHERE id = $3`;
				await client.query(songQuery,[titulo,duracion, id ]);
			}

			await client.query("COMMIT");
			return { artist_id,album_id,id};	
		} catch(error){
			await client.query("ROLLBACK");
			console.error("Error en la transaccion", error);
			throw error;
		} finally {
			client.release();
		}
	}
	//ARTISTAS
	//crear artistas
	static async createArtist(nombre, genero) {
		const result = await pool.query(
			"INSERT INTO musica.artistas (nombre, genero) VALUES ($1, $2) RETURNING *",
			[nombre, genero]
			);
		return result.rows[0];
	}
	//Editar artistas
	static async updateArtist(id,nombre, genero){
		const result = await pool.query(
			"UPDATE musica.artistas SET nombre = $1, genero = $2 WHERE id = $3 RETURNING *",
			[nombre, genero, id]
		);
		if (result.rowCount === 0) {
			throw new Error("No se encontró el artista con el ID proporcionado");
		}
		return result.rows[0];
	}
	//Eliminar artistas
	static async deleteArtist(id){
		const result = await pool.query ("DELETE FROM musica.artistas WHERE id = $1 ",
			[id]);
			console.log("Resultado de eliminación:", result.rows);
			return result.rowCount > 0;
		}
	//ALBUMS
	//Crear albums 
	static  async createAlbum(name, artist_id) {
		const result = await pool.query(
			"INSERT INTO musica.albums (name, artist_id) VALUES ($1, $2) RETURNING *",
			[name, artist_id]
		);
		return result.rows[0];
	}
	//Editar album
	static async updateAlbum(id,name, artist_id){
		const result = await pool.query(
			"UPDATE musica.albums SET name = $1, artist_id = $2 WHERE id = $3 RETURNING *",
			[name, artist_id, id]
		);
		if (result.rowCount === 0) {
			throw new Error("No se encontró el album con el ID proporcionado");
		}
		return result.rows[0];
	}
	//CANCIONES
	//Crear canciones
	static async createSong(titulo, duracion, album_id) {
		const result = await pool.query(
			"INSERT INTO musica.canciones (titulo, duracion, album_id) VALUES ($1, $2, $3) RETURNING *",
			[titulo, duracion, album_id]
			);
		return result.rows[0];
	}
	//Editar canciones
	static async updateSong(id,titulo, duracion, album_id){
		const result = await pool.query(
			"UPDATE musica.canciones SET titulo = $1, duracion = $2, album_id = $3 WHERE id = $4 RETURNING *",
			[titulo, duracion, album_id, id]
		);
		if (result.rowCount === 0) {
			throw new Error("No se encontró la canción con el ID proporcionado");
		}
		return result.rows[0];
	}
	//Eliminar canciones
	static async deleteSong(id){
		const result = await pool.query ("DELETE FROM musica.canciones WHERE id = $1 ",
			[id]);
		console.log("Resultado de eliminación:", result.rows);
		return result.rowCount > 0;
	}
	
	//Festivales
	//Crear festivales
	static async createFestival(nombre, ubicacion, fecha, descripcion) {
		const query = `INSERT INTO musica.festivales (nombre_festival, ubicacion, fecha, descripcion) VALUES ($1, $2, $3, $4) RETURNING *`;
		const values = [nombre, ubicacion, fecha, descripcion];
		const { rows } = await pool.query(query, values);
		return rows[0];
	};
  	//Obtener festivales
  	static async getFestivals() {
		const query = `SELECT * FROM musica.festivales ORDER BY fecha`;
		const { rows } = await pool.query
		(query);
		return rows;
  	};
	//Editar festivales
	static async updateFestivals(nombre_festival, ubicacion, fecha, descripcion, festivalid){
		console.log("Datos recibidos en el back dao:", { nombre_festival, ubicacion, fecha, descripcion, festivalid });
		const result = await pool.query(
			"UPDATE musica.festivales SET nombre_festival= $1, ubicacion= $2, fecha = $3, descripcion = $4 WHERE id = $5",
			[nombre_festival, ubicacion, fecha, descripcion, festivalid]
		);
		if(result.rowCount === 0){
			throw new Error("No se encontró el festival con el ID proporcionado");
		}
		return result.rows[0];
	}

  	//Eliminar festivales
  	static async deleteFestival(id) {
		const query = `DELETE FROM musica.festivales WHERE id = $1`;
		const { rowCount } =
		await pool.query(query, [id]);
		return rowCount > 0;
  	};

	//NUEVA
	static async vincularArtistaYCanciones(festival_id, artist_id, song_id) {
		const client = await pool.connect();
		try {
			await client.query('BEGIN');
	
			// 1. Obtener o crear la relación festival-artista
			const result = await client.query(
				`INSERT INTO musica.festival_artista (festival_id, artist_id)
				 VALUES ($1, $2) 
				 ON CONFLICT (festival_id, artist_id) DO NOTHING
				 RETURNING id`,
				[festival_id, artist_id]
			);
	
			let festivalArtistaId = result.rows.length > 0 ? result.rows[0].id : null;
	
			if (!festivalArtistaId) {
				const fetchId = await client.query(
					`SELECT id FROM musica.festival_artista 
					 WHERE festival_id = $1 AND artist_id = $2`,
					[festival_id, artist_id]
				);
				festivalArtistaId = fetchId.rows[0].id;
			}
	
			// 2. Vincular la canción al festival-artista
			await client.query(
				`INSERT INTO musica.festival_artista_cancion (festival_artista_id, song_id) 
				 VALUES ($1, $2) 
				 ON CONFLICT (festival_artista_id, song_id) DO NOTHING`,
				[festivalArtistaId, song_id]
			);
	
			await client.query('COMMIT');
			return { success: true, message: 'Artista y canciones vinculados correctamente' };
		} catch (error) {
			await client.query('ROLLBACK');
			console.error('Error en la vinculación:', error);
			throw error;
		} finally {
			client.release();
		}
	}
	static async getFestivalsWithArtistsAndSongs() {
		const query = `
			SELECT 
				f.id AS festival_id, 
				f.nombre_festival, 
				f.fecha, 
				f.ubicacion, 
				a.id AS artista_id, 
				a.nombre AS artista_nombre, 
				a.genero AS genero_artista,
				COALESCE(
					JSON_AGG(
						DISTINCT JSONB_BUILD_OBJECT(
							'song_id', c.id,
							'titulo', c.titulo, 
							'duracion', c.duracion
						)
					) FILTER (WHERE c.id IS NOT NULL), 
					'[]'
				) AS canciones
			FROM musica.festivales f
			LEFT JOIN musica.festival_artista fa ON f.id = fa.festival_id
			LEFT JOIN musica.artistas a ON fa.artist_id = a.id
			LEFT JOIN musica.festival_artista_cancion fac ON fa.id = fac.festival_artista_id
			LEFT JOIN musica.canciones c ON fac.song_id = c.id
			GROUP BY f.id, a.id, a.genero
			ORDER BY f.fecha, a.nombre;

		`;
		const { rows } = await pool.query(query);
		return rows;
	}

	//Eliminar vinculación de artista y canción
	static async eliminarVinculacionArtistaYCanciones(festival_id, artist_id) {
		const query = `
			DELETE FROM musica.festival_artista
        	WHERE festival_id = $1 AND artist_id = $2;
		`;
		const { rowCount } = await pool.query(query, [festival_id, artist_id]);
		return rowCount > 0;
	}
}