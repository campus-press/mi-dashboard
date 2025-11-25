import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Mail, User, RefreshCw, AlertTriangle } from 'lucide-react';
// Importamos el store
import { useClientStore } from '../store/useClientStore';

export default function Clients() {
    // --- CONEXIÓN CON ZUSTAND ---
    // 2. MEJORA: Extraemos 'toggleStatus' que ya creaste en tu store
    const { clients, addClient, toggleStatus, removeClient, isLoading, error, fetchClients } = useClientStore();

    // Cuando el componente "nace", pedimos los datos
    useEffect(() => {
        fetchClients();
    }, []); // Array vacío = Solo ejecutar 1 vez al inicio

    // --- ESTADO LOCAL (Solo para el formulario) ---
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    // --- HANDLERS (Las funciones que reaccionan) ---

    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue (comportamiento default de HTML)

        if (!newName || !newEmail) return; // Validación simple

        const newClient = {
            name: newName,
            email: newEmail,
            status: 'Activo' as const
        };

        // Usamos la acción global
        addClient(newClient);

        // Limpiamos el formulario
        setNewName('');
        setNewEmail('');
    };

    return (
        <div className="space-y-6">
            {/* ... (El JSX del Formulario es IDÉNTICO al anterior, no cambia nada visualmente) ... */}

            {/* SECCIÓN 1: FORMULARIO DE CREACIÓN (Simple para empezar) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Registrar Nuevo Cliente</h3>
                <form onSubmit={handleAddClient} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Empresa</label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-2.5 text-slate-400" />
                            <input
                                type="text"
                                className="pl-10 w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Ej: Nexus Corp"
                                value={newName} // Binding del valor
                                onChange={(e) => setNewName(e.target.value)} // Binding del evento
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Correo Corporativo</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-2.5 text-slate-400" />
                            <input
                                type="email"
                                className="pl-10 w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="contacto@empresa.com"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus size={20} className="mr-2" />
                        Agregar
                    </button>
                </form>
            </div>

            {/* LISTA DE CLIENTES (Consumiendo datos globales) */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">Listado de Clientes ({clients.length})</span>
                    <Search size={18} className="text-slate-400" />
                </div>

                {isLoading ? (
                    // 1. ESTADO DE CARGA
                    <div className="p-10 flex justify-center items-center text-slate-500">
                        <RefreshCw size={24} className="animate-spin mr-3 text-blue-600" />
                        <span className="font-medium">Cargando clientes...</span>
                    </div>
                ) : error ? (
                    // 2. ESTADO DE ERROR
                    <div className="p-10 flex justify-center items-center text-red-500 bg-red-50">
                        <AlertTriangle size={24} className="mr-3" />
                        <span className="font-medium">{error}</span>
                    </div>
                ) : clients.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No hay clientes registrados.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {clients.map((client) => (
                            <div key={client.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">{client.name}</h4>
                                        <p className="text-sm text-slate-500">{client.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Badge de Estado */}
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {client.status}
                                    </span>

                                    {/* BOTÓN CAMBIAR ESTADO (Usando toggleStatus) */}
                                    <button
                                        onClick={() => toggleStatus(client.id, client.status)}
                                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                        title={client.status === 'Activo' ? 'Desactivar' : 'Activar'}
                                    >
                                        <RefreshCw size={18} />
                                    </button>

                                    {/* BOTÓN ELIMINAR */}
                                    <button
                                        onClick={() => removeClient(client.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                        title="Eliminar cliente"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}