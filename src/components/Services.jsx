"use client";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Services = ({ setStartModal, setCompleteModal, setDetailsModal }) => {
  return (
    <Container className="py-5">
      <Row>
        <Col xs={12} sm={6} md={4}>
          <Card className="shadow-sm text-center p-3">
            <Card.Body>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => setCompleteModal(true)}
              >
                Complete Shipment
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="shadow-sm text-center p-3">
            <Card.Body>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => setDetailsModal(true)}
              >
                Shipment Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card className="shadow-sm text-center p-3">
            <Card.Body>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => setStartModal(true)}
              >
                Start Shipment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
