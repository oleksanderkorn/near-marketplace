import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createNFT(product) {
  product.id = uuid4();
  product.price = parseNearAmount(product.price + "");
  return window.contract.setProduct({ product }, GAS, parseNearAmount("0.1"));
}

export function getNFTs() {
  return window.contract.getProducts();
}

export async function mintNFT({ id, price }) {
  await window.contract.buyProduct({ productId: id }, GAS, price);
}
