import React, { useEffect } from 'react';
import { Placeholder, Spinner, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics, Customer } from '../../../model';
import { create } from 'zustand'

function calculatePercentage(numerator: number, denominator: number): string {
    return ((numerator / denominator) * 100).toFixed() + '%';
}

const columns: string[] = [
    'ID',
    'CUSTOMER FULL NAME',
    'STORE VIEWS',
    'PRODUCTS CLICKS',
    'PRODUCT CHECKOUTS',
    'SALES',
    'CTR',
    'CONVERSION'
];

const links = {
    customers: "customers",
    analytics: "analytics",
}

interface Store {
    customers: Customer[];
    analytics: { [key: string]: Analytics };
    setCustomers: (customers: Customer[]) => void;
    setAnalytics: (analytics: { [key: string]: Analytics }) => void;
}

const useStore = create<Store>((set) => ({
    customers: [],
    analytics: {},
    setCustomers: (customers) => set({ customers }),
    setAnalytics: (analytics) => set({ analytics }),
}));

function DataTable() {
    const { customers, analytics, setCustomers, setAnalytics } = useStore();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3000/${links.customers}`)
                .then(response => response.json())
                .then(customers => setCustomers(customers.data))
                .catch(error => console.error('Error fetching customers:', error));

            fetch(`http://localhost:3000/${links.analytics}`)
                .then(response => response.json())
                .then(analytics => {
                    const analyticsMap: { [key: string]: Analytics } = {};
                    analytics.data.forEach((item: Analytics) => {
                        analyticsMap[item.customerId] = item;
                    });
                    setAnalytics(analyticsMap);
                })
                .catch(error => console.error('Error fetching analytics:', error));
        }, 3000);
    }, []);

    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        {columns.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {customers && Object.keys(analytics).length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>#{customer.id}</td>
                                <td>{customer.firstName} {customer.lastName} </td>
                                <td>{analytics[customer.id].views}</td>
                                <td>{analytics[customer.id].clicks}</td>
                                <td>{analytics[customer.id].checkouts}</td>
                                <td>{analytics[customer.id].payments}</td>
                                <td>{calculatePercentage(analytics[customer.id].views, analytics[customer.id].clicks)}</td>
                                <td>{calculatePercentage(analytics[customer.id].payments, analytics[customer.id].views)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={12} className='align-items-xe'>
                                <Spinner /> Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default DataTable