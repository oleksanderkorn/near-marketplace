import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";

const NFT = ({ product, buy }) => {
  const account = window.walletConnection.account();
  const { id, price, name, description, sold, location, image, owner, buyers } =
    product;

  const triggerBuy = () => {
    buy(id, price);
  };

  const getNftLink = (accountId) => {
    return `https://wallet.testnet.near.org/nft-detail/nftmarket.lkskrnk.testnet/${accountId}-${id}`;
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">
              Listed by: {owner}
            </span>
            <Badge bg="secondary" className="ms-auto">
              {sold} Minted
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          {account.accountId && buyers.indexOf(account.accountId) === -1 ? (
            <Button
              variant="outline-dark"
              onClick={triggerBuy}
              className="w-100 py-3"
            >
              Mint NFT for {utils.format.formatNearAmount(price)} NEAR
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              className="w-100 py-3"
              target="_blank"
              link="noreferrer"
              href={getNftLink(account.accountId)}
            >
              NFT minted, click to view!
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

NFT.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default NFT;
