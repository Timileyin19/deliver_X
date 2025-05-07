"use client";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { useSupplyChain } from "../context/SupplyChainContext";
import { ethers } from "ethers";

const CreateShipmentModal = ({ createModal, setCreateModal }) => {
  const { contract } = useSupplyChain();
  const [shipmentDetails, setShipmentDetails] = useState({
    receiver: "",
    pickupDate: "",
    distance: "",
    price: "",
  });

  const handleShipmentCreation = async () => {
    if (!contract) return alert("Connect your wallet!");

    try {
      const txn = await contract.createDelivery(
        shipmentDetails.receiver,
        shipmentDetails.pickupDate,
        shipmentDetails.distance,
        {
          value: ethers.parseEther(shipmentDetails.price),
        }
      );
      await txn.wait();

      setShipmentDetails({
        receiver: "",
        pickupDate: "",
        distance: "",
        price: "",
      });

      window.location.reload();

      alert("Shipment has been successfully created.");
    } catch (error) {
      console.error(error);
      alert("Failed to create shipment.");
    }
  };

  return (
    <Modal
      show={createModal}
      onHide={() => setCreateModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Body>
        <div className="text-end">
          <Button
            variant="light"
            className="p-2"
            onClick={() => setCreateModal(false)}
          >
            X
          </Button>
        </div>

        <div className="text-center">
          <h4>Track Product, Create Shipment</h4>
          <p className="text-muted">
            Digitalised and Decentralised Supply chain management system
          </p>
        </div>

        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Receiver"
              value={shipmentDetails.receiver}
              onChange={(e) =>
                setShipmentDetails({
                  ...shipmentDetails,
                  receiver: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Control
              type="date"
              placeholder="Pickup Date"
              value={shipmentDetails.pickupDate}
              onChange={(e) =>
                setShipmentDetails({
                  ...shipmentDetails,
                  pickupDate: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Distance"
              value={shipmentDetails.distance}
              onChange={(e) =>
                setShipmentDetails({
                  ...shipmentDetails,
                  distance: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Control
              type="number"
              placeholder="Price"
              value={shipmentDetails.price}
              onChange={(e) =>
                setShipmentDetails({
                  ...shipmentDetails,
                  price: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={handleShipmentCreation}
          >
            Create Shipment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateShipmentModal;
