import { Curso } from "./curso.model";
import { Estudiante } from "./estudiante.model";
import { Profesor } from "./profesor.model";

/** 🧩 Relación entre curso y profesor */
export interface CursoDetalle {
    curso: Curso;
    profesor: Profesor;
    estudiantes: Estudiante[];
}
