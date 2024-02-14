import { ethers } from "ethers";
import { NextResponse } from "next/server";

// network information
const NetworkArray = ["filecoinHyperspace", "gnosis", "scroll", "optimism"];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get("index");
  return NextResponse.json({ network: NetworkArray[`${network}`] });
}
