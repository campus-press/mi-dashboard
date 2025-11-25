import { MoreHorizontal, RefreshCcw } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';

// --- 1. DEFINICIÓN DEL COMPONENTE BADGE (ESTILO VISUAL) ---
const Badge = ({ status }: { status: string }) => {
    const styles = status === 'Activo'
        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
        : 'bg-amber-100 text-amber-700 border-amber-200';
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
            {status}
        </span>
    );
};

// --- 2. DEFINICIÓN DEL COMPONENTE SKELETON (LA CARGA) ---
// ¡Importante! Debe estar definido antes de usarse en la tabla principal
const TableSkeleton = () => (
    <div className="w-full animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 w-full">
                <div className="h-4 bg-slate-300 rounded w-20"></div>
                <div className="h-4 bg-slate-200 rounded w-24"></div>
                <div className="h-4 bg-slate-300 rounded w-16"></div>
                <div className="h-6 bg-slate-200 rounded w-20"></div>
                <div className="h-4 bg-slate-200 rounded w-8 ml-auto"></div>
            </div>
        ))}
    </div>
);

// --- 3. COMPONENTE PRINCIPAL (EXPORTADO) ---
export default function TransactionsTable() {
    // ¡MIRA QUÉ LIMPIO! 
    // Ya no hay useEffect ni useState aquí. Todo viene del hook.
    const { transactions, isLoading } = useTransactions();

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[300px]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-800">Transacciones Recientes</h3>
                    {isLoading && <RefreshCcw size={16} className="animate-spin text-slate-400" />}
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todo</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">ID Cliente</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {/* INICIO DE LA LÓGICA DE CARGA */}
                        {isLoading ? (
                            // CASO A: SI ESTÁ CARGANDO (Aquí estaba tu error probablemente)
                            // Truco: Ponemos el Skeleton dentro de un TR/TD que ocupe todo
                            <tr>
                                {/* colSpan=5 hace que la celda ocupe las 5 columnas para que el skeleton no se vea aplastado */}
                                <td colSpan={5} className="p-0">
                                    <TableSkeleton />
                                </td>
                            </tr>
                        ) : (
                            // CASO B: SI YA HAY DATOS
                            transactions.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.id}</td>
                                    <td className="px-6 py-4">{row.date}</td>
                                    <td className="px-6 py-4">{row.amount}</td>
                                    <td className="px-6 py-4">
                                        <Badge status={row.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {/* FIN DE LA LÓGICA DE CARGA */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}