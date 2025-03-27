<template>
	<div class="artistas">
		<h1>Lista de Canciones</h1>
		<DataTable :value="cancionesFlat" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem " class="mb-40"
			paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
			currentPageReportTemplate="{first} to {last} of {totalRecords}">
			<Button label="Agregar" icon="pi pi-plus" @click="mostrarDialog" class="ml-4" severity="contrast" />
			<Column field="titulo" header="Canción" style="width: 20%">
				<template #body="slotProps">
					{{ slotProps.data.titulo }}
				</template>
			</Column>
			<!-- <Column style="width: 10%">
				<template #body="slotProps">
					<Button v-if="slotProps.data.titulo"  icon="pi pi-pencil" class="p-button-rounded p-button-secondary" @click="abrirModalEdicionCancion(slotProps.data)" />
				</template>
			</Column> -->
			<Column field="duracion" header="Duración" style="width: 15%">
				<template #body="slotProps">
					{{ slotProps.data.duracion }}
				</template>
			</Column>
			<Column field="name" header="Álbum" style="width: 25%" headerClass="text-align:center;" >
				<template #body="slotProps">
					{{ slotProps.data.name }}
				</template>
			</Column>
			<!-- <Column style="width: 10%">
				<template #body="slotProps">
					<Button v-if="slotProps.data.name" icon="pi pi-pencil" class="p-button-rounded p-button-secondary" @click="abrirModalEdicionAlbum(slotProps.data)" />
				</template>
			</Column> -->
			<Column field="nombre" header="Artista" style="width: 30%">
				<template #body="slotProps">
					{{ slotProps.data.nombre }}
				</template>
			</Column>
			<!-- <Column style="width: 10%">
				<template #body="slotProps">
					<Button v-if="slotProps.data.nombre" icon="pi pi-pencil" class="p-button-rounded p-button-secondary" @click="abrirModalEdicion(slotProps.data)" />
				</template>
			</Column> -->
			<Column header="Editar" style="width: 10%">
				<template #body="slotProps">
					<Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary" @click="abrirModalEdicion(slotProps.data)" />
				</template>
			</Column>
			<Column header="Eliminar" style="width: 5%">
				<template #body="slotProps">
					<Button icon="pi pi-times-circle" class="p-button-rounded p-button-danger" @click="eliminarCancion(slotProps.data.song_id)" />
				</template>
			</Column>
			<Column header="Eliminar Artistas" style="width:  5%">
				<template #body="slotProps">
					<Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="eliminarArtista(slotProps.data.id)" />
				</template>
			</Column>
		</DataTable>
		<Dialog v-model:visible="dialogEdicionVisible" header="Editar Datos" :modal="true">
			<div class="p-fluid formContainer">
				<div class="p-field formField">
					<label for="nombre">Nombre del Artista</label>
					<InputText v-model="datosEditados.nombre" />
				</div>
				<div class="p-field formField">
					<label for="genero">Género del Artista</label>
					<InputText v-model="datosEditados.genero" />
				</div>
				<div class="p-field formField">
					<label for="name">Nombre del Álbum</label>
					<InputText v-model="datosEditados.name" />
				</div>
				<div class="p-field formField">
					<label for="titulo">Título de la Canción</label>
					<InputText v-model="datosEditados.titulo" />
				</div>
				<div class="p-field formField">
					<label for="duracion">Duración de la Canción</label>
					<InputText v-model="datosEditados.duracion" />
				</div>
			</div>
			<template #footer>
				<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="dialogEdicionVisible = false" />
				<Button label="Guardar" icon="pi pi-check" class="p-button-primary" @click="guardarEdicion" />
			</template>
		</Dialog>
		<!-- <Formulario @data-updated="cargarArtistas"/> -->
		<InsertDataDialog :dialogVisible="dialogVisibleGeneral" @update:dialogVisible="dialogVisibleGeneral = $event"  @data-updated-2="cargarArtistas"/>
	</div>
</template>
<script>
import axios from 'axios';
import Formulario from '../components/Formulario.vue';
import InsertDataDialog from '../components/AgregarDatos.vue';

export default {
	components:{
			Formulario,
			InsertDataDialog
	},
	data() {
		return {
		cancionesFlat: [],
		dialogEdicionVisible: false,
		datosEditados: {
				id: null,
				nombre: '',
				genero: '',
				name: '',
				titulo: '',
				duracion: '',
				artist_id: null,
				album_id: null
			},
		dialogVisibleGeneral: false
		};
	},
	async created() {
		await this.cargarArtistas();
	},
	methods: {
		abrirModalEdicion(datos) {
			console.log('!!!!!!!!!!!!!!!!!',datos)
			this.datosEditados = { ...datos };
			this.dialogEdicionVisible = true;
		},
		async guardarEdicion() {
			console.log("Datos antes de actualizar:", this.datosEditados);
			try {
				const response = await axios.put(`http://localhost:8080/api/updatedata/${this.datosEditados.id}`, {
					nombre: this.datosEditados.nombre,
					genero: this.datosEditados.genero,
					name: this.datosEditados.name,
					titulo: this.datosEditados.titulo,
					duracion: this.datosEditados.duracion,
					id: this.datosEditados.song_id,
					album_id: this.datosEditados.album_id
				});
				console.log("Datos actualizados:", response.data);
				this.dialogEdicionVisible = false;
				this.cargarArtistas(); // Recargar datos
			} catch (error) {
				console.error("Error al actualizar los datos:", error);
			}
		},
		mostrarDialog() {
			this.dialogVisibleGeneral = true;
		},
		formatFlatData(data) {
			return data.map((item) => ({
				id: item.artist_id,
				nombre: item.nombre,
				genero: item.genero,
				album_id: item.album_id,
				name: item.name,
				titulo: item.titulo,
				duracion: item.duracion,
				song_id: item.song_id 
			}));
		},
		async eliminarArtista(id) {
			if (!id) {
				console.log("ID recibido en el frontend:", id);
				return;
			}
			try {
				const response = await axios.delete(`http://localhost:8080/api/deleteartists/${id}`);
				console.log("Artista eliminado:", response.data);
				this.cargarArtistas();
			} catch (error) {
				console.error("Error al eliminar el artista:", error);
			}
		},
		//eliminar cancion desde vue
		async eliminarCancion(id) {
			if (!id) {
				console.log("ID recibido en el frontend:", id);
				return;
			}
			try {
				const response = await axios.delete(`http://localhost:8080/api/deletesongs/${id}`);
				console.log("Canción eliminada:", response.data);
				this.cargarArtistas();
			} catch (error) {
				console.error("Error al eliminar la canción:", error);
			}
		},
		async cargarArtistas() {
		try {
			const response = await axios.get('http://localhost:8080/api/artists');
			this.cancionesFlat = this.formatFlatData(response.data);
		} catch (error) {
			console.error('Error al obtener artistas:', error);
		}
		}
	}
} 
</script>
<style scoped>
.formContainer {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 1rem; 
	padding: 1rem;
}

.formField {
	display: flex;
	flex-direction:column;
	align-items: flex-start;
	width: 100%;
}
h1{
	text-align: center;
	font-weight: 400;
	font-style: oblique;
	font-size: large;
}
.centrar{
	text-align: center;
}
</style>