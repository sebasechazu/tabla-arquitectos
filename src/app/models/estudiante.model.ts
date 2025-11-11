/** 🧑‍🎓 Representa un estudiante inscripto o potencial */
export interface Estudiante {
    /** Identificador único del estudiante */
    id: number;

    /** Nombre completo del estudiante */
    nombre: string;

    /** Dirección de correo electrónico */
    email: string;

    /** Curso en el que está actualmente inscripto */
    cursoId: number;

    /** Fecha de inscripción al curso */
    fechaInscripcion: string;

    /** Estado del estudiante dentro del curso */
    estado: 'Activo' | 'Inactivo' | 'Egresado';
}
