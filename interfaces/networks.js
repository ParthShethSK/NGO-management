const { ethers } = require("ethers");

// network information
const mumbai = ethers.providers.getNetwork(80001);
const scroll = ethers.providers.getNetwork(534353);
const gnosis = ethers.providers.getNetwork(100);
const optimism = ethers.providers.getNetwork(420);
const filecoinHyperspace = ethers.providers.getNetwork(3141);
// networks object setup
const networks = {
  mumbai: mumbai,
  scroll: scroll,
  gnosis: gnosis,
  optimism: optimism,
  filecoinHyperspace: filecoinHyperspace,
};
// json-rpc urls
const rpcUrls = {
  mumbai: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
  scroll: "https://alpha-rpc.scroll.io/l2",
  gnosis: "https://rpc.gnosischain.com",
  optimism: "https://endpoints.omniatech.io/v1/op/goerli/public",
  filecoinHyperspace: "https://api.hyperspace.node.glif.io/rpc/v1",
};

module.exports = { networks, rpcUrls };

module.exports = { networks, rpcUrls };