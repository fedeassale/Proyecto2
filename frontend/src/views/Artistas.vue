<template>
	<div class="artistas">
		<h1>Lista de Artistas</h1>
		<TreeTable :value="artistasTree" tableStyle="min-width: 50rem">
			<Column field="nombre" header="Artistas" expander style="width: 33%"></Column>
			<Column field="name" header="Álbum" style="width: 33%"></Column>
			<Column field="titulo" header="Canción" style="width: 33%"></Column>
		</TreeTable>
	</div>
</template>
<script>
import axios from 'axios';
export default {
	data() {
		return {
			artistasTree: [] 
		};
		},
  	async created() {
    	try {
			const response = await axios.get('http://localhost:8080/api/artists');
			this.artistasTree = this.formatTreeData(response.data); // Transformamos los datos
    	} catch (error) {
      		console.error('Error al obtener artistas:', error);
    	}
  	},
  	methods: {
      // Función que transforma los datos para ajustarlos al formato de TreeTable
		formatTreeData(data) {
			const artistasMap = new Map();
	
		data.forEach(item => {
		// Si el artista no existe en el mapa, lo creamos
			if (!artistasMap.has(item.nombre)) {
				artistasMap.set(item.nombre, {
					key: `artista-${item.nombre}`,
					data: { nombre: item.nombre, tipo: "Artista" },
					children: []
				});
			}
			const artista = artistasMap.get(item.nombre);
		// Verificamos si el álbum ya existe dentro del artista
			let album = artista.children.find(a => a.data.name === item.name);
			if (!album) {
				album = {
				key: `album-${item.name}`,
				data: { name: item.name, tipo: "Álbum" },
				children: []
				};
				artista.children.push(album);
			} 
		// Agregamos la canción dentro del álbum
			album.children.push({
				key: `cancion-${item.titulo}`,
				data: { titulo: item.titulo, tipo: "Canción" }
			});
		});
		return Array.from(artistasMap.values()); // Convertimos el Map a un array   
		}
    }
}; 
</script>
<style scoped>
h1{
	text-align: center;
	font-weight: 400;
	font-style: oblique;
	font-size: large;
}
.artistas{
  	height: 90vh;
}
table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
}
th, td {
	border: 1px solid black;
	padding: 10px;
	text-align: left;
}
th {
    background-color: #f4f4f4;
}
</style>
  