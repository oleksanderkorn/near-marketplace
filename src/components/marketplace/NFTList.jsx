import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddNFT from "./CreateNFT";
import NFT from "./NFT";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getNFTs, mintNFT, createNFT } from "../../utils/marketplace";

const NFTList = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const listNFTs = async () => {
    try {
      setLoading(true);
      setNFTs(await getNFTs());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const createNewNFT = async (data) => {
    setLoading(true);
    createNFT(data).then(
      (resp) => {
        toast(<NotificationSuccess text="Product added successfully." />);
        listNFTs();
        setLoading(false);
      },
      (error) => {
        console.log({ error });
        toast(<NotificationError text="Failed to create a product." />);
        setLoading(false);
      }
    );
  };

  const buy = async (id, price) => {
    try {
      await mintNFT({
        id,
        price,
      }).then((resp) => listNFTs());
      toast(<NotificationSuccess text="Product bought successfully" />);
    } catch (error) {
      toast(<NotificationError text="Failed to purchase product." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listNFTs();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">All Available Listings</h1>
            <AddNFT save={createNewNFT} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {nfts.map((_product, key) => (
              <NFT
                key={key}
                product={{
                  ..._product,
                }}
                buy={buy}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NFTList;
