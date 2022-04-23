# NEAR Development 101 Challenge Project

Demo project is accessible at [https://oleksanderkorn.github.io/near-marketplace](https://oleksanderkorn.github.io/near-marketplace).
The project allows people to list a new NFT template which can be bought(minted) by everyone else but only once.
If user would like to list a new item he creates the new item and pays one-tome listing fee of 0.1 NEAR to the markeplace contract.
If a user wants to mint an NFT listed in the marketplace, he will pay the mint price to the owner of that NFT Template.

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
