// src/hooks/useTransactions.ts
import { useState, useEffect } from 'react';

// Exportamos la interfaz para poder usarla en el componente también
export interface Transaction {
    id: string;
    date: string;
    amount: string;
    status: 'Activo' | 'Pendiente' | 'Cancelado';
}

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // Simulamos espera
            await new Promise(resolve => setTimeout(resolve, 2000));

            const apiResponse: Transaction[] = [
                { id: '#CM-9081', date: '21 Nov, 2025', amount: '$450.00', status: 'Activo' },
                { id: '#CM-9082', date: '21 Nov, 2025', amount: '$120.50', status: 'Pendiente' },
                { id: '#CM-9083', date: '20 Nov, 2025', amount: '$950.00', status: 'Activo' },
                { id: '#CM-9084', date: '20 Nov, 2025', amount: '$35.00', status: 'Activo' },
                { id: '#CM-9085', date: '19 Nov, 2025', amount: '$210.20', status: 'Pendiente' },
            ];

            setTransactions(apiResponse);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    // Retornamos lo que el componente necesita
    return { transactions, isLoading };
}