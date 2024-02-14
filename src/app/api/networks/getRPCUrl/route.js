import { ethers } from "ethers";

// json-rpc urls
const rpcUrls = {
  mumbai: 'https://polygon-mumbai.blockpi.network/v1/rpc/public',
  scroll: 'https://alpha-rpc.scroll.io/l2',
  gnosis: 'https://rpc.gnosischain.com',
  optimism: 'https://endpoints.omniatech.io/v1/op/goerli/public',
  filecoinHyperspace: 'https://api.hyperspace.node.glif.io/rpc/v1',
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get('network');
  return new Response(rpcUrls[`${network}`])
}
