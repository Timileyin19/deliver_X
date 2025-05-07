"use client";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useSupplyChain } from "../context/SupplyChainContext";

const NavBar = ({ setProfileModal }) => {
  const { account, connectWallet } = useSupplyChain();

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">DeliverX</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Nav>
            {account ? (
              <Button variant="dark" onClick={() => setProfileModal(true)}>
                {shortenAddress(account)}
              </Button>
            ) : (
              <Button variant="dark" onClick={connectWallet}>
                Connect Wallet
              </Button>
            )}
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
