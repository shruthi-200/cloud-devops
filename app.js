import { ethers } from "ethers";

import contractABI from "./SimpleStorageABI.json";

const contractAddress =
    "0x0fC5025C764cE34df352757e82f7B5c4Df39A836";

let contract;

async function connectWallet() {

    if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
    }

    await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    const provider =
        new ethers.BrowserProvider(window.ethereum);

    const signer =
        await provider.getSigner();

    contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    document.getElementById("status").innerText =
        "Wallet Connected";
}


async function setNumber() {

    const value =
        document.getElementById("number").value;

    const transaction =
        await contract.setNumber(value);

    document.getElementById("status").innerText =
        "Transaction waiting for confirmation...";

    await transaction.wait();

    document.getElementById("status").innerText =
        "Number stored successfully";
}


async function getNumber() {

    const value =
        await contract.getNumber();

    document.getElementById("result").innerText =
        "Stored Number: " + value.toString();
}

