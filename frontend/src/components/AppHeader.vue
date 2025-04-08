<template>
	<header class="header">  
		<Menubar :model="items" class="menu-bar">
			<template #item="{ item, props }">
				<a v-ripple class=" menu-item" v-bind="props.action">
					<span>{{ item.label }}</span>
				</a>
			</template>
		</Menubar>
	</header>
</template>
<script>
import Menubar from "primevue/menubar";
export default {
	components: {
		Menubar
	},
	data() {
		return {
			items: [
				{
				label: "Inicio",
				icon: 'pi pi-home',
				command: () => this.$router.push("/"),
				},
				{
				label: "Datos",
				command: () => this.$router.push("/datos"),
				},
				{
				label: "Productos",
				command: () => this.$router.push("/productos"),
				},
				{
				label: "Editor Musica",
				command: () => this.$router.push("/musica"),
				},
				{
				label: "Musica",
				command: () => this.$router.push("/artistas"),
				},
				{
				label: "Festivales",
				command: () => this.$router.push("/festivales"),
				},
			],
		};
	},
};
</script>
<style scoped>
.header {
	background-color: #2c3e50; /* Igual que el footer */
	padding: 2rem 0;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilo de la barra de navegación */
.menu-bar {
	background: transparent !important;
	border: none;
	box-shadow: none !important;
	display: flex;
	justify-content: center;
	padding: 0 !important;
    margin: 0 !important;
}
/* Elimina cualquier fondo blanco en los elementos del menú */
.p-menubar-root-list,
.p-menubar .p-menuitem-link,
.p-menubar .p-menuitem {
	background: transparent !important;
	color: rgb(2, 0, 0) !important;
	border: none !important;
    box-shadow: none !important;
}

/* Opcional: Asegura que los ítems no tengan bordes molestos */
.p-menubar .p-menuitem {
	border: none !important;
}

/* Estilo de los enlaces del menú */
.menu-item {
	color: rgb(255, 255, 255);
	font-size: 1rem;
	padding: 10px 15px;
	text-decoration: none;
}

/* Efecto hover en los enlaces */
.menu-item:hover {
	color: #f39c12;
}
@media (max-width: 960px) {
    .p-menubar-root-list,
    .p-menubar .p-menuitem-link,
    .p-menubar .p-menuitem {
        color: black !important; /* Texto en negro en móviles */
        background-color: white !important; /* Fondo blanco en el submenú */
    }

    /* Ajusta también los enlaces */
    .menu-item {
        color: black !important;
    }

    /* Hover en móviles */
    .menu-item:hover {
        color: #f39c12 !important;
    }
}
</style>