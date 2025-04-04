<template>
	<div class="artistas">
		<h1>Lista de Artistas</h1>
		<div class="center-table">
			<TreeTable :value="artistasTree" tableStyle="min-width: 50rem">
				<Column field="nombre" header="Artistas" expander style="width: 33%"></Column>
				<Column field="name" header="Álbum" style="width: 33%"></Column>
				<Column field="titulo" header="Canción" style="width: 33%"></Column>
			</TreeTable>
		</div>
	</div>
</template>
<script>
import { useMusicStore } from '../store/MusicStore.js';
import { mapState, mapActions } from 'pinia';

export default {
	data() {
		return {
			musicStore: useMusicStore(),
		};
		},
  	created() {
		this.fetchArtistas();
  	},
	computed: {
    	...mapState(useMusicStore, ['artistas']),
		artistasTree() {
			return this.formatTreeData(this.artistas);
		}
  	},
  	methods: {
		...mapActions(useMusicStore, ['fetchArtistas']),
		formatTreeData(data) {
			console.log("sadas",data) 
			const artistasMap = new Map();
	
		data.forEach(item => {
			if (!artistasMap.has(item.nombre)) {
				artistasMap.set(item.nombre, {
					key: `artista-${item.nombre}`,
					data: { nombre: item.nombre, tipo: "Artista" },
					children: []
				});
			}
			const artista = artistasMap.get(item.nombre);
			let album = artista.children.find(a => a.data.name === item.name);
			if (!album) {
				album = {
				key: `album-${item.name}`,
				data: { name: item.name, tipo: "Álbum" },
				children: []
				};
				artista.children.push(album);
			} 
			album.children.push({
				key: `cancion-${item.titulo}`,
				data: { titulo: item.titulo, tipo: "Canción" }
			});
		});
		return Array.from(artistasMap.values()); 
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
.center-table {
	margin: 0 auto;
	width: 60%;
}
</style>
  