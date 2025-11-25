import { create } from 'zustand';
import { supabase } from '../supabase';

// 1. Definimos la forma del Cliente
export interface Client {
    id: number;
    name: string;
    email: string;
    status: 'Activo' | 'Inactivo';
}

// 2. Definimos qué tendrá nuestro Store (Datos + Acciones)
interface ClientStore {
    clients: Client[]; // El estado (variables)
    isLoading: boolean; // Estado para mostrar "Cargando..."
    error: string | null; // Nuevo estado para errores
    fetchClients: () => Promise<void>; // Acción para cargar datos al inicio
    addClient: (client: Omit<Client, 'id'>) => Promise<void>;
    removeClient: (id: number) => Promise<void>;
    toggleStatus: (id: number, currentStatus: string) => Promise<void>;
}

// 3. Creamos el Hook del Store
export const useClientStore = create<ClientStore>()((set) => ({
    clients: [],
    isLoading: false,
    error: null,

    // --- OBTENER CLIENTES (READ) ---
    fetchClients: async () => {
        set({ isLoading: true, error: null });

        // Pedimos todo (*) de la tabla 'clients' ordenado por ID descendente
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('Error cargando clientes:', error);
            set({ error: 'Hubo un problema al cargar los clientes. Intenta recargar.' });
        } else {
            set({ clients: data as Client[] }); // Guardamos lo que llegó de la nube
        }

        set({ isLoading: false });
    },

    // --- AGREGAR CLIENTE (CREATE) ---
    addClient: async (newClient) => {
        // 1. Insertamos en Supabase
        const { data, error } = await supabase
            .from('clients')
            .insert([newClient])
            .select() // Importante: Pedimos que nos devuelva el dato creado (con su ID nuevo)
            .single();

        if (error) {
            console.error('Error creando cliente:', error);
            return;
        }

        // 2. Si todo salió bien, actualizamos el estado local con el dato REAL de la DB
        set((state) => ({
            clients: [data, ...state.clients]
        }));
    },

    // --- ELIMINAR CLIENTE (DELETE) ---
    removeClient: async (id) => {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error eliminando:', error);
            return;
        }

        // Actualizamos localmente
        set((state) => ({
            clients: state.clients.filter((c) => c.id !== id)
        }));
    },

    // --- ACTUALIZAR ESTADO (UPDATE) ---
    toggleStatus: async (id, currentStatus) => {
        const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';

        const { error } = await supabase
            .from('clients')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error actualizando:', error);
            return;
        }

        set((state) => ({
            clients: state.clients.map((c) =>
                c.id === id ? { ...c, status: newStatus } : c
            )
        }));
    },
}));