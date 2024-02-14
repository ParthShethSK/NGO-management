import { NextResponse } from 'next/server';
// func imports
import { contractInstanceReturner as subContractInstanceReturner } from '../../../../interfaces/subContractFunctions';
import { contractInstanceReturner, getSubContractAddressInNetwork, authenticateUser } from "../../../../interfaces/networkMapperFunctions";
import { getSignerForNetwork } from "../../../../interfaces/signerAndProvider"; 
// env variables
const mainContractAddress = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address'); // type can be NGO or User (volunteer)
  const name = searchParams.get('name'); 
  const location = searchParams.get('location');
  const shiftStartTime = searchParams.get('shiftStartTime');
  const shiftEndTime = searchParams.get('shiftEndTime');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDates');
  // to get instance of main contract
  const signer = getSignerForNetwork("mumbai", null);
  const mainContractInstance = await contractInstanceReturner(mainContractAddress, signer);
  const subContractAddress = await getSubContractAddressInNetwork(mainContractInstance, "mumbai", address);
  const subContractInstance = await subContractInstanceReturner(subContractAddress, signer);
  try {
    subContractInstance.addActivity(name, location, shiftStartTime, shiftEndTime, startDate, endDate);
     return NextResponse.json({ status: true });
  }
  catch (err) {
    return NextResponse.json({ status: false });
  }

}


export const config = {
  api: {
    bodyParser: false,
  },
};