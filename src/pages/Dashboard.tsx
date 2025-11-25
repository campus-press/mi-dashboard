import StatCard from '../components/StatCard';
import TransactionsTable from '../components/TransactionsTable';
import { useClientStore } from '../store/useClientStore'; // Importamos el store


export default function Dashboard() {
    // Nos suscribimos SOLO a la lista de clientes
    const clients = useClientStore((state) => state.clients);

    // Cálculos dinámicos (Computed values en tiempo real)
    //const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'Activo').length;

    // Formateamos para mostrar en la tarjeta
    const activeClientsDisplay = activeClients.toLocaleString();

    // Datos dinámicos mezclados con estáticos
    const kpiData = [
        { title: 'Ingresos Totales', value: '$124,500', change: '+12.5%', isPositive: true },
        {
            title: 'Usuarios Activos',
            value: activeClientsDisplay, // ¡DATO REAL DEL STORE!
            change: '+3.2%',
            isPositive: true
        },
        { title: 'Tasa de Rebote', value: '42.3%', change: '-0.5%', isPositive: false },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {kpiData.map((kpi, index) => (
                    <StatCard key={index} {...kpi} />
                ))}
            </div>
            <TransactionsTable />
        </>
    );
}