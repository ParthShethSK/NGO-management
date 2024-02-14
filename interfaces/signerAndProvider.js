const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");
const { networks, rpcUrls } = require("./networks");
const envpath = path.join(__dirname + "/.." + '/.env.local');
require('dotenv').config({ path: envpath })

const pk = `0x${process.env.NEXT_PUBLIC_PRIVATEKEY}`;

const getProviderForNetwork = (network) => {
  const rpc = getRPCUrlForNetwork(network);
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

const getNetworkObject = (network) => {
  return networks[`${network}`];
}

const getRPCUrlForNetwork = (network) => {
  return rpcUrls[`${network}`];
}

module.exports = {
  getProviderForNetwork,
  getSignerForNetwork
}
