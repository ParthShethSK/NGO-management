import { NextResponse } from 'next/server';
// func imports
import { contractInstanceReturner, authenticateNGOAgainstNetwork, authenticateUser } from "../../../../interfaces/networkMapperFunctions";
import { getSignerForNetwork } from "../../../../interfaces/signerAndProvider";
// env variables
const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let network = searchParams.get('network'); // will be one of the l2 chains
  network = network === "maticmum" ? "mumbai" : network;
  let type = searchParams.get('type'); // type can be NGO or User (volunteer)
  type = type === "volunteer" ? "user" : type;
  const address = searchParams.get('address'); // type can be NGO or User (volunteer)
  // to get instance of main contract
  const signer = getSignerForNetwork("mumbai", null);
  const mainContractInstance = await contractInstanceReturner(mainContractAddress, signer);
  if (type === "ngo") {
    const isNGOinNetwork = await authenticateNGOAgainstNetwork(mainContractInstance, network, address);
    return NextResponse.json({ status: isNGOinNetwork });
  }
  else if (type === "user") {
    const isVolunteerRegistered = await authenticateUser(mainContractInstance, address);
    return NextResponse.json({ status: isVolunteerRegistered });
  }
}
