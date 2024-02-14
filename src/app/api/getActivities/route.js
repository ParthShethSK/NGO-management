import { ethers } from "ethers";
// contract abis
import mainContractAbi from "../../../../artifacts/contracts/NetworkMapper.sol/NetworkMapper.json";
// func imports
import { getSignerForNetwork } from "../../../../interfaces/signerAndProvider.js"
// env variables
const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;


const getSubContractAddress = async (network) => {
  const signer = getSignerForNetwork("mumbai", null);
  const mainContractInstance = new ethers.Contract(mainContractAddress, mainContractAbi.abi, signer);
  return await mainContractInstance.contractAddresses(network);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get('network'); // will be one of the l2 chains
  // to get instance of sub contract
  const subContractAddress = await getSubContractAddress(network);
  // return NextResponse.json({ address: subContractAddress })
  return new Response(subContractAddress);
}
