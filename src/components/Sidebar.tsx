import { LayoutDashboard, Users, BarChart3, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';


// export default function Sidebar({ activeTab, onTabChange }: SidebarProps) { // antes del router
export default function Sidebar() {
    // Ya no necesitamos recibir props de activeTab ni onTabChange. 
    // El Router se encarga de eso.
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Clientes', icon: Users, path: '/clientes' },
        { name: 'Finanzas', icon: BarChart3, path: '/finanzas' },
        { name: 'Configuración', icon: Settings, path: '/configuracion' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 h-screen">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3 flex items-center justify-center text-white font-bold">N</div>
                <span className="text-white font-semibold tracking-wide">NEXUS CORP</span>
            </div>

            {/* <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        // Cuando hacen click, ejecutamos la función del padre
                        onClick={() => onTabChange(item.name)}
                        className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.name
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <item.icon size={18} className="mr-3" />
                        {item.name}
                    </button>
                ))}
            </nav> */}

            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => (
                    // 2. Usamos NavLink en lugar de button
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-blue-600 text-white shadow-md' // Estilo cuando está activo
                                : 'hover:bg-slate-800 hover:text-white' // Estilo inactivo
                            }`
                        }
                    >
                        <item.icon size={18} className="mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Perfil de usuario estático por brevedad */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600"></div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Carlos R.</p>
                        <p className="text-xs text-slate-500">Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}