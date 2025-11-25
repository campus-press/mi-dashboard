import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Definimos la "forma" de los datos que esperamos (Interface)
interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}

// Desestructuramos las props directamente en los argumentos
export default function StatCard({ title, value, change, isPositive }: StatCardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <span className={`flex items-center text-xs font-medium px-2 py-1 rounded ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                    {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                    {change}
                </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
            <p className="text-xs text-slate-400 mt-2">Comparado con el mes anterior</p>
        </div>
    );
}