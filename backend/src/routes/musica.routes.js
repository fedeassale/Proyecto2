import express from "express";
import {ArtistController} from "../controllers/musica.controller.js";
import { MusicaService } from "../services/musica.service.js";
const router = express.Router();

//LLamar a todos los datos
router.get('/artists', ArtistController.getAllArtist);

//crear todos los datos
router.post('/insertdata', async (req, res) => {
	try {
		const {  nombre, genero, name, titulo, duracion, artist_id, album_id } = req.body;
		const data = await MusicaService.insertData( nombre, genero, name,  titulo, duracion, artist_id, album_id);
		console.log("Datos recibidos en el backend", data);
		res.json(data);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
);
//Actualizar todos los datos
router.put('/updatedata/:artist_id', async (req, res) => {
    try {
        const { artist_id } = req.params;
        const { nombre, genero, album_id, name, id, titulo, duracion } = req.body;
        
        const data = await MusicaService.updateData(artist_id, nombre, genero, album_id, name, id, titulo, duracion);
        console.log("Datos recibidos en el backend", data);
        
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Rutas de Artistas
//Crear artistas
router.post("/createdartists", async (req, res) => {
	try {
		const { nombre, genero } = req.body;
		const artist = await MusicaService.addArtist(nombre, genero);
		res.json(artist);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//Eliminar artista
router.delete("/deleteartists/:id", async (req,res)=>{
	try {
		const { id } = req.params;
		console.log("ID recibido en el backend:", id);
		const deletedArtist = await MusicaService.deleteArtista(id);

		if (!deletedArtist) {
		return res.status(404).json({ error: "Elemento no encontrado" });
		}
		res.json({ message: "Elemento eliminado correctamente" });    
	} catch (error) {
		console.error("Error en el backend al eliminar el artista:", error);
		res.status(500).json({ error: "Error al eliminar el elemento" });
	}
});
//Rutas de Albumes
//Crear albumes
router.post("/createdalbums", async (req, res) => {
	try {
		console.log("Datos recibidos en el backend:", req.body);
		const { name, artist_id } = req.body;
		const album = await MusicaService.addAlbum(name, artist_id);
		res.json(album);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//Rutas de Canciones
//Crear canciones
router.post("/createdsongs", async (req, res) => {
    try {
		console.log("Datos recibidos en el backend:", req.body);
		const { titulo, duracion, album_id } = req.body;
		const song = await MusicaService.addSong(titulo, duracion, album_id);
		res.json(song);
    } catch (error) {
      	res.status(400).json({ error: error.message });
    }
});
//Eliminar canciones
router.delete("/deletesongs/:id", async (req,res)=>{
	try {
		const { id } = req.params;
		console.log("ID recibido en el backend:", id);
		const deletedSong = await MusicaService.deleteSong(id);

		if (!deletedSong) {
		return res.status(404).json({ error: "Elemento no encontrado" });
		}
		res.json({ message: "Elemento eliminado correctamente" });    
	} catch (error) {
		console.error("Error en el backend al eliminar la canción:", error);
		res.status(500).json({ error: "Error al eliminar el elemento" });
	}
});
//Crear Festivales
router.post("/createdfestivals", async (req, res) => {
	try {
		const { nombre, ubicacion, fecha, descripcion } = req.body;
		const festival = await MusicaService.addFestival(nombre, ubicacion, fecha, descripcion);
		res.json(festival);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
//Obtener todos los festivales
router.get("/getfestivals", async (req, res) => {
    try {
		const festivals = await MusicaService.getFestival();
		res.json(festivals);
    } catch (error) {
      	res.status(400).json({ error: error.message });
    }
});
//Editar Festival
router.put("/updatefestivals/:id", async (req, res)=>{
	try {
		const id = parseInt(req.params.id, 10); // Convertir a número
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
		const { nombre_festival, ubicacion, fecha, descripcion } = req.body;
		console.log("Datos recibidos en el backend:", { nombre_festival, ubicacion, fecha, descripcion, id });
		const dataFest = await MusicaService.updateFestival(nombre_festival, ubicacion, fecha, descripcion,id)
		console.log("Datos recibidos en el backend", dataFest);
		res.json(dataFest);
	} catch (error) {
		console.error("Error en updatefestivals:", error);
		res.status(400).json({ error: error.message });
	}
});

//Eliminar festival
router.delete("/deletefestivals/:id", async (req,res)=>{
    try {
		const { id } = req.params;
		console.log("ID recibido en el backend:", id);
		const deletedFestival = await MusicaService.deleteFestival(id);
	
		if (!deletedFestival) {
			return res.status(404).json({ error: "Elemento no encontrado" });
		}
		res.json({ message: "Elemento eliminado correctamente" });    
    } catch (error) {
      	console.error("Error en el backend al eliminar el festival:", error);
      	res.status(500).json({ error: "Error al eliminar el elemento" });
    }
});
//Asignar artista a festival
router.post("/assignartisttofestival", async (req, res) => {
    try {
		console.log("Datos recibidos en el backend:", req.body);
		const { festival_id, artist_id, song_id } = req.body;
		const assign = await MusicaService.assignArtistToFestival(festival_id, artist_id, song_id);
		res.json(assign);
    } catch (error) {
		console.error("Error en el servidor:", error);
		res.status(400).json({ error: error.message });
    }
});
//obtener el artista y la cancion relacionada con el festival
router.get("/getfestivalartistssongs", async (req, res) => {
    try {
		const festivals = await MusicaService.getFestivalsArtistsSongs();
		res.json(festivals);
    } catch (error) {
		console.error("Error al obtener artistas y canciones:", error);
      	res.status(400).json({ error: error.message });
    }
});
//eliminarVinculacionArtistaYCanciones
router.delete("/deleteartistsong/:festival_id/:artist_id", async (req,res)=>{
	try {
		const festival_id = parseInt(req.params.festival_id, 10);
        const artist_id = parseInt(req.params.artist_id, 10);

        console.log("ID recibido en el backend:", festival_id, artist_id);

        if (isNaN(festival_id) || isNaN(artist_id)) {
            return res.status(400).json({ error: "IDs inválidos" });
        }

        const deletedArtistSong = await MusicaService.deleteArtistSong(festival_id, artist_id);
		
		if (!deletedArtistSong) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }

        res.json({ message: "Elemento eliminado correctamente" });
	} catch (error) {
	  	console.error("Error en el backend al eliminar la vinculación:", error);
	  	res.status(500).json({ error: "Error al eliminar el elemento" });
	}
});

export default router;