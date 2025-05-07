// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SupplyChain {
    enum Status { Created, PickedUp, Delivered }

    struct Shipment {
        address payable seller;
        address payable logisticsProvider;
        address receiver;
        uint256 price; 
        string pickupDate;
        string deliveryDate;
        string distance;
        Status status;
    }

    uint256 public shipmentCounter; 
    mapping(uint256 => Shipment) public shipments;

    event ShipmentCreated(
        uint256 indexed shipmentId, 
        address indexed seller, 
        uint256 price
    );

    event ShipmentPickedUp(
        uint256 indexed shipmentId,
        address indexed logisticsProvider
    );

    event ShipmentDelivered( 
        uint256 indexed shipmentId, 
        address indexed receiver, 
        string date
    );

    function createDelivery(
        address receiver, 
        string memory pickupDate, 
        string memory distance) public payable {
            // ensure the price is more than 0 
            require(msg.value > 0, "Amount must be greater than 0");

            // create the a new shipment
            shipments[shipmentCounter] = Shipment({
                seller: payable(msg.sender), 
                logisticsProvider: payable(address(0)), 
                receiver: receiver, 
                price: msg.value,  
                pickupDate: pickupDate,
                deliveryDate: "",
                distance: distance,
                status: Status.Created
            });

            // emit the ShipmentCreated event
            emit ShipmentCreated(shipmentCounter, msg.sender, msg.value);

            // increase the shipment counter
            shipmentCounter++; 
    }

    function pickUpDelivery(uint256 shipmentId) public {
        Shipment storage shipment = shipments[shipmentId];

        // shipment is currently at the created stage
        require(shipment.status == Status.Created, "Shipment had already been picked up or completed");

        // valid seller
        require(shipment.seller != address(0), "Shipment does not exist.");

        shipment.logisticsProvider = payable(msg.sender);
        shipment.status = Status.PickedUp;
        

        emit ShipmentPickedUp(shipmentId, msg.sender);
    }

    function confirmDelivery(
        uint256 shipmentId, 
        string memory deliveryDate
    ) public {
        // get the delivery from blockchain 
        Shipment storage shipment = shipments[shipmentId]; 

        // check the status to be sure it has not been delivered 
        require(shipment.status == Status.PickedUp, "Shipment not picked up yet");

        // ensure that only the receiver can confirm receipt of the parcel 
        require(msg.sender == shipment.receiver, "Only the receiver can confirm delivery.");

        // set the status to delivered and update the delivery date 
        shipment.status = Status.Delivered;
        shipment.deliveryDate = deliveryDate;

        // transfer money to the logistics provider 
        shipment.logisticsProvider.transfer(shipment.price);

        // emit the shipmentDelivered event
        emit ShipmentDelivered(shipmentId, msg.sender, deliveryDate);
    }



}