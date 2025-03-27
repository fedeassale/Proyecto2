<template>
    <div class="forms">
		<div class="container">
			<h2>Formulario de Ingresos y Egresos</h2>
			<form @submit.prevent="submitForm">
				<input class="box" type="text" v-model="form.asunto" placeholder="Asunto" />
				<span v-if="errors.asunto">El asunto es obligatorio</span>
				<input class="box" type="number" v-model="form.ingreso" placeholder="Ingresos/Egresos" />
				<span v-if="errors.ingreso">El ingreso es obligatorio</span>
				<input class="box" v-model="form.categoria" placeholder="Categoria"></input>
				<span v-if="errors.categoria">La categoria es obligatorio</span>
				<Button class="box w-full" type="submit" label="Enviar" severity="contrast"></Button>
			</form>
			<p v-if="successMessage" class="success">{{ successMessage }}</p>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
		</div>
    </div>
</template>
  
<script>
import { useFormStore } from '@/store/store.js'; 
  
export default {
    data() {
		return {
			formStore: useFormStore() 
		};
  	},
  	computed: {
    	form() {
      		return this.formStore.form;
    	},
    	errors() {
      		return this.formStore.errors;
    	},
    	successMessage() {
      		return this.formStore.successMessage;
    	},
    	errorMessage() {
      		return this.formStore.errorMessage;
   		}
  	},
  	methods: {
    	submitForm() {
      		this.formStore.submitForm();
    	}
  	}
}
</script>
<style scoped>
h2{
    text-align: center;
}
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.box{
	border: 2px solid rgb(87, 86, 86);
	border-radius: 10px;
	margin-top: 30px;
	padding: 10px;
}
.centrar{
    max-width: 400px;
    margin:auto;
}
input[type="text"], input[type="number"], textarea {
 	width: 100%;
}
.forms{
    height: 90vh;
    padding: 0;
    margin: 0;
}
.container {
    width: 300px;
    margin: auto;
}
input, textarea {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 5px;
}
  
.success { color: green; }
.error { color: red; }
span { color: red; font-size: 12px; }
</style>