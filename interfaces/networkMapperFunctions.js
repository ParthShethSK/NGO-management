const { ethers } = require("ethers");
const NetworkMapperJson = require("../artifacts/contracts/NetworkMapper.sol/NetworkMapper.json");
const { abi } = NetworkMapperJson;
const timestamp = require("time-stamp");

const contractInstanceReturner = (address, signerOrProvider) => {
  const networkMapperContractInstance = new ethers.Contract(
    address,
    abi,
    signerOrProvider
  );
  return networkMapperContractInstance;
};

const getSubContractAddressInNetwork = (contractInstance, network) => {
  return contractInstance.contractAddresses(network);
};

const setSubContractAddressInNetwork = (contractInstance, network, address) => {
  return contractInstance.changeAddressOfContract(network, address);
};

const authenticateNGOAgainstNetwork = async (
  contractInstance,
  network,
  address
) => {
  const networkReturned = await contractInstance.NGOToNetworkMapping(address);
  console.log("networkReturned", networkReturned);
  if (network === networkReturned) return true;
  else return false;
};

const authenticateUser = async (contractInstance, address) => {
  const userMetadataReturned = await contractInstance.userMapping(address);
  console.log("userMetadataReturned", userMetadataReturned);
  if (userMetadataReturned.name !== "") return true;
  else return false;
};

const getUserData = (contractInstance, address) => {
  return contractInstance.userMapping(address);
}

const checkIfExpired = (eventEndDate) => {
  timestamp(eventEndDate) < timestamp(Date.now()) ? true : false;
};

const checkForLastThreeEvents = (contractInstance, address) => {
  const arrOfActivities =
    contractInstance.userMapping[address].listOfRegisteredActivities();
  if (arrOfActivities.length > 3) {
    const lastThreeEvents = arrOfActivities.slice[(-3, arrOfActivities.length)];
    const temp = lastThreeEvents.reduce((item) => {
      checkIfExpired(item.lastDateForActivity);
    });
    if (temp.length < 3) return true;
    else return false;
  }
};

module.exports = {
  contractInstanceReturner,
  getSubContractAddressInNetwork,
  setSubContractAddressInNetwork,
  authenticateNGOAgainstNetwork,
  authenticateUser,
  getUserData,
  checkForLastThreeEvents,
};
