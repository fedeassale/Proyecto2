<template>
    <div>
        <h1 class="center"><strong>Los mejores Festivales del País</strong></h1>
        <div class="carousel-container">
            <Carousel :value="imagenes" :numVisible="3" :numScroll="1">
                <template #item="slotProps">
                    <div class="border border-surface-200  rounded m-2 p-4">
                        <div class="  image-card image-wrapper">
                            <img :src="slotProps.data.url_imagen" alt="Imagen del festival" class=" rounded image" />
                            <div class="center  festival-nombre">{{ slotProps.data.nombre_festival }}</div>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
        <div class="button-agregarFestival">
            <Button label="Agregar Festival" icon="pi pi-plus" @click="mostrarDialogo"  />
        </div>
        <Dialog v-model:visible="dialogVisible" header="Crear Festival" modal>
            <div class="p-fluid">
                <div class="p-field">
                    <label for="nombre">Nombre</label>
                    <InputText id="nombre" v-model="nuevoFestival.nombre" />
                </div>
                <div class="p-field">
                    <label for="ubi">Ubicación</label>
                    <InputText id="ubi" v-model="nuevoFestival.ubicacion" />
                </div>
                <div class="p-field">
                    <label for="fe">Fecha</label>
                    <DatePicker id="fe" v-model="nuevoFestival.fecha" showIcon />
                </div>
                <div class="p-field">
                    <label for="description">Descripción</label>
                    <Textarea id="description" v-model="nuevoFestival.descripcion" rows="3" />
                </div>
                <Button label="Guardar" icon="pi pi-check" @click="guardarFestival" />
            </div>
        </Dialog>
        <div v-for="festival in festivalesFormateados" :key="festival.id" class="festival-container">
                <div class="festival-header " :style="{ backgroundImage: `url(${festival.url_imagen || imagenes[0]?.url_imagen})`}">       
                <div class="btn-right">
                    <Button icon="pi pi-times" class=" p-button-rounded p-button-secondary" @click="deleteFestival(festival.id)" />
                </div>
                <h2 class="festival-title"><strong>{{ festival.nombre_festival }}</strong></h2>
                <h3 class="center"><strong>Ubicación </strong></h3>
                <h3>{{ festival.ubicacion }}</h3>
                <div class="button-container">
                    <Button label="Agregar Artista" icon="pi pi-plus" @click="abrirDialogo(festival.id)" class="p-button-secondary  "/>
                </div>
                <div class="button-container">
                    <Button label="Editar Festival" icon="pi  pi-pencil" @click="abrirDialogoUpdate(festival.id)" class="p-button-secondary  "/>
                </div>       
            </div>
            <DataTable :value="festival.artistas" responsiveLayout="scroll" class="festival-table">
                <Column field="nombre" header="Artista" style="width: 25%"/>
                <Column field="genero" header="Genero del Artista"style="width: 25%" />
                <Column header="Canciones" style="width: 25%">
                    <template #body="slotProps">
                        <ul>
                            <li v-for="cancion in slotProps.data.canciones" :key="cancion">
                                {{ cancion.titulo }}
                            </li>
                        </ul>
                    </template>
                </Column>
                <Column header="Duracion" style="width: 25%">
                    <template #body="slotProps">
                        <ul>
                            <li v-for="cancion in slotProps.data.canciones" :key="cancion">
                                {{ cancion.duracion }}
                            </li>
                        </ul>
                    </template>
                </Column>
                <Column style="width: 5%">
                    <template #body="slotProps">
                        <Button  icon="pi pi-times" v-if="slotProps.data.nombre" class="tablaElementos w-30 p-button-rounded p-button-secondary"  @click="console.log('Eliminando:', festival.id, slotProps.data.id); eliminarartistascanciones(festival.id, slotProps.data.id)" />
                    </template>
                </Column>
                <template #footer >
                    <div class=" footer-tabla ">
                        <div class="text-footer" colspan="4">
                            <strong>Fecha: </strong>{{ festival.fecha }}
                        </div>
                    </div>
                </template>
            </DataTable>
            <Dialog v-model:visible="dialogVisibleUpdate" header="Editar Festival" modal>
                <div class="p-fluid">
                    <div class="p-field">
                        <label for="nombre_festival">Nombre</label>
                        <InputText id="nombre_festival" name="nombre_festival" v-model="festivalSeleccionadoUpdate.nombre_festival" />
                    </div>
                    <div class="p-field">
                        <label for="ubica">Ubicación</label>
                        <InputText id="ubica" name="ubica" v-model="festivalSeleccionadoUpdate.ubicacion" />
                    </div>
                    <div class="p-field">
                        <label for="fechas">Fecha</label>
                        <DatePicker id="fechas" name="fechas" v-model="festivalSeleccionadoUpdate.fecha" showIcon />
                    </div>
                    <div class="p-field">
                        <label for="descrip">Descripción</label>
                        <Textarea id="descrip" name="descrip" v-model="festivalSeleccionadoUpdate.descripcion" rows="3" />
                    </div>
                    <Button label="Guardar Cambios" icon="pi pi-check" @click="guardarFestivalUpdate" />
                </div>
            </Dialog>
            
            <AsignarArtista v-model:visible="dialogoAsignacion" :festivalId="festivalSeleccionado" @actualizar=" cargarArtistasCanciones" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import AsignarArtista from "../components/AsignarArtista.vue";

