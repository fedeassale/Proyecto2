import { MusicaService } from "../services/musica.service.js";




export class ArtistController {
      static async getAllArtist(req, res) {
        try {
            const artistas = await MusicaService.getArtist();
            res.json(artistas);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los datos" });
        }
    }
}