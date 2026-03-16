"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function borrarEstudiante( id: string ) {

  try {
    // llamada a MongoDB
    await prisma.student.delete(
      { where: { id } }
    );

    // forzar la actualización del caché
    revalidatePath( "/studentsv2" );

    // regresa éxito
    return { success: true };
  } catch ( error ) {
    console.error( "No se pudo eliminar el id " + id );
    return { success: false, error: "Fallo al borrar " };
  }
}

export async function actualizarEstudiante( id: string, formData: FormData ) {

  try {
    console.log( "Actualizar estudiantes" );

    // obtener cursos
    const cursosData = formData.getAll( "cursos" ) as string[];
    // trim quita espacios al inicio y final de una cadena
    // " ca "  ---> trim(" ca ") --> "ca"
    // "   "  ---> trim("  ") --> ""
    // quitar los cursos que sean solo espacios
    const cursos = cursosData.filter( c => c.trim() !== '' );


    console.log( "cursos ", cursos );
    console.log( "formData ", formData );
    console.log( "id ", id );


    // actualización de datos del estudiante
    await prisma.student.update( {
      where: { id },
      data: {
        name: formData.get( 'name' ) as string,
        matricula: formData.get( 'matricula' ) as string,
        grado: formData.get( 'grado' ) as string,
        cursos: cursos
      }
    } );

    /*
     {
        name: "María García",
        matricula: "20240002",
        grado: "Segunda Semestre",
        cursos: ["FIS101", "HIS101", "PROG101"]
     },
    */


    // forzar la actualización del caché
    revalidatePath( "/studentsv2" );

    // regresa éxito
    return { success: true };
  } catch ( error ) {
    console.error( "No se pudo acualizar el estuciante con id " + id );
    return { success: false, error: "Fallo actualizar " };
  }

}


export async function insertarEstudiante( formData: FormData ) {


  try {
    const cursosData = formData.getAll( "cursos" ) as string[];
    const cursos = cursosData.filter( c => c.trim() !== '' );

    console.log( cursos );
    console.log( cursosData );


    // llamada a MongoDB
    await prisma.student.create(
      {
        data: {
          name: formData.get( 'name' ) as string,
          matricula: formData.get( 'matricula' ) as string,
          grado: formData.get( 'grado' ) as string,
          cursos: cursos
        }
      }
    );

    // forzar la actualización del caché
    revalidatePath( "/studentsv2" );

    // regresa éxito
    return { success: true };
  } catch ( error ) {
    console.error( "No se pudo insertar el registro " );
    return { success: false, error: "Fallo al insertar  " };
  }

}