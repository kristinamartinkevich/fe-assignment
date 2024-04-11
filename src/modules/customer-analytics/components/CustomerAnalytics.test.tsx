import { render, screen, act, waitFor } from '@testing-library/react';
import CustomerAnalytics, { columns } from './CustomerAnalytics';

const mockData = {
    customers: {
        data: [
            {
                id: 'abc123',
                firstName: 'John',
                lastName: 'Doe'
            },
            {
                id: 'abc456',
                firstName: 'Ann',
                lastName: 'Carpenter'
            }
        ]
    },
    analytics: {
        data: [
            {
                customerId: 'abc123',
                views: 100,
                clicks: 50,
                checkouts: 25,
                payments: 5
            },
            {
                customerId: 'abc456',
                views: 200,
                clicks: 50,
                checkouts: 25,
                payments: 10
            }
        ]
    }
};

(global.fetch as jest.Mock) = jest.fn();

test('renders table', () => {
    render(<CustomerAnalytics />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
});

describe('CustomerAnalytics', () => {
    beforeEach(() => {
        jest.useFakeTimers();

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                json: async () => mockData.customers
            } as Response)
            .mockResolvedValueOnce({
                json: async () => mockData.analytics
            } as Response);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test('fetches customers and analytics data', async () => {
        render(<CustomerAnalytics />);

        await act(async () => {
            jest.advanceTimersByTime(3000);

            await waitFor(() => {
                expect(fetch).toHaveBeenCalledWith('http://localhost:3000/customers');
                expect(fetch).toHaveBeenCalledWith('http://localhost:3000/analytics');
            });
        });
    });
});

test('renders all columns in the table header', async () => {
    render(<CustomerAnalytics />);

    columns.forEach(columnName => {
        const columnHeader = screen.getByText(columnName);
        expect(columnHeader).toBeInTheDocument();
    });
});
