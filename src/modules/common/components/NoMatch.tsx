import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NoMatch() {

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>404</h1>
                        <Link to="/">Go to the home page</Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NoMatch