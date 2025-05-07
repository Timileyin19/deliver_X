# DeliverX – Decentralised Supply Chain Escrow System

## Tech Stack

- Next.js (Frontend Development)
- Solidity (Smart Contracts)
- Ganache (Blockchain Network)
- Hardhat (Smart Contract deployment)
- Ethers.js (Smart Contact interaction with the frontend)

## Features

- **Shipment Escrow**: Seller adds shipment details and funds the escrow smart contract.
- **Logistics Assignment**: A logistics provider picks up the parcel.
- **Recipient Verification**: Only the authorized receiver can confirm successful delivery.
- **Secure Payment Release**: Funds are automatically released to the logistics provider upon delivery confirmation.
- **Wallet Connectivity**: Connect with MetaMask.
- **Contract Transparency**: Immutable shipment records stored on-chain.
- **Responsive UI**: Built using React + Bootstrap.

## Installation Instructions

Clone the project and install dependencies:

```bash
git clone https://github.com/ujblockchain/deliverx.git
cd deliverx
```

Install thedependencies:

```bash
npm install
```

Navigate to the blockchain folder and install dependencies:

```bash
cd blockchain
npm install
```

Open the Ganache application on your local system.

Compile and deploy the smart contracts:

```bash
 npx hardhat ignition deploy ./ignition/modules/SupplyChainModule.js --network localhost
```

Update the **src/contracts/SupplyChain.json** with your abi and contract address.

Note: The ABI can be gotten from _blockchain/ignition/deployment/artifacts/SupplyChainModule#SupplyChain.json_ after deployment.

Return to the root directory and start the Next.js application:

```bash
 cd ..
npm run dev
```

Navigate to: http://localhost:3000 to view the application

## Tutorial Video for the application

Youtube Video Tutorial [Click Here to Watch](https://youtu.be/_aHKUBComZE)
