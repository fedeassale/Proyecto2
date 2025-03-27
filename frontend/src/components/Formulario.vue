<template>
    <div class="formularios">
		<div>
			<form @submit.prevent="addArtist" class="card">
				<h2 class="cardElements">Agregar Nuevo Artista</h2>
				<input v-model="newArtist.nombre" type="text" placeholder="Nombre del artista" class="cardElements" required />
				<input v-model="newArtist.genero" type="text" placeholder="Género musical" class="cardElements" required />
				<Button type="submit" class="cardElements" severity="contrast" label="Agregar Artista"></Button>
			</form>
		</div>
		<div>
			<form @submit.prevent="addAlbum" class="card">
				<h2 class="cardElements">Agregar Nuevo Álbum</h2>
				<input v-model="newAlbum.name" type="text" placeholder="Nombre del álbum" class="cardElements" required />
				<select v-model="newAlbum.artist_id" class="cardElements" required>
					<option v-for="artist in uniqueArtists" :key="artist.artist_id" :value="artist.artist_id" class="cardElements">
						{{ artist.nombre }}
					</option>
				</select>
				<Button type="submit" class="cardElements" severity="contrast" label="Agregar Álbum"></Button>
			</form>
		</div>
		<div>
			<form @submit.prevent="addSong" class="card">
				<h2 class="cardElements">Agregar Nueva Canción</h2>
				<input v-model="newSong.titulo" type="text" placeholder="Título de la canción" class="cardElements" required />
				<input v-model="newSong.duracion" type="text" placeholder="Duración (mm:ss)" class="cardElements" required />
				<select v-model="newSong.album_id" class="cardElements" required>
					<option v-for="album in uniqueAlbums" :key="album.id" :value="album.id">
						{{ album.name }}
					</option>
				</select>
				<Button type="submit" class="cardElements" severity="contrast" label="Agregar Canción"></Button>
			</form>
		</div>
    </div>
</template>
<script>
import axios from "axios";
  
export default {
    data() {
		return {
			newArtist: { nombre: "", genero: "" },
			newAlbum: { name: "", artist_id: null },
			newSong: { titulo: "", duracion: "", album_id: null },
			artists: [],
			albums: []
		};
    },
    async created() {
        await this.fetchArtists();
    },
    computed: {
		uniqueArtists() {
			const seenNames = new Set();
			return [...this.artists.filter(artist => {
			if (seenNames.has(artist.nombre)) {
				return false;
			} else {
				seenNames.add(artist.nombre);
				return true;
			}
    		})];
  		},
  		uniqueAlbums() {
		const seenAlbums = new Set();
			return [...this.artists
				.filter(artist => artist.album_id !== null)
				.map(artist => ({ id: artist.album_id, name: artist.name }))
				.filter(album => {
				if (seenAlbums.has(album.name)) {
					return false;
				} else {
					seenAlbums.add(album.name);
					return true;
				}
        	})];
    	}
	},
    methods: {
		async fetchArtists() {
			try {
			const response = await axios.get("http://localhost:8080/api/artists");
			this.artists = [...response.data];
			} catch (error) {
			console.error("Error al obtener artistas:", error);
			}
		},
		async addArtist() {
			try {
				await axios.post("http://localhost:8080/api/createdartists", this.newArtist);
				this.newArtist.nombre = "";
				this.newArtist.genero = "";
				await this.fetchArtists();
				this.$emit("data-updated");
			
			} catch (error) {
				console.error("Error al agregar artista:", error);
			}
		},
		async addAlbum() {
			try {
				const response = await axios.post("http://localhost:8080/api/createdalbums", this.newAlbum);
				this.albums.push(response.data);
				this.newAlbum.name = "";
				this.newAlbum.artist_id = null;
				await this.fetchArtists();
				this.$emit("data-updated");
			} catch (error) {
				console.error("Error al agregar álbum:", error);
			}
		},
		async addSong() {
			try {
				await axios.post("http://localhost:8080/api/createdsongs", this.newSong);
				this.newSong.titulo = "";
				this.newSong.duracion = "";
				this.newSong.album_id = null;
				await this.fetchArtists();
				this.$emit("data-updated");
			} catch (error) {
				console.error("Error al agregar canción:", error);
			}
		}
    }
};
</script>
<style scoped>
.formularios{
	display:flex;
	justify-content: space-around;
	align-items: center;
}
.card{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 10px;
	border: 2px;
	border-color: rgb(231, 231, 231);
	border-style: solid;
	border-radius: 10px;
	transition: transform 0.3s ease; 
	height: 350px;
	width: 300px; 
}
.card:hover{
	transform: translateX(10px); 
	border: 2px solid ;
	border-color: black;
}
.cardElements{
	margin:10px;
	align-items: center;
	text-align: center;
}
h2{
	font-style: oblique;
	font-size: large;
}
input{
	padding: 5px;
	border: 2px solid rgb(209, 207, 207);
	border-radius: 5px;
}
input:hover{
 	border: 2px solid black;
}
select{
	padding: 5px;
	border: 2px solid rgb(209, 207, 207);
	border-radius: 5px;
}
select:hover{
  	border: 2px solid black;
}
</style>