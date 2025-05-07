import { Container, Col, Row, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="pt-5">
      <Container>
        <Row className="justify-content-between">
          <Col md={6} className="mb-4">
            <p className="mt-3">Blockchain-powered supply chain management</p>
            <Nav>
              <Nav.Link href="#" className="text-dark">
                Home
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Blockchain
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <hr className="my-1" />
        <p className="text-center">
          &copy; {new Date().getFullYear()} DeliverX. Designed by{" "}
          <a
            href="https://blockchain.uj.ac.za"
            target="_blank"
            className="text-primary fw-bold text-decoration-none"
          >
            UJ Blockchain
          </a>
          . All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
