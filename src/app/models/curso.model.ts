/** 📘 Representa un curso dentro del sistema educativo */
export interface Curso {
    /** Identificador único del curso */
    id: number;

    /** Nombre completo del curso */
    nombre: string;

    /** Descripción breve del contenido o temática */
    descripcion?: string;

    /** Duración del curso, por ejemplo "6 semanas" o "3 meses" */
    duracion: string;

    /** Nivel de dificultad o tipo del curso (básico, intermedio, avanzado) */
    nivel: 'Básico' | 'Intermedio' | 'Avanzado';

    /** Cantidad de estudiantes actualmente inscriptos */
    alumnos: number;

    /** Estado del curso (abierto o cerrado a inscripciones) */
    activo: boolean;
}
