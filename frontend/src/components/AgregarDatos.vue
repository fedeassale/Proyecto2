<template>
    <Dialog :visible="dialogVisible" @update:visible="emitirCierre" header="Agregar Datos" modal :closable="false">
        <div class="p-fluid formContainer">
            <div class="field formField">
                <label>Artista</label>
                <select v-model="form.artist_id" class="p-inputtext">
                    <option value="" disabled>Selecciona un artista</option>
                    <option v-for="artist in artistas" :key="artist.id" :value="artist.id">
                    {{ artist.nombre }}
                    </option>
                </select>
                <InputText v-model="form.nombre" placeholder="O ingresa un nuevo artista" />
            </div>
            <div class="field formField">
                <label>Género</label>
                <InputText v-model="form.genero" />
            </div>
            <div class="field formField">
                <label>Nombre del Álbum</label>
                <select v-model="form.album_id" class="p-inputtext ">
                    <option value="" disabled>Selecciona un album</option>
                    <option v-for="album in albums" :key="album.id" :value="album.id">
                    {{ album.name }}
                    </option>
                </select>
                <InputText v-model="form.name" placeholder="O ingresa un nuevo álbum" />
            </div>
            <div class="field formField">
                <label>Título de la Canción</label>
                <InputText v-model="form.titulo" />
            </div>
            <div class="field formField">
                <label>Duración</label>
                <InputText v-model="form.duracion" mode="decimal" :minFractionDigits="2" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="emitirCierre(false)" />
            <Button label="Guardar" icon="pi pi-check" class="p-button-primary" @click="guardarDatos" />
        </template>
    </Dialog>
</template>
<script>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
  
export default {
    props: {
        dialogVisible: Boolean
    },
    emits: ['update:dialogVisible'],
    data() {
        return {
            form: {
                artist_id: null,
                nombre: '',
                genero: '',
                album_id: null,
                name: '',
                titulo: '',
                duracion: ''
        },
        artistas: [],
        albums: [],
        toast: useToast()
        };
    },
    async created() {
        await this.cargarArtistasYAlbums();
    },
    emits: ["update:dialogVisible", "data-updated-2"], 
    methods: {
        async cargarArtistasYAlbums() {
            try {
                const response = await axios.get('http://localhost:8080/api/artists'); 
                // console.log("Respuesta del servidor:", response.data);
                const artistasMap = new Map();
                response.data.forEach(artista => {
                if (!artistasMap.has(artista.artist_id)) {
                    artistasMap.set(artista.artist_id, {
                    id: artista.artist_id,
                    nombre: artista.nombre
                });
            }
        });
        this.artistas = Array.from(artistasMap.values());
        
        const albumsMap = new Map();
        response.data.forEach(artista => {
          if (artista.album_id && !albumsMap.has(artista.album_id)) {
            albumsMap.set(artista.album_id, {
              id: artista.album_id,
              name: artista.name
            });
          }
        });
        this.albums = Array.from(albumsMap.values());
            } catch (error) {
            console.error("Error cargando artistas y álbumes:", error);
            }
        },
        emitirCierre(valor = false) {
            this.$emit('update:dialogVisible', valor);
        },
        async guardarDatos() {
        try {
        const data = {
            artist_id: this.form.artist_id || null,
            nombre: this.form.artist_id ? null : this.form.nombre.trim(),
            genero: this.form.genero,
            album_id: this.form.album_id || null,
            name: this.form.album_id  ? null : this.form.name.trim(),
            titulo: this.form.titulo,
            duracion: this.form.duracion
        };
        await axios.post('http://localhost:8080/api/insertdata', data);
        this.toast.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados', life: 3000 });
        this.$emit("data-updated-2");
        //refresh del formulario
        this.form.artist_id = null;
        this.form.nombre = '';
        this.form.genero = '';
        this.form.album_id = null;
        this.form.name = '';
        this.form.titulo = '';
        this.form.duracion = '';

        this.emitirCierre(false);
      } catch (error) {
        this.toast.add({ severity: 'error', summary: 'Error', detail: error.response?.data?.error || 'No se pudo guardar', life: 3000 });
        }
      }
    },
};
</script>
<style scoped>
.formContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem; /* Espacio entre los elementos */
    padding: 1rem;
}

.formField {
    display: flex;
    flex-direction:column;
    align-items: flex-start;
    width: 100%;
}
.field {
    margin-bottom: 1rem;
}
</style>
  