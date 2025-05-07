"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import contractData from "../contracts/SupplyChain.json";

const SupplyChainContext = createContext();

export const SupplyChainProvider = ({ children }) => {
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (typeof window.ethereum !== "undefined") {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const newSigner = await newProvider.getSigner();
      const supplyChain = new ethers.Contract(
        contractData.address,
        contractData.abi,
        newSigner
      );

      setProvider(newProvider);
      setSigner(newSigner);
      setContract(supplyChain);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to fetch the connected accounts", error);
      }
    } else {
      alert("Please, you need to install metamask.");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } catch (error) {
        console.error("User rejected wallet connection", error);
      }
    }
  };

  const getBalance = async () => {
    if (provider && account) {
      const balanceBigInt = await provider.getBalance(account);
      const balance = ethers.formatEther(balanceBigInt);
      return balance;
    }
    return "0";
  };

  const getUserShipmentCount = async () => {
    if (contract && account) {
      const total = Number(await contract.shipmentCounter());

      let count = 0;

      for (let i = 0; i < total; i++) {
        const shipment = await contract.shipments(i);
        if (
          shipment.seller.toLowerCase() === account.toLowerCase() ||
          shipment.logisticsProvider.toLowerCase() === account.toLowerCase() ||
          shipment.receiver.toLowerCase() === account.toLowerCase()
        ) {
          count++;
        }
      }

      return count;
    }
    return 0;
  };

  return (
    <SupplyChainContext.Provider
      value={{
        provider,
        signer,
        contract,
        account,
        connectWallet,
        getBalance,
        getUserShipmentCount,
      }}
    >
      {children}
    </SupplyChainContext.Provider>
  );
};

export const useSupplyChain = () => {
  return useContext(SupplyChainContext);
};
