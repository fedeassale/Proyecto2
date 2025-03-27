import { ImagenDAO } from "../dao/imagen.dao.js";

export class ImagenService {

    static async obtenerImagen(id) {
        const url_imagen = await ImagenDAO.obtenerImagenPorId(id);
        if (!url_imagen) {
          throw new Error("Imagen no encontrada");
        }
        return url_imagen;
      };
}