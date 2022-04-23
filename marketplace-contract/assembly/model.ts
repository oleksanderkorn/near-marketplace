import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class NFTMetadata {
  title: string;
  description: string;
  media: string;
}

@nearBindgen
export class NFTData {
  token_id: string;
  receiver_id: string;
  metadata: NFTMetadata;

  public static fromProduct(product: Product): NFTData {
    const nft = new NFTData();
    nft.token_id = `${context.sender}-${product.id}`;
    nft.receiver_id = context.sender;
    const meta = new NFTMetadata();
    meta.title = product.name;
    meta.description = product.description;
    meta.media = product.image;
    nft.metadata = meta;
    return nft;
  }
}

@nearBindgen
export class ProductWrapper {
  product: Product;
  tokenId: string;
}
@nearBindgen
export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: u128;
  owner: string;
  sold: u32;
  buyers: string[];
  public static fromPayload(payload: Product): Product {
    const product = new Product();
    product.id = payload.id;
    product.name = payload.name;
    product.description = payload.description;
    product.image = payload.image;
    product.price = payload.price;
    product.owner = context.sender;
    product.buyers = [];
    return product;
  }
  public incrementSoldAmount(): void {
    this.buyers.push(context.sender);
    this.sold = this.sold + 1;
  }
}

export const listedProducts = new PersistentUnorderedMap<string, Product>(
  "LISTED_PRODUCTS"
);
