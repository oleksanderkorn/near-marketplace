# NEAR Development 101 Challenge Project

Demo project is accessible at [https://oleksanderkorn.github.io/near-marketplace](https://oleksanderkorn.github.io/near-marketplace).
The project allows people to list a new NFT template that can be bought(minted) by everyone else but only once.
If the user would like to list a new item he creates the new item, sets the Title, Description, and the media link of the future NFTs,
and pays a one-time listing fee of 0.1 NEAR to the marketplace contract.
If another user wants to mint any NFT listed in the marketplace, he should pay the mint price to the owner of that NFT Template.

# Marketplace Smart Contract

The main marketplace Smart Contract is built with Assembly Script similar to the original smart contract from the tutorial.
It has quite a few changes to be able to mint NFT's and keep track of the people who did bought the specific NFTs.
It is using cross contract calls to calls another contract which is responsible of the NFT minting.

The demo marketplace contract is deployed to `marketplace.lkskrnk.testnet`.

# NFT Smart Contract

NFT minting contract is written on rust and it is based on the [Near NFT Example](https://examples.near.org/NFT)

The demo nft market contract is deployed to `nftmarket.lkskrnk.testnet`.

# UI Application

The frontend is using same React example adapted to the needs of the NFT marketplace, it shows if the NFT jas been already minted by the user,
and has some updated layout, new icons and logo.

## Build, deploy and run

### Build, deploy and initialize NFT Smart Contract

```
cd nft-contract
./build.sh
export NFT_CONTRACT=nftmarket.lkskrnk.testnet
near create-account $NFT_CONTRACT --masterAccount lkskrnk.testnet --initialBalance 5
near call $NFT_CONTRACT new_default_meta '{"owner_id": "'$NFT_CONTRACT'"}' --accountId $NFT_CONTRACT
```

### Build and deploy Marketplace Smart Contract

```
cd marketplace-contract
yarn asb
export MARKETPLACE_CONTRACT=marketplace.lkskrnk.testnet
near create-account $MARKETPLACE_CONTRACT --masterAccount lkskrnk.testnet --initialBalance 5
near deploy --accountId=$MARKETPLACE_CONTRACT --wasmFile=build/release/marketplace-contract.wasm
```

### Build and deploy UI

If you want to reuse you can fork the repository, clone it, change `homepage` in github to your userName yours and deploy top GithubPages using command:

```
yarn
yarn build
yarn deploy
```
