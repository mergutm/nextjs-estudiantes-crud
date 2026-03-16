import { prisma } from "@/lib/prisma";

export default async function StudentsPage() {



    const students = await prisma.student.findMany();
    const courses = await prisma.course.findMany();

    const courseMap = Object.fromEntries(
        courses.map(c => [c.id, c.name])
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">

            <div className="p-4 align-center bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                    <h3 className="text-2xl font-bold">Lista de estudiantes</h3>
                </div>
                <table className="w-full border-collapse text-left text-sm ">
                    <thead className="p-6">
                        <tr className="border-b border-t border-slate-400 bg-slate-700">
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Matrícula</th>
                            <th className="px-6 py-3">Grado</th>
                            <th className="px-6 py-3">Cursos</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {students.map(student => (
                            <tr key={student.id} className="hover:bg-slate-700 transition-colors">
                                <td className="px-6 py-3">{student.name}</td>
                                <td className="px-6 py-3">{student.matricula}</td>
                                <td className="px-6 py-3">{student.grado}</td>
                                <td className="px-6 py-3">
                                    {student.cursos
                                        .map(id => courseMap[id])
                                        .join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}