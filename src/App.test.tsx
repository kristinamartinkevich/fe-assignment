import { render, screen } from "@testing-library/react";
import App from "./App.tsx";
import NavigationBar from "./modules/common/components/NavigationBar.tsx";


test('renders without crashing', () => {
    render(<App />);
});

test('renders navigation bar with links', () => {
    render(<NavigationBar />);

    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const customerAnalyticsLink = screen.getByText('Customer Analytics');
    expect(customerAnalyticsLink).toBeInTheDocument();
    expect(customerAnalyticsLink).toHaveAttribute('href', '/customer-analytics');
});