<template>  
	<DataTable :value="products" tableStyle="min-width: 50rem" class="total">
		<Column field="name" header="Name"></Column>
		<Column header="Image">
			<template #body="slotProps">
				<img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="w-24 rounded" />
			</template>
		</Column>
		<Column field="price" header="Price">
			<template #body="slotProps">
				{{ formatCurrency(slotProps.data.price) }}
			</template>
		</Column>
		<Column field="category" header="Category"></Column>
		<template #footer> En total hay {{ products ? products.length : 0 }} productos. </template>
	</DataTable>
</template>
<script>
export default{
    data() {
        return {
    products:[
      {
        name: "Reloj de bambú",
        image: "bamboo-watch.jpg",
        price: 65.0,
        category: "Accesorios",
        rating: 4,
        inventoryStatus: "INSTOCK",
      },
      {
        name: "Reloj negro",
        image: "black-watch.jpg",
        price: 72.5,
        category: "Accesorios",
        rating: 5,
        inventoryStatus: "INSTOCK",
      },
      {
        name: "Banda azul",
        image: "blue-band.jpg",
        price: 15.0,
        category: "Aptitud física",
        rating: 3,
        inventoryStatus: "LOWSTOCK",
      },
      {
        name: "Camiseta azul",
        image: "blue-t-shirt.jpg",
        price: 25.0,
        category: "Ropa",
        rating: 4,
        inventoryStatus: "INSTOCK",
      },
      {
        name: "Pulsera",
        image: "bracelet.jpg",
        price: 18.5,
        category: "Accesorios",
        rating: 5,
        inventoryStatus: "INSTOCK",
      },
      
    ]}},
    methods: {
		formatCurrency(value) {
			return `$${value.toFixed(2)}`;
		},
    	getSeverity(product) {
      		switch (product.inventoryStatus) {
				case "INSTOCK":
				return "success";
				case "LOWSTOCK":
				return "warning";
				case "OUTOFSTOCK":
				return "danger";
				default:
				return null;
      		}
    	},
  	},
}
</script>
<style scoped>
.total{
  	height: 90vh;
}
</style>