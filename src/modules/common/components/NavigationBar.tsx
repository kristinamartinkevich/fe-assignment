import { Container, Nav, Navbar } from "react-bootstrap";

function NavigationBar() {

    return (
        <Navbar className="mb-4" bg="primary">
            <Container className="d-flex justify-content-end">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/data-table">Customer Analytics</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar