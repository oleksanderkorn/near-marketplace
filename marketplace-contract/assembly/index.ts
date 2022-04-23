import {
  context,
  ContractPromise,
  ContractPromiseBatch,
  u128,
} from "near-sdk-as";
import { Product, listedProducts, NFTData, ProductWrapper } from "./model";

const NFT_CONTRACT = "nftmarket.lkskrnk.testnet";
const NFT_CONTRACT_MINT_NFT = "nft_mint";
const LISTING_FEE = u128.fromString("100000000000000000000000");

function mintNft(nftData: NFTData): ContractPromise {
  return ContractPromise.create(
    NFT_CONTRACT,
    NFT_CONTRACT_MINT_NFT,
    nftData.encode(),
    10_000_000_000_000,
    context.attachedDeposit
  );
}

export function setProduct(product: Product): void {
  if (context.attachedDeposit < LISTING_FEE) {
    throw new Error(
      "Attached deposit should cover the Listing Fee of 0.1 NEAR"
    );
  }
  let storedProduct = listedProducts.get(product.id);
  if (storedProduct !== null) {
    throw new Error(`a product with ${product.id} already exists`);
  }
  listedProducts.set(product.id, Product.fromPayload(product));
}

export function getProduct(id: string): Product | null {
  return listedProducts.get(id);
}

export function getProducts(): Product[] {
  return listedProducts.values();
}

export function buyProduct(productId: string): void {
  const product = getProduct(productId);
  if (product == null) {
    throw new Error("product not found");
  }
  if (product.buyers.indexOf(context.sender) > -1) {
    throw new Error(
      "You have already mint this NFT. You can only mint an NFT once."
    );
  }
  if (product.price > context.attachedDeposit) {
    throw new Error(
      "attached deposit should not be less then to the product's price + storage deposit gas price"
    );
  }
  let nftData: NFTData = NFTData.fromProduct(product);
  const wrapper = new ProductWrapper();
  wrapper.tokenId = nftData.token_id;
  wrapper.product = product;

  const promise = mintNft(nftData).then(
    "marketplace.lkskrnk.testnet",
    "onNftMinted",
    wrapper.encode(),
    10_000_000_000_000,
    context.attachedDeposit
  );
  promise.returnAsResult();
}

export function onNftMinted(product: Product, tokenId: string): void {
  let results = ContractPromise.getResults();
  let addItemResult = results[0];
  if (addItemResult.failed) {
    throw new Error(`Failed to mint NFT with Token ID ${tokenId}.`);
  } else {
    ContractPromiseBatch.create(product.owner).transfer(
      context.attachedDeposit
    );
    product.incrementSoldAmount();
    listedProducts.set(product.id, product);
  }
}
