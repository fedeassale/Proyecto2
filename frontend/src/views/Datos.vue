<template>
	<div class="datos"> 
		<DataTable :value="products" tableStyle="min-width: 50rem" v-if="products.length" class="tablaDatos">
			<template #header>
				<div class="flex flex-wrap items-center justify-between gap-2">
					<span class="text-2xl font-bold">Ingresos/Egresos</span>
					<Button icon="pi pi-refresh" rounded severity="contrast" raised />
				</div>
			</template>
			<Column class="tablaElementos" field="id" header="ID" sortable style="width: 25%"></Column>
			<Column class="tablaElementos" field="asunto" header="Asunto" sortable style="width: 25%"></Column>
			<Column class="tablaElementos" field="ingreso" header="Ingreso/Egreso" sortable style="width: 25%"></Column>
			<Column class="tablaElementos" field="categoria" header="Category" sortable style="width: 25%"></Column>
			<Column class="tablaElementos" header="Acciones" style="width: 20%">
				<template #body="slotProps">
					<Drawer v-model:visible="visible" header="Editar Producto" :modal="true">
						<div class="p-4">
							<label>Asunto:</label>
							<br>
							<InputText v-model="editedProduct.asunto" class="w-full mb-3" />
							<label>Ingreso/Egreso:</label>
							<InputText v-model="editedProduct.ingreso" class="w-full mb-3" />
							<label>Categoría:</label>
							<InputText v-model="editedProduct.categoria" class="w-full mb-3" />
							<Button label="Guardar Cambios" @click="saveChanges" class="mt-2" severity="contrast" />
						</div>
					</Drawer>
					<Button icon="pi pi-arrow-right" class="tablaElementos w-30"   @click="editProduct(slotProps.data)" label="Editar"  severity="contrast" />
					<Button  icon="pi pi-trash" class="tablaElementos w-30" label="Eliminar" @click="deleteProduct(slotProps.data.id)" severity="contrast" />	
				</template>
			</Column>
			<template #footer>
				<div class="flex flex-wrap items-center justify-between gap-2">
					<span class="text-xl font-bold">Total de la  Cuenta: ${{ totalIngreso }}</span>
				</div>
			</template>
		</DataTable>
		<Skeleton v-else class="mb-2"></Skeleton>
	</div>
</template>
  
<script>
import { useFormStore } from '@/store/store.js';

export default {
	data() {
		return {
			visible: false,
			editedProduct: {},
			formStore: useFormStore() 
		};
  	},
  	computed: {
    	products() {
      		return this.formStore.products; 
    	},
    	totalIngreso() {
      		return this.products.reduce((total, product) => {
        
        	return total + (parseFloat(product.ingreso) || 0);
      		}, 0).toFixed(2); 
    	},
  	},  
  	created() {
    	this.formStore.fetchData(); 
  	},

  	methods: {
    	editProduct(product) {
      		this.editedProduct = { ...product }; 
      		this.visible = true; 
    	},
		async saveChanges() {
			await this.formStore.updateProduct(this.editedProduct.id, this.editedProduct);
			this.visible = false; 
		},
		deleteProduct(id) {
			this.formStore.deleteProduct(id);
		}
  	}
};
</script>                   
<style scoped>
.tablaElementos{
	padding: 10px;
	margin: 10px;
}
.datos{
    height: 90vh;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}
</style>  