# EthDapp-Boilerplate
This project is a minimal, frontend-only decentralized application (Dapp). It features a website using traditional web technologies interfacing a smart contract on the Ethereum blockchain.

## Getting started
1. Create an account on GitHub (here) or login to your account
2. Fork this repository to your own account (`Fork` button in the top right corner)
3. Open the settings (from your account) and find the `GitHub Pages` section, from the `Source` drop down select the `master branch` and click `save`
4. You should now see a URL that hosts your web-based decentralized application (dapp), e.g. https://scbuergel.github.io/EthDapp-Boilerplate/ navigate there to explore it!

Now your dapp probably told you
> I doesn't has web3 :(

because it cannot connect to the Ethereum blockchain yet. Time to change that:

## Using the dapp
1. Make sure you are using Google Chrome (latest version)
2. Open the Chrome Web Store (https://chrome.google.com/webstore/category/extensions) and install the free MetaMask extension that provides you a gateway to the Ethereum blockchain. Beware though, scammers are regularly publishing fake MetaMask version that want to steal your money! For now we dont bother too much as we're playing with fake money anyway.
3. Open the MetaMask extension (Chrome should now show a 🦊in the top right corner of your browser) and setup MetaMask following the on-screen instructions
4. Click in the top left corner of the MetaMask window to select the Ropsten testnet. Ether on this testnet are not real money and you can get them for free!
5. After changing to the Ropsten testnet click on the `BUY` button and then on the `ROPSTEN TESTNET FAUCET` button.
6. This should now open https://faucet.metamask.io/ where you can click on `request 1 ether from faucet`, after a few minutes you should receive you Ropsten testnet Ether and now you can transfer this fake money on to other accounts or use it to pay for the transaction fee (gas) when writing to the smart contract on the Ethereum blockchain.

## Write your own smart contract
1. Open https://remix.ethereum.org and click on the `+` button in the top left corner to create a new file, name it e.g. `HelloWorld.sol`.
2. In the newly created file, code your smart contract, or change the example provided in this repository.

**Hint**: The official Solidity documentation can be found at https://solidity.readthedocs.io/.

3. For testing your smart contract locally and without deploying it to a "real" blockchain you can test run it in a browser-sandbox. To do so click in the top right corner on `Run` and under `Environment` select `Javascript VM`. Now you can hit the red `Deploy` button and see buttons that trigger function calls for all functions of your smart contract.
4. Once you are ready to deploy your smart contract to the Ropsten testnet select `injected web3` (if this is not listed you might not have MetaMask installed) from `Run`>`Environment` and again hit `Deploy`. Now you should receive a MetaMask popup that asks you to sign the transaction and broadcast it by clicking on `Submit` (if this does not work make sure you have some Ropsten Ether on your balance and not just a balance of zero).
5. After a few minutes the smart contract should appear on the blockchain.

## Integrating your smart contract
1. If you want to interface the web application with your own smart contract, it needs two things: the smart contract address and the ABI of the smart contract. You can take both from Remix.
2. Smart contract address: after successfully deploying a smart contract to the Ropsten testnet, the smart contract instance appears in remix, it has a little copy button on the right of its name with which you can copy the address, it starts with `0x...`. Replace the variable `contractAddress` in the file `custom.js` with the address of your smart contract.

**Hint**: the address has to be in quotes (`"0xabc123..."`) otherwise you'll get weird errors.

3. Smart contract ABI: the ABI of the smart contract can also be found in Remix under the `Compile` tab, then select `Details` and scroll down to the ABI section and again press the copy button. Replace the variable `contractAbi` with the value.

**Hint**: The ABI is a JSON format and should NOT be in quotes, otherwise again weird error.

**Gotcha**: The ABI and the address need to be both updated if you change the contract, otherwise again weird error.

**Gotacha2**: If you changed function names and parameters, you need to also change the javascript interfacing via `contractInstance.getGreeting` and `contractInstance.setGreeting`.
