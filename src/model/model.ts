export type Analytics = {
    customerId: string;
    views: number;
    clicks: number;
    checkouts: number;
    payments: number;
};


export type Customer = {
    type: string;
    id: string;
    firstName: string;
    lastName: string;
};