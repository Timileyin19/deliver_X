"use client";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { useSupplyChain } from "../context/SupplyChainContext";

const ProfileModal = ({ profileModal, setProfileModal }) => {
  const [balance, setBalance] = useState("0");
  const [shipmentCount, setShipmentCount] = useState(0);

  const { account, getBalance, getUserShipmentCount } = useSupplyChain();

  useEffect(() => {
    fetchData();
  }, [account]);

  const fetchData = async () => {
    if (account) {
      const userBalance = await getBalance();
      const userShipmentsCount = await getUserShipmentCount();

      setBalance(userBalance);
      setShipmentCount(userShipmentsCount);
    }
  };

  return (
    <Modal
      show={profileModal}
      onHide={() => setProfileModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Body>
        <div className="text-end">
          <Button
            variant="light"
            className="p-2"
            onClick={() => setProfileModal(false)}
          >
            X
          </Button>
        </div>

        <div className="align-items-center pb-3 text-center">
          <h5>Hello User</h5>
          <p className="text-muted">{account}</p>
        </div>

        <div className="d-flex gap-3 mt-3">
          <Button variant="outline-dark">
            Balance: {Number(balance).toFixed(2)} ETH
          </Button>
          <Button variant="outline-dark">
            Total shipment(s): {shipmentCount}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
