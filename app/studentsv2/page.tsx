import { prisma } from "@/lib/prisma";
import StudentForm from "./components/StudentForm";
import Link from 'next/link';
import StudentTable from './components/StudentTable';

export default async function StudentsPage() {

  const students = await prisma.student.findMany();
  const courses = await prisma.course.findMany();

  const courseMap = Object.fromEntries(
    courses.map( c => [ c.id, c.name ] )
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl space-y-6">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                      Listado de  Estudiantes </h1>

                    <div className="flex items-center space-x-4">

                        <Link
                            href="/studentsv2/new"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm transition-colors"
                        >
                        +  Añadir Estudiante
                        </Link>
                    </div>
                </div>

                <StudentTable students={students} courseMap={courseMap} />

            </div>
        </div>
  );
}