import React, { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Analytics, Customer } from '../../../model/model';
import { create } from 'zustand'
import Placeholders from '../../common/components/Placeholders';

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
        <Container>
            <Row>
                <Col>
                    <Table striped responsive>
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
                                <Placeholders />
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default DataTable