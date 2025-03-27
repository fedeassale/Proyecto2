import express from "express";
import "./database.js";
import cors from "cors";
import formRoutes from "./routes/form.routes.js";
import musicaRoutes from "./routes/musica.routes.js";
import imagenRoutes from "./routes/imagen.routes.js"
import bodyParser from "body-parser";

const app = express();
const PUERTO= 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use("/api/forms", formRoutes); 
app.use("/api", musicaRoutes);
app.use("/imagen", imagenRoutes);

app.listen(PUERTO,()=>{
    console.log(`servidor escuchando en el puerto ${PUERTO}`);
    });