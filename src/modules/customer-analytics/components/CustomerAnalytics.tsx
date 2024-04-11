import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Analytics, Customer } from '../../../model/model';
import { create } from 'zustand'
import Placeholders from './Placeholders';
import { calculatePercentage } from '../utils/utils';

export const columns: string[] = [
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

function CustomerAnalytics() {
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

    const renderCustomerAnalyticsRows = () => {
        return customers.map((customer) => {
            const { id, firstName, lastName } = customer;
            const { views, clicks, checkouts, payments } = analytics[id];

            return (
                <tr key={id}>
                    <td>#{id}</td>
                    <td>{firstName} {lastName}</td>
                    <td>{views}</td>
                    <td>{clicks}</td>
                    <td>{checkouts}</td>
                    <td>{payments}</td>
                    <td>{calculatePercentage(views, clicks)}</td>
                    <td>{calculatePercentage(payments, views)}</td>
                </tr>
            );
        });
    };

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
                                renderCustomerAnalyticsRows()
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

export default CustomerAnalytics