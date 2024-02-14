import { ethers } from "ethers";
import axios from "axios";
import { NextResponse } from 'next/server';
// contract abis
import mainContractAbi from "../../../../artifacts/contracts/NetworkMapper.sol/NetworkMapper.json"
import subContractAbi from "../../../../artifacts/contracts/SubContract.sol/SubContract.json";
// func imports
import { getSignerForNetwork } from "../../../../interfaces/signerAndProvider.js"
// env variables
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

const getMainContractInstance = async () => {
  const signer = getSignerForNetwork("mumbai", null);
  const mainContractInstance = new ethers.Contract(mainContractAddress, mainContractAbi.abi, signer);
  return mainContractInstance;
}

const getSubContractInstance = async (network, subContractAddress) => {
  const signer = getSignerForNetwork(network, null);
  const subContractInstance = new ethers.Contract(subContractAddress, subContractAbi.abi, signer);
  return subContractInstance;
}

const getSubContractAddress = async (network) => {
  return await axios.get(`${apiURL}/getContractAddress?network=${network}`);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get('network'); // will be one of the l2 chains
  const type = searchParams.get('type');
  if (type === "sub") {
    // to get instance of sub contract
    const subContractAddress = getSubContractAddress(network);
    const subContractInstance = await getSubContractInstance(network, subContractAddress);
    return NextResponse.json(subContractInstance);
  }
  else if (type === "main") {
    // to get instance of sub contract
    const mainContractInstance = await getMainContractInstance();
    return NextResponse.json(mainContractInstance);
  }
}
