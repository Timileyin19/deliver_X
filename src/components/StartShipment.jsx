"use client";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { useSupplyChain } from "../context/SupplyChainContext";

const StartShipment = ({ startModal, setStartModal }) => {
  const { contract } = useSupplyChain();
  const [shipmentDetails, setShipmentDetails] = useState({
    index: "",
  });

  const handleStartShipment = async () => {
    if (!contract) return alert("Connect your wallet!");

    try {
      const txn = await contract.pickUpDelivery(shipmentDetails.index);
      await txn.wait();
      window.location.reload();
      alert(
        `Shipment with ID ${shipmentDetails.index} has been successfully picked up.`
      );
    } catch (error) {
      console.error("Parcel Pickup Error", error);
      alert("Failed to pick up the shipment");
    }
  };

  return (
    <Modal
      show={startModal}
      onHide={() => setStartModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Body>
        <div className="text-end">
          <Button
            variant="light"
            className="p-2"
            onClick={() => setStartModal(false)}
          >
            X
          </Button>
        </div>

        <div className="text-center">
          <h4>Start the Shipment</h4>
        </div>

        <Form onSubmit={(e) => e.preventDefault()}>
          {/* <Form.Group className="mt-3">
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
          </Form.Group> */}

          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder="Shipment ID"
              value={shipmentDetails.index}
              onChange={(e) =>
                setShipmentDetails({
                  ...shipmentDetails,
                  index: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={handleStartShipment}
          >
            Start Shipment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StartShipment;
