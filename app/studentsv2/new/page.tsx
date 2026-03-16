import { prisma } from "@/lib/prisma";
import StudentForm from "../components/StudentForm";

export default async function NewStudentPage() {
    const courses = await prisma.course.findMany();

    console.log(courses);

    return (
      <div className="flex flex-col items-center min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                        Añadir Nuevo Estudiante
                    </h2>
                    <p className="text-slate-400">
                        Ingresa los datos personales y selecciona los cursos a matricular.
                    </p>
                </div>

                <StudentForm courses={courses} />
            </div>
        </div>

    );
}