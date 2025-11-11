/** 👩‍🏫 Representa un profesor o instructor de la academia */
export interface Profesor {
    /** Identificador único del profesor */
    id: number;

    /** Nombre completo */
    nombre: string;

    /** Especialidad principal (ej: "Angular", "UX/UI", "Bases de datos") */
    especialidad: string;

    /** Cantidad de cursos asignados */
    cursosAsignados: number;

    /** Nivel de experiencia en años */
    experiencia: number;

    /** Indica si sigue activo en la institución */
    activo: boolean;
}
