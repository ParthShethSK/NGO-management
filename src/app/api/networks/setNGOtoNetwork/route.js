import { NextResponse } from "next/server";
// func imports
import {
  contractInstanceReturner,
  authenticateNGOAgainstNetwork,
  authenticateUser,
} from "../../../../../interfaces/networkMapperFunctions";
import { getSignerForNetwork } from "../../../../../interfaces/signerAndProvider";
// env variables
const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get("network"); // will be one of the l2 chains
  const address = searchParams.get("address"); // type can be NGO or User (volunteer)
  // to get instance of main contract
  const signer = getSignerForNetwork("mumbai", null);
  const mainContractInstance = await contractInstanceReturner(
    mainContractAddress,
    signer
    );
  try {
    mainContractInstance.setNGONetworkMapping(network, address);
    return NextResponse.json({ status: true });
  } catch (err) {
    return NextResponse.json({ status: false });
  }
}
