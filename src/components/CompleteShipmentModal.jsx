"use client";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { useSupplyChain } from "../context/SupplyChainContext";

const CompleteShipmentModal = ({ completeModal, setCompleteModal }) => {
  const { contract } = useSupplyChain();
  const [shipmentDetails, setShipmentDetails] = useState({
    index: "",
  });

  const handleCompleteShipment = async () => {
    if (!contract) return alert("Connect your wallet!");

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

    try {
      const txn = await contract.confirmDelivery(
        shipmentDetails.index,
        formattedDate
      );
      await txn.wait();
      window.location.reload();
      alert(
        `Shipment with ID ${shipmentDetails.index} has been delivered and payment sent!`
      );
    } catch (error) {
      console.error("Delivery confirmation error", error);
      alert("Failed to confirm delivery.");
    }

    // setShipmentDetails({
    //   index: "",
    // });
  };

  return (
    <Modal
      show={completeModal}
      onHide={() => setCompleteModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Body>
        <div className="text-end">
          <Button
            variant="light"
            className="p-2"
            onClick={() => setCompleteModal(false)}
          >
            X
          </Button>
        </div>

        <div className="text-center">
          <h4>Complete the Shipment</h4>
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
            onClick={handleCompleteShipment}
          >
            Complete Shipment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CompleteShipmentModal;
