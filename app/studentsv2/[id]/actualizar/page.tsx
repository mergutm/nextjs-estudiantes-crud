
import { prisma } from '@/lib/prisma';
import { notFound } from "next/navigation";
import StudentForm from '../../components/StudentForm';

export default async function EditStudentPage( {
  params
}: {
  params: Promise<{ id: string; }>;
} ) {

  const urlParams = await params;
  const id = urlParams.id;

  const [ student, courses ] = await Promise.all( [
    prisma.student.findUnique( {
      where: { id },
    } ),
    prisma.course.findMany()
  ] );

  if ( !student ) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Editar Estudiante
          </h2>
          <p className="text-slate-400">
            Actualiza los datos personales o modifica la inscripción de cursos para <strong>{ student.name }</strong>.
          </p>
        </div>

        <StudentForm courses={ courses } initialStudent={ student } />
      </div>
    </div>
  );
}
