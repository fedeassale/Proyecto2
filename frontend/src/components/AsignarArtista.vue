<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" header="Asignar Artista y Canción" :modal="true" :closable="false">
		<div class="p-fluid">
			<!-- Selección de Artista -->
			<div class="p-field">
				<label>Seleccionar Artista</label>
				<select v-model="selectedArtist" class="p-inputtext">
					<option value="" disabled>Selecciona un artista</option>
					<option v-for="artist in artists" :key="artist.id" :value="artist.id">
						{{ artist.name }}
					</option>
				</select>
			</div>
			<!-- seleccion de cancion -->
			<div class="p-field">
				<label>Seleccionar Canción</label>
				<select v-model="selectedSong" class="p-inputtext">
					<option value="" disabled>Selecciona una canción</option>
					<option v-for="song in songs" :key="song.id" :value="song.id">
						{{ song.title }}
					</option>
				</select>
			</div>
		</div>
	
		<template #footer>
			<Button label="Cancelar" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
			<Button label="Asignar" icon="pi pi-check" @click="assignArtistAndSong" severity="contrast" :disabled="!selectedArtist || !selectedSong" />
		</template>
    </Dialog>
</template>
  
<script>
import axios from 'axios';
  
export default {
    props: {
		visible: Boolean,
		festivalId: Number, 
    },
    emits: ['update:visible', 'refreshFestivals','actualizar'], 
    data() {
      	return {
			selectedArtist: '',
			selectedSong: '',
			artists: [],
			songs: [],
      	};
    },
    methods: {
      	async fetchArtistsAndSongs() {
        	try {
				const response = await axios.get("http://localhost:8080/api/artists");
				// Asegurar que la respuesta tiene datos válidos
				if (!Array.isArray(response.data)) {
					console.error("Error: la API no devolvió un array de artistas.", response.data);
					return;
				}
				const artistMap = {};
				response.data.forEach(item => {
					const artistId = item.artist_id;
					if (!artistMap[artistId]) {
					// Si el artista no está en el mapa, lo agregamos
						artistMap[artistId] = {
							id: artistId,
							name: item.nombre, // Nombre del artista
							songs: [] // Lista de canciones
						};
					}
					// Si el item tiene una canción, la agregamos
					if (item.song_id && item.titulo) {
					artistMap[artistId].songs.push({
						id: item.song_id,
						title: item.titulo
						});
					}
				});

				// Convertimos el objeto en un array
				this.artists = Object.values(artistMap);

				// Extraemos todas las canciones únicas
				this.songs = this.artists.reduce((acc, artist) => {
					return acc.concat(artist.songs);
					}, []);

			} catch (error) {
				console.error("Error al obtener artistas:", error);
			}
      	},
      	closeDialog() {
        	this.$emit('update:visible', false);
      	},
      	async assignArtistAndSong() {
				console.log("Artista seleccionado:", this.selectedArtist);
				console.log("Canción seleccionada:", this.selectedSong);
				console.log("Festival seleccionado:", this.festivalId);
			if (!this.festivalId || !this.selectedArtist || !this.selectedSong) return;
	
			try {
				await axios.post('http://localhost:8080/api/assignartisttofestival', {
					festival_id: this.festivalId,
					artist_id: this.selectedArtist,
					song_id: this.selectedSong
				});
			
				this.$emit("actualizar");
				this.$toast.add({ severity: "success", summary: "Éxito", detail: "Artista asignado" });
				this.$emit('refreshFestivals'); // Refrescar la tabla después de la asignación
				this.closeDialog();
			} catch (error) {
				console.error('Error asignando artista y canción:', error);
			}
      	}
    },
    mounted() {
      	this.fetchArtistsAndSongs(); 
    }
};
</script>
<style scoped>
.p-field {
    margin-bottom: 1rem;
}
.p-inputtext {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
}
</style>
