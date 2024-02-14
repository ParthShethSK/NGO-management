import { ethers } from "ethers";
import { NextResponse } from "next/server";
// func imports
import {
  contractInstanceReturner,
  getUserData,
} from "../../../../../interfaces/networkMapperFunctions";
import { getSignerForNetwork } from "../../../../../interfaces/signerAndProvider";
// env variables
const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  // to get signers to interact with both contracts
  const signer = getSignerForNetwork("mumbai", null);
  // to get instance of main contract
  const mainContractInstance = await contractInstanceReturner(
    mainContractAddress,
    signer
  );
  try {
    const UserMetadata = await getUserData(mainContractInstance, address);
    const returnData = {
      name: UserMetadata.name,
      balance: ethers.BigNumber.from(UserMetadata.balance).toString(),
      age: UserMetadata.age,
    };
    return NextResponse.json(returnData);
  } catch (err) {
    return NextResponse.json(err);
  }
}
