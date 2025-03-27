<template>
	<div id="app" class="general">
		<appHeader></appHeader>
		<router-view></router-view> <!-- Aca se renderizarán las vistas -->
		<appFooter></appFooter>
	</div>
</template>
<script>
import appHeader from "./components/AppHeader.vue";
import appFooter from "./components/AppFooter.vue";

export default {
	name: 'App',
	components: {
		appHeader,
		appFooter,
	},
}
</script>
<style >
.general{
	padding: 0;
	margin:0;
}
</style>
