import { NextResponse } from 'next/server';
// func imports
import { contractInstanceReturner as subContractInstanceReturner, getNGOMetadata } from '../../../../../interfaces/subContractFunctions';
import { contractInstanceReturner, getSubContractAddressInNetwork } from "../../../../../interfaces/networkMapperFunctions";
import { getSignerForNetwork } from "../../../../../interfaces/signerAndProvider";
// env variables
const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const network = searchParams.get('network');
  // to get signers to interact with both contracts 
  const signer = getSignerForNetwork("mumbai", null);
  const signerForSub = getSignerForNetwork(network, null);
  // to get instance of main contract
  const mainContractInstance = await contractInstanceReturner(mainContractAddress, signer);
  const subContractAddress = await getSubContractAddressInNetwork(mainContractInstance, network);
  const subContractInstance = await subContractInstanceReturner(subContractAddress, signerForSub);
    const NGOMetadata = await getNGOMetadata(subContractInstance, address);
    console.log(NGOMetadata)
    return NextResponse.json(NGOMetadata)
    
}

