"use client";
import { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

import { useSupplyChain } from "../context/SupplyChainContext";
import { ethers } from "ethers";

const ShipmentDetailsModal = ({ detailsModal, setDetailsModal }) => {
  const { contract } = useSupplyChain();
  const [shipmentId, setShipmentId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetShipmentDetails = async () => {
    if (!shipmentId || !contract) {
      alert("Something went wrong.");
      return;
    }

    setLoading(true);
    setShipment(null);

    try {
      const shipment = await contract.shipments(shipmentId);

      const formattedShipment = {
        receiver: shipment.receiver,
        sender: shipment.seller,
        pickupDate: shipment.pickupDate,
        deliveryDate:
          shipment.deliveryDate !== ""
            ? shipment.deliveryDate
            : "Not Available",
        distance: shipment.distance,
        price: ethers.formatEther(shipment.price),
        paid: shipment.status == 2,
      };

      setShipment(formattedShipment);
    } catch (error) {
      console.error("Error fetching shipment: ", error);
      alert("shipment not found.");
    } finally {
      setLoading(false);
    }

    setShipmentId("");
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Modal
      show={detailsModal}
      onHide={() => setDetailsModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Body>
        <div className="text-end">
          <Button
            variant="light"
            className="p-2"
            onClick={() => setDetailsModal(false)}
          >
            X
          </Button>
        </div>

        <div className="text-center">
          <h4>Product Tracking Details</h4>
        </div>

        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mt-3">
            <Form.Control
              type="number"
              placeholder="Shipment ID"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={handleGetShipmentDetails}
          >
            Get Shipment Details
          </Button>
        </Form>

        {loading && <Spinner animation="border" />}

        {shipment && (
          <div className="mt-4">
            <h5>Shipment Details</h5>
            <p>
              <strong>Receiver:</strong> {shortenAddress(shipment.receiver)}
            </p>
            <p>
              <strong>Sender:</strong> {shortenAddress(shipment.sender)}
            </p>
            <p>
              <strong>Pickup Date:</strong> {shipment.pickupDate}
            </p>

            <p>
              <strong>Delivery Date:</strong> {shipment.deliveryDate}
            </p>
            <p>
              <strong>Distance:</strong> {shipment.distance} km
            </p>
            <p>
              <strong>Price:</strong> {shipment.price} ETH
            </p>
            <p>
              <strong>Paid:</strong> {shipment.paid ? "Yes ✅" : "Not yet ❌"}
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShipmentDetailsModal;
