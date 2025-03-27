import { FormDAO } from "../dao/form.dao.js";

export class FormService {
    static async submitForm(data) {
        const { asunto, ingreso, categoria } = data;

        if (!asunto || !ingreso || !categoria) {
            throw new Error("Todos los campos son obligatorios");
        }
        console.log("Datos recibidos:", data);
        return await FormDAO.create(data);
        
    }

    static async getForms() {
        return await FormDAO.findAll();
    }

    static async updateForm(id, data) {
        return await FormDAO.updateById(id, data);
    }

    static async deleteForm(id) {
        return await FormDAO.deleteById(id);
    }
}