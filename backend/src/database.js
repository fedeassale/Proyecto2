import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/Proyecto2")
    .then(()=>console.log("Conexion exitosa"))
    .catch((err)=>console.log(err));