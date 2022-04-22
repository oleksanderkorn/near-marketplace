import { context, ContractPromiseBatch } from "near-sdk-as";
import { Product, listedProducts } from "./model";

export function setProduct(product: Product): void {
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
  if (product.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the product's price");
  }
  ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
  product.incrementSoldAmount();
  listedProducts.set(product.id, product);
}
