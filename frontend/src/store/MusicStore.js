import { defineStore } from 'pinia';
import axios from 'axios';

export const useMusicStore = defineStore('music', {
  state: () => ({
    artistas: [],
    canciones: [],
  }),
  actions: {
    async fetchArtistas() {
      try {
        const response = await axios.get('http://localhost:8080/api/artists');
        this.artistas = response.data;
        this.canciones = response.data.map(item => ({
          id: item.artist_id,
          nombre: item.nombre,
          genero: item.genero,
          album_id: item.album_id,
          name: item.name,
          titulo: item.titulo,
          duracion: item.duracion,
          song_id: item.song_id,
        }));
      } catch (error) {
        console.error('Error al obtener artistas:', error);
      }
    },
  },
});