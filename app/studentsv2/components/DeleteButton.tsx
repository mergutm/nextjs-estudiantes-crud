"use client";

import { useTransition } from "react";
import { borrarEstudiante } from "../actions";

export default function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        // usar un alert
        if (window.confirm("¿Estas seguro que deseas eliminar este estudiante?")) {
            startTransition(async () => {
                const result = await borrarEstudiante(id);
                if (!result.success) {
                    alert("Error al eliminar");
                }
            });
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isPending ? "Esperando" : "Eliminar"}
        </button>
    );
}
