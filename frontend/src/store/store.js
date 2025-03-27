import { defineStore } from 'pinia';
import axios from 'axios';

export const useFormStore = defineStore('formStore', {
	state: () => ({
		products: [], 
		form: { asunto: "", ingreso: "", categoria: "" }, 
		errors: { asunto: false, ingreso: false, categoria: false }, 
		successMessage: "", 
		errorMessage: "" 
	}),
	
	actions: {
		async fetchData() {
			try {
				const response = await axios.get("http://localhost:8080/api/forms/data");
				this.products = response.data; 
			} catch (error) {
				console.error("Error al obtener los productos:", error);
			}
		},
    	async submitForm() {
			this.errors = {
				asunto: !this.form.asunto,
				ingreso: !this.form.ingreso,
				categoria: !this.form.categoria,
			};
    
     		if (Object.values(this.errors).includes(true))
        		return;
      
    
       
      		const formData = JSON.parse(JSON.stringify(this.form));
			
			console.log("📤 Enviando datos corregidos:", formData);
			
			try {
				const response = await axios.post("http://localhost:8080/api/forms/submit", formData, {
					headers: { "Content-Type": "application/json" },
				});
				console.log("Respuesta del servidor:", response);
				this.successMessage = response.data.message;
				this.errorMessage = "";
				this.form = { asunto: "", ingreso: "", categoria: "" };
			} catch (error) {
				console.error("❌ Error en la petición:", error.response?.data || error);
				this.errorMessage = error.response?.data?.error || "Error al enviar";
				this.successMessage = "";
      		}	
    	},
  		async updateProduct(id, updatedData) {
			try {
				const response = await axios.put(`http://localhost:8080/api/forms/update/${id}`, updatedData);
				this.successMessage = response.data.message;
				this.fetchData(); // Refresca la lista después de la actualización
			} catch (error) {
				this.errorMessage = error.response?.data?.error || "Error al actualizar";
			}
  		},
		async deleteProduct(id) {
			try {
				await axios.delete(`http://localhost:8080/api/forms/delete/${id}`);
				this.fetchData(); // Refresca la lista después de eliminar
			} catch (error) {
				this.errorMessage = error.response?.data?.error || "Error al eliminar";
			}
		}
	}
});