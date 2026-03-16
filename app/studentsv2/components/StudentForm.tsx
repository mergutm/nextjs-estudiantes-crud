"use client"
import { Course, Student } from "@/lib/interfaces"
import { useRouter } from "next/navigation"
import { startTransition, useTransition } from "react";
import { actualizarEstudiante, insertarEstudiante } from "../actions";

export default function StudentForm({
    courses,
    initialStudent
}: {
    courses: Course[],
    initialStudent?: Student
}) {
    // cuerpo de la funcion
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    // forzar a boolean
    const isEditing = !!initialStudent;

    async function handleSubmit(formData: FormData) {
        console.log("handle submit");  
        console.log("isediting", isEditing);

        startTransition(async () => {
            let result = null;
            if (isEditing) {
                console.log("submit changes");
                console.log(initialStudent.id, formData);
                result = await actualizarEstudiante(initialStudent.id, formData);
            }
            else {
                result = await insertarEstudiante(formData);
            }

            if (result.success) {
                router.push("/studentsv2");
            } else {
                alert(result.error);
            }
        });
    }

    // return
    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <div className="col-span-2">
                        <label htmlFor="name" className="block  font-medium text-slate-300">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            defaultValue={initialStudent?.name || ""}
                            className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm: p-2.5"
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="matricula" className="block  font-medium text-slate-300">
                            Matrícula
                        </label>
                        <input
                            type="text"
                            name="matricula"
                            id="matricula"
                            required
                            defaultValue={initialStudent?.matricula || ""}
                            className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm: p-2.5"
                        />
                    </div>


                    <div className="col-span-2">
                        <label htmlFor="grado" className="block  font-medium text-slate-300">
                            Grado
                        </label>
                        <input
                            type="text"
                            name="grado"
                            id="grado"
                            required
                            defaultValue={initialStudent?.grado || ""}
                            className="mt-1 block w-full rounded-md bg-slate-900 border-slate-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm: p-2.5"
                        />
                    </div>


                    <div className="col-span-2 mt-4">
                        <h3 className=" font-medium text-slate-300 mb-3">Cursos Inscritos</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {courses.map((course) => (
                                <div key={course.id} className="relative flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id={`course-${course.id}`}
                                            name="cursos"
                                            value={course.id}
                                            type="checkbox"
                                            defaultChecked={initialStudent?.cursos?.includes(course.id)}
                                            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                                        />
                                    </div>
                                    <div className="ml-3 ">
                                        <label htmlFor={`course-${course.id}`} className="font-medium text-slate-400">
                                            {course.name} <span className="text-slate-500 text-xs">Inpu({course.id})</span>
                                        </label>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className=" font-medium text-slate-400 hover:text-white transition-colors">
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`justify-center rounded-md border  ${isPending ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isPending ? "Guardando..." : isEditing ? "Actualizar Estudiante" : "Crear Estudiante"}
                    </button>
                </div>
            </div>
        </form>
    )
}
