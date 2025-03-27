import  { MusicaDAO }  from "../dao/musica.dao.js";

export class MusicaService {
    
    //LLamar a todos los datos
    static async getArtist() {
        return await MusicaDAO.findAllArtist();
    }
    //Insertar todos los datos
    static async insertData(nombre, genero, name, titulo, duracion,artist_id, album_id) {
        if ( !nombre && !artist_id || !genero || !name && !album_id ||  !titulo || !duracion) {
            throw new Error("Todos los campos son requeridos");
        }
        return await MusicaDAO.insertarDatos(nombre, genero, name, titulo, duracion,artist_id, album_id);
    }
    //Actualizar todos los datos
    static async updateData(artist_id, nombre, genero, album_id, name, id, titulo, duracion) {
        if (!artist_id) {
            throw new Error("El ID del artista es obligatorio");
        }
        return await MusicaDAO.updateData(artist_id, nombre, genero, album_id, name, id, titulo, duracion);
    }
    //ARTISTAS
    //Crear artista
    static async addArtist(nombre, genero) {
        if (!nombre || !genero) {
            throw new Error("El nombre y el género son requeridos");
        }
            return await MusicaDAO.createArtist(nombre, genero);
        }
    //Eliminar artista
    static async deleteArtista(id){
    if(!id){
        throw new Error("El id es necesario");
    }
        return await MusicaDAO.deleteArtist(id);
    }
    //ALBUMS
    //Crear album
    static async addAlbum(name, artist_id) {
        if (!name || !artist_id) {
            throw new Error("El nombre y el ID del artista son requeridos");
        }
        return await MusicaDAO.createAlbum(name, artist_id);
    }
    //CANCIONES
    //Crear canciones
    static async addSong(titulo, duracion, album_id) {
        if (!titulo || !duracion || !album_id) {
            throw new Error("Todos los campos son requeridos");
        }
        return await MusicaDAO.createSong(titulo, duracion, album_id);
    }
    //Eliminar canciones
    static async deleteSong(id){
        if(!id){
            throw new Error("El id es necesario");
        }
        return await MusicaDAO.deleteSong(id);
    }
    //Crear Festivales
    static async addFestival(nombre, ubicacion, fecha, descripcion) {
        if (!nombre || !ubicacion || !fecha || !descripcion) {
            throw new Error("Todos los campos son requeridos");
        }
        return await MusicaDAO.createFestival(nombre, ubicacion, fecha, descripcion);
    }
    //Obtener todos los festivales
    static async getFestival() {
        return await MusicaDAO.getFestivals();
    }
    //editar festival
    static async updateFestival(nombre_festival, ubicacion, fecha, descripcion, id){
        if(!id){
            throw new Error("El ID del festival es obligatorio");
        }
        const festivalid = parseInt(id, 10);
            if (isNaN(festivalid)) {
                throw new Error("El ID del festival debe ser un número válido");
            }
        return await MusicaDAO.updateFestivals(nombre_festival, ubicacion, fecha, descripcion, id);
    }
    //eliminar festival
    static async deleteFestival(id){
        if(!id){
            throw new Error("El id es necesario");
        }
        return await MusicaDAO.deleteFestival(id);
    }
    //Asignar artista a festival
    static async assignArtistToFestival(festival_id, artist_id,song_id) {
        if (!festival_id || !artist_id) {
            console.log("Parámetros faltantes:", { festival_id, artist_id, song_id });
            throw new Error("El ID del festival y del artista son requeridos");
        }
        return await MusicaDAO.vincularArtistaYCanciones(festival_id, artist_id,song_id);
    }
    //obtener festivales con artistas y canciones
    static async getFestivalsArtistsSongs() {
        return await MusicaDAO.getFestivalsWithArtistsAndSongs();
    }
    //eliminarVinculacionArtistaYCanciones
    static async deleteArtistSong(festival_id, artist_id){
        if(!festival_id || !artist_id ){
            throw new Error("El id es necesario");
        }
        return await MusicaDAO.eliminarVinculacionArtistaYCanciones(festival_id, artist_id);
    }
}