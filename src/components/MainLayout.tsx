import { Outlet } from 'react-router-dom'; // <--- EL TRUCO
import Sidebar from './Sidebar';
import { Bell, Search } from 'lucide-react';

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

            {/* 1. EL SIDEBAR SIEMPRE VISIBLE EN ESTE LAYOUT */}
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* 2. EL HEADER SIEMPRE VISIBLE */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0">
                    <h1 className="text-xl font-semibold text-slate-800">Panel de Control</h1>
                    <div className="flex items-center space-x-4">
                        <Search size={18} className="text-slate-400" />
                        <Bell size={20} className="text-slate-500" />
                    </div>
                </header>

                {/* 3. EL CONTENIDO VARIABLE (Aquí se cargan las páginas hijas) */}
                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}