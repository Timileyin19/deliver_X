"use client";
import { useState } from "react";
import {
  CompleteShipmentModal,
  CreateShipmentModal,
  Footer,
  NavBar,
  ProfileModal,
  Services,
  ShipmentDetailsModal,
  ShipmentList,
  StartShipment,
} from "@/components";

import { SupplyChainProvider } from "../context/SupplyChainContext";

const Home = () => {
  const [startModal, setStartModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  return (
    <>
      <SupplyChainProvider>
        <NavBar setProfileModal={setProfileModal} />
        <Services
          setStartModal={setStartModal}
          setCompleteModal={setCompleteModal}
          setDetailsModal={setDetailsModal}
        />

        <StartShipment startModal={startModal} setStartModal={setStartModal} />

        <ShipmentList setCreateModal={setCreateModal} />

        <CreateShipmentModal
          createModal={createModal}
          setCreateModal={setCreateModal}
        />

        <CompleteShipmentModal
          completeModal={completeModal}
          setCompleteModal={setCompleteModal}
        />

        <ShipmentDetailsModal
          detailsModal={detailsModal}
          setDetailsModal={setDetailsModal}
        />

        <ProfileModal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
        />

        <Footer />
      </SupplyChainProvider>
    </>
  );
};

export default Home;
