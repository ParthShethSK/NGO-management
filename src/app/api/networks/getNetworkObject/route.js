import { ethers } from "ethers";
import { NextResponse } from 'next/server';

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
  filecoinHyperspace: filecoinHyperspace
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get('network');
  return NextResponse.json(networks[`${network}`])
}