export default {
    components: {
      AsignarArtista
    },
  	data() {
    	return {
            imagenes: [],
            dialogVisibleUpdate: false,
            festivalSeleccionadoUpdate: {
                    id: null,
                    nombre_festival: '',
                    ubicacion: '',
                    fecha: null,
                    descripcion: ''
                },
      		dialogVisible: false,
      		dialogoAsignacion: false,
            dialogoAsignacionUpdate:false,
      		festivalSeleccionado: null,
      		nuevoFestival: { nombre: '', ubicacion: '', fecha: null, descripcion: '' },
      		festivales: []
    	};
  	},
      async mounted() {
        await this.cargarFestivales();
        await this.cargarArtistasCanciones();
        await this.cargarImagenes();
    },
  	computed: {
    	festivalesFormateados() {
      		const festivales= this.festivales.map(festival => ({
        	...festival,
        	id: festival.id || festival.festival_id,
        	fecha: festival.fecha.split("T")[0],
            ubicacion: festival.ubicacion || "Sin ubicación",
            url_imagen: festival.url_imagen 
      		}));
              console.log("Festivales formateados:", festivales);
              return festivales;
    	}
  	},
  	methods: {
        async cargarImagenes() {
            try {
                const img = await axios.get("http://localhost:8080/imagen");
                this.imagenes = img.data; // Asigna el array de imágenes al carrusel
            } catch (error) {
                console.error("Error al cargar imágenes:", error);
            }
        },
        abrirDialogoUpdate(festivalId) {
            const festival = this.festivales.find(f => f.id === festivalId);
            if (festival) {
                this.festivalSeleccionadoUpdate = { ...festival }; // Cargar los datos del festival seleccionado
                this.dialogVisibleUpdate = true; // Abrir el diálogo
            }
        },
        async guardarFestivalUpdate() {
            try {
                const response = await axios.put(`http://localhost:8080/api/updatefestivals/${this.festivalSeleccionadoUpdate.id}`, {
                nombre_festival: this.festivalSeleccionadoUpdate.nombre_festival,
                ubicacion: this.festivalSeleccionadoUpdate.ubicacion,
                fecha:  new Date(this.festivalSeleccionadoUpdate.fecha).toISOString().split('T')[0],
                descripcion: this.festivalSeleccionadoUpdate.descripcion
                });
                console.log('Festival actualizado:', response.data);
                this.cargarArtistasCanciones(); // Recargar los festivales después de la actualización
                this.dialogVisibleUpdate = false; // Cerrar el diálogo
            } catch (error) {
                console.error('Error al actualizar el festival:', error);
            }
            },
    	async deleteFestival(id) {
        	if (!id) {
            	console.log("ID recibido en el frontend:", id);
        	return;
        	}
        	try {
            	const response = await axios.delete(`http://localhost:8080/api/deletefestivals/${id}`);
            	console.log("Festival eliminado:", response.data);
            	this.cargarArtistasCanciones();
        } catch (error) {
            console.error("Error al eliminar Festival:", error);
        }
    },
    mostrarDialogo() {
      	this.dialogVisible = true;
    	},
    	async guardarFestival() {
      	try {
			const response = await axios.post('http://localhost:8080/api/createdfestivals', this.nuevoFestival);
			this.festivales.push({ ...response.data, artistas: [] });
			this.dialogVisible = false;
			this.nuevoFestival = { nombre: '', ubicacion: '', fecha: null, descripcion: '' };
      	} catch (error) {
        	console.error('Error al guardar el festival:', error);
      	}
    },
    async cargarFestivales() { 
    	try {
      		const response = await axios.get('http://localhost:8080/api/getfestivals');
			this.festivales = response.data;
            this.festivales = [...this.festivales]; 
            console.log("festivales",response.data)
      	} catch (error) {
      		console.error('Error al obtener festivales:', error);
      	}
    },
    async cargarArtistasCanciones() {
        try {
            const response = await axios.get("http://localhost:8080/api/getfestivalartistssongs");
            

            const festivalesMap = new Map();

            response.data.forEach(row => {
                let festival = festivalesMap.get(row.festival_id);
                if (!festival) {
                    festival = {
                        id: row.festival_id,
                        nombre_festival: row.nombre_festival,
                        fecha: row.fecha.split("T")[0],
                        ubicacion: row.ubicacion,
                        url_imagen: row.url_imagen || null,
                        artistas: []
                    };
                    festivalesMap.set(row.festival_id, festival);
                }

                let artista = festival.artistas.find(a => a.id === row.artista_id);
                if (!artista) {
                    artista = {
                        id: row.artista_id,
                        nombre: row.artista_nombre,
                        genero: row.genero_artista,
                        canciones: []
                    };
                    festival.artistas.push(artista);
                }
                if (row.canciones && Array.isArray(row.canciones)) {
                    artista.canciones = row.canciones; // Asigna el array directamente
                }
            });

                this.festivales = Array.from(festivalesMap.values());
            } catch (error) {
                console.error("Error al obtener artistas y canciones:", error);
            }
        },
        //eliminarVinculacionArtistaYCanciones
        async eliminarartistascanciones(festival_id, artista_id) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/deleteartistsong/${festival_id}/${artista_id}`);
                console.log("Artista eliminado:", response.data);
                this.cargarArtistasCanciones();
            } catch (error) {
                console.error("Error al eliminar Artista:", error);
            }
        },

        abrirDialogo(festivalId) {
            this.festivalSeleccionado = festivalId;
            this.dialogoAsignacion = true;
        },
    }
};
</script>
<style scoped>
h1{
    font-family: 'Poppins', sans-serif;
    font-size: 2rem; 
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}
.image-wrapper {
    position: relative;
    display: inline-block;
    width: 100%; /* Ajusta según necesites */
}

.festival-nombre {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 5px 10px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    width: 80%; 
    font-family: Concert One;
    font-size: 1.3rem;
}
.button-agregarFestival {
    text-align: center;
    margin-top: 2rem; 
    margin-bottom: 3rem; 
}

.button-agregarFestival .p-button {
    background-color: #2c3e50; 
    color: white; 
    font-size: 1.1rem; 
    padding: 1rem 2rem; 
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
    transition: all 0.3s ease-in-out;
}
.button-agregarFestival .p-button:hover {
    background-color: #34495e; 
    transform: scale(1.05); 
}
.button-agregarFestival .p-button:focus {
    box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.5); 
}
.carousel-container {
    width: 100%;
    max-width: 1500px;
    margin: auto;
    padding: 20px 0;
}
.image-card {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.image-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
}
.image {
    width: 100%;
    height: 400px; 
    object-fit: cover;
    border-radius: 12px;
    transition: opacity 0.3s ease;
}
.image-card:hover .image {
  opacity: 0.9;
}
.festival-header {
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    text-shadow: 8px 8px 16px black; 
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.festival-table {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
}
.festival-container {
    width: 60%;
    margin: auto;
    margin-top: 20px;
    border: 1px solid #000000;
    border-radius: 12px;
    background-color: white;
}
.festival-title {
    font-family: Concert One; 
	text-align: center;
	font-size: 2.5rem;
	font-weight: bold;
	margin-bottom: 20px;
    text-shadow: 8px 8px 16px black; 
}
.festival-title strong {
	display: inline-block;
	padding: 10px 20px;
	border-radius: 5px;
}
.right {
	text-align: right;
}
.center{
    text-align: center;
}
.btn-right{
    display: flex;
    justify-content: flex-end; 
    margin-top: 5px; 
}
.button-container {
    display: flex;
    justify-content: flex-end; 
    margin-top: 20px; 
}
.button-agregarFestival {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 200px; 
}
.footer-tabla{
    width: 100%; /* Asegura que ocupe todo el ancho de la tabla */
    text-align: center; 
    background-color: #000000; 
    padding: 10px; 
    font-weight: bold; 
    border-radius: 10px; 
    display: flex;
    justify-content: center;
    align-items: center;
}
.text-footer{
    color: white;
    margin: 0px;
}
</style>