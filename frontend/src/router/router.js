import { createRouter, createWebHistory } from 'vue-router';
import Form from '@/views/Form.vue';
import Datos from '@/views/Datos.vue';
import Productos from '@/views/Productos.vue';
import Artistas from '@/views/Artistas.vue';
import Musica from '@/views/Musica.vue';
import Festivales from '@/views/Festivales.vue';

const routes = [
	{
		path: '/',
		component: Form
	},
	{
		path: '/datos',
		component: Datos
	},
	{
		path:'/productos',
		component: Productos
	},
	{
		path:'/artistas',
		component: Artistas
	},
	{
		path:'/musica',
		component: Musica
	},
	{
		path:'/festivales',
		component: Festivales
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;