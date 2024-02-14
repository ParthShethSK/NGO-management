import { ethers } from "ethers";
import axios from "axios";
import { NextResponse } from 'next/server';

// env variables
const apiURL = process.env.NEXT_PUBLIC_API_URL;
const pk = `0x${process.env.NEXT_PUBLIC_PRIVATEKEY}`;

const getProviderForNetwork = (network) => {
  const rpc = getRPCUrl(network);
  const networkObj = getNetworkObject(network);
  const provider = new ethers.providers.JsonRpcProvider(rpc, networkObj);
  return provider;
}

const getSignerForNetwork = (network, pkey) => {
  const provider = getProviderForNetwork(network);
  pkey = (pkey === null || pkey === '') ? pk : `0x${pkey}`;
  const signer = new ethers.Wallet(pkey, provider);
  return signer;
}

const getRPCUrl = async (network) => {
  return await axios.get(`${apiURL}/networks/getRPCUrl?network=${network}`);
}

const getNetworkObject = async (network) => {
  return await axios.get(`${apiURL}/networks/getNetworkObject?network=${network}`);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get('network');
  const type = searchParams.get('type');
  if (type === "signer") {
    const signer = getSignerForNetwork(network, null);
    return NextResponse.json(signer);
  }
  else if (type === "provider") {
    const provider = getProviderForNetwork(network);
    return NextResponse.json(provider);
  }
}
