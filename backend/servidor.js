// Responsabilidad: Encender el servidor y conectar las piezas (CORS, JSON, Imágenes y rutas).
import express from "express";
import cors from "cors";
import rutasArticulos from "./rutasArticulos.js";
import {CARPETA_IMAGENES} from "./subirImagen.js";

const aplicacion = express();
const PUERTO = 3000;

aplicacion.use(cors()); // Permite que REACT (Puerto 5173) pueda llamar a este servidor
aplicacion.use(express.json()); // Entiende peticiones en formato o cuerpo .JSON
aplicacion.use("/uploads", express.static(CARPETA_IMAGENES)); // En el entorno local muestra la imagen
aplicacion.use("/api/articulos", rutasArticulos); // Todas las rutas del CRUD

// Errores de multer (archivo demasiado grande,etc.)
aplicacion.use((error, peticion, respuesta, siguiente) => {
    const mensaje = error.code === "LIMIT_FILE_SIZE"
    ? "La imagen es demasiado pesada (máximo 2 MB)"
    : error.message;
    respuesta.status (400).json({error: mensaje});
});

aplicacion.listen(PUERTO, () => console.log (`Servidor corriendo en http://localhost:${PUERTO}`));