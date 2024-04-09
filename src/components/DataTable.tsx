import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analytics, Customer } from '../model';

function calculatePercentage(numerator: number, denominator: number): string {
    return ((numerator / denominator) * 100).toFixed() + '%';
}

export function DataTable() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [analytics, setAnalytics] = useState<{ [key: string]: Analytics }>({});

    useEffect(() => {
        fetch('http://localhost:3000/customers')
            .then(response => response.json())
            .then(customers => {
                setCustomers(customers.data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });

        fetch('http://localhost:3000/analytics')
            .then(response => response.json())
            .then(analytics => {
                const analyticsMap: { [key: string]: Analytics } = {};
                analytics.data.forEach((item: Analytics) => {
                    analyticsMap[item.customerId] = item;
                });
                setAnalytics(analyticsMap);
            })
            .catch(error => {
                console.error('Error fetching analytics:', error);
            })
    }, []);


    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CUSTOMER FULL NAME</th>
                        <th>STORE VIEWS</th>
                        <th>PRODUCTS CLICKS</th>
                        <th>PRODUCT CHECKOUTS</th>
                        <th>SALES</th>
                        <th>CTR</th>
                        <th>CONVERSION</th>
                    </tr>
                </thead>
                <tbody>
                    {customers &&
                        <>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>#{customer.id}</td>
                                    <td>{customer.firstName} {customer.lastName} </td>
                                    {analytics &&
                                        <>
                                            <td>{analytics[customer.id].views}</td>
                                            <td>{analytics[customer.id].clicks}</td>
                                            <td>{analytics[customer.id].checkouts}</td>
                                            <td>{analytics[customer.id].payments}</td>
                                            <td>{calculatePercentage(analytics[customer.id].views, analytics[customer.id].clicks)}</td>
                                            <td>{calculatePercentage(analytics[customer.id].payments, analytics[customer.id].views)}</td>
                                        </>
                                    }
                                </tr>
                            ))}
                        </>}
                </tbody>
            </Table>
        </>
    )
}