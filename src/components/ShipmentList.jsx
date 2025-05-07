"use client";
import { useState, useEffect } from "react";
import { Container, Col, Row, Button, Table, Spinner } from "react-bootstrap";

import { useSupplyChain } from "../context/SupplyChainContext";
import { ethers } from "ethers";

const ShipmentList = ({ setCreateModal }) => {
  const { contract } = useSupplyChain();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchShipments = async () => {
    if (!contract) return;

    setLoading(true);

    try {
      const total = Number(await contract.shipmentCounter());
      const data = [];

      for (let i = 0; i < total; i++) {
        const shipment = await contract.shipments(i);

        data.push({
          id: i,
          sender: shipment.seller,
          receiver: shipment.receiver,
          pickupDate: shipment.pickupDate,
          deliveryDate: shipment.deliveryDate,
          distance: shipment.distance,
          price: ethers.formatEther(shipment.price),
          paid: shipment.status === 2, // delivered
          Status: ["Created", "PickedUp", "Delivered"][shipment.status],
        });
      }

      setShipments(data);
    } catch (error) {
      console.error("Error loading shipments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [contract]);

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Container className="py-4">
      <Row className="align-iems-center justify-content-between">
        <Col md={6}>
          <h3 className="text-dark">DeliverX</h3>
          <p className="text-muted">
            Blockchain solution for supply chain management
          </p>
        </Col>
        <Col md={6} className="text-md-end mt-3 mt-md-0">
          <Button variant="dark" onClick={() => setCreateModal(true)}>
            Add Tracking
          </Button>
        </Col>
      </Row>

      <div className="mt-4">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Pickup Time</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Delivery Time</th>
                <th>Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            {shipments.length === 0 && !loading && (
              <tbody>
                <tr>
                  <td colSpan={9}>No shipments found</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {shipments.map((shipment, index) => (
                <tr key={index}>
                  <td> {shipment.id} </td>
                  <td> {shortenAddress(shipment.sender)} </td>
                  <td> {shortenAddress(shipment.receiver)} </td>
                  <td> {shipment.pickupDate} </td>
                  <td> {shipment.distance} KM </td>
                  <td> {shipment.price} ETH</td>
                  <td>
                    {" "}
                    {shipment.deliveryDate
                      ? shipment.deliveryDate
                      : "Not available"}{" "}
                  </td>
                  <td> {shipment.deliveryDate ? "✅" : "❌"} </td>
                  <td> {shipment.Status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default ShipmentList;
