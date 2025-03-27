import express from "express";
import { ImagenService } from "../services/imagen.service.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const result = await ImagenService.obtenerImagen();
        res.json(result);
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(error.message === "Imagen no encontrada" ? 404 : 500).json({
        mensaje: error.message,
      });
    }
  });

export default router;