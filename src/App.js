import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import NFTList from "./components/marketplace/NFTList.jsx";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/isolated-monochrome-white.svg";
import logo from "./assets/img/isolated-monochrome-black.svg";
import "./App.css";

const App = function AppWrapper() {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const getBalance = async () => {
      if (account.accountId) {
        setBalance(await accountBalance());
      }
    };

    getBalance();
  }, [account.accountId]);

  return (
    <>
      <Notification />
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-between pt-3 pb-5">
            <Nav.Item>
              <img src={logo} style={{ width: "150px" }} alt="App logo"></img>
            </Nav.Item>
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <NFTList />
          </main>
        </Container>
      ) : (
        <Cover name="Near NFT Marketplace" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;
