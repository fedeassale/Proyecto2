import { FormService } from "../services/form.service.js";

export class FormController {
    static async submitForm(req, res) {
        try {
            const newForm = await FormService.submitForm(req.body);
            res.json({ success: true, message: "Formulario enviado con éxito", data: newForm });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getForms(req, res) {
        try {
            const forms = await FormService.getForms();
            res.json(forms);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los datos" });
        }
    }

    static async updateForm(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedItem = await FormService.updateForm(id, updatedData);

            if (!updatedItem) {
                return res.status(404).json({ error: "Elemento no encontrado" });
            }

            res.json({ message: "Elemento actualizado correctamente", updatedItem });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el elemento" });
        }
    }

    static async deleteForm(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await FormService.deleteForm(id);

            if (!deletedItem) {
                return res.status(404).json({ error: "Elemento no encontrado" });
            }

            res.json({ message: "Elemento eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el elemento" });
        }
    }
}