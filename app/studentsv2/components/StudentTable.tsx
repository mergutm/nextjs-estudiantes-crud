import { Student } from '@/lib/interfaces';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export default function StudentTable( { students, courseMap }: { students: Student[], courseMap: Record<string, string>; } ) {
  return (
    <div className="bg-slate-800/50 rounded-lg overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-700">
          <tr className="border-b border-t border-slate-400">
            <th className="px-6 py-3 font-semibold text-slate-200">Nombre</th>
            <th className="px-6 py-3 font-semibold text-slate-200">Matrícula</th>
            <th className="px-6 py-3 font-semibold text-slate-200">Grado</th>
            <th className="px-6 py-3 font-semibold text-slate-200">Cursos</th>
            <th className="px-6 py-3 font-semibold text-slate-200 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700 border-t border-slate-700">
          { students.map( ( student ) => (
            <tr key={ student.id } className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 text-slate-300">{ student.name }</td>
              <td className="px-6 py-4 text-slate-300">{ student.matricula }</td>
              <td className="px-6 py-4 text-slate-300">{ student.grado }</td>

              <td className="px-6 py-4 text-slate-300">
                { student.cursos.length > 0
                  ? student.cursos.map( id => courseMap[ id ] || id ).join( ", " )
                  : <span className="text-slate-500 italic">Sin cursos</span>
                }
              </td>

              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Link
                  href={ `/studentsv2/${ student.id }/actualizar` }
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Editar
                </Link>
                <DeleteButton id={ student.id } />
              </td>
            </tr>
          ) ) }
        </tbody>
      </table>
    </div>
  );
}
