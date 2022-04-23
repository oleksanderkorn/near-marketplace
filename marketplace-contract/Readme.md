### install dependencies

```
npm install -g near-cli assemblyscript asbuild
```

### Connect account and create subaccount

```
near login
near create-account marketplace.lkskrnk.testnet --masterAccount lkskrnk.testnet --initialBalance 5
```

### Compile and Deploy smart contract

```
yarn asb
near deploy --accountId=marketplace.lkskrnk.testnet --wasmFile=build/release/near-marketplace-contract.wasm
```

### Trigger call(write) to add product and view functions to get product

```
near call marketplace.lkskrnk.testnet setProduct '{"id": "0", "productName": "tea"}' --accountId=lkskrnk.testnet
near view marketplace.lkskrnk.testnet getProduct '{"id": "0"}'
```

### Redeploy contract after change

```
yarn asb
near deploy --accountId=marketplace.lkskrnk.testnet --wasmFile=build/release/near-marketplace-contract.wasm
```

### Add new product json using call and view the result

```
near call marketplace.lkskrnk.testnet setProduct '{"product": {"id": "0", "name": "BBQ", "description": "Grilled chicken and beef served with vegetables and chips.", "location": "Berlin, Germany", "price": "1000000000000000000000000", "image": "https://i.imgur.com/yPreV19.png"}}' --accountId=lkskrnk.testnet

near view marketplace.lkskrnk.testnet getProduct '{"id": "0"}'
```

### Buy product

```
near create-account buyer.lkskrnk.testnet --masterAccount lkskrnk.testnet --initialBalance 6
near call marketplace.lkskrnk.testnet buyProduct '{"productId": "0"}' --depositYocto=1000000000000000000000000 --accountId=buyer.lkskrnk.testnet
near view marketplace.lkskrnk.testnet getProduct '{"id": "0"}'
```

--accountId
