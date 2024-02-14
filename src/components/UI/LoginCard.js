import { useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";

export default function Login(props) {

  const [type, setType] = useState("volunteer");
  // chain info
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  // router obj
  const router = useRouter();
  const selectedTypeStyles =
    "p-4 m-2 text-white text-xl rounded w-full transition duration-500 ease-in-out  ";

  const { address, isConnected } = useAccount();

  const verifyChains = () => {
    if (type === "volunteer" && chain.network !== "maticmum") {
      // switch to mumbai
      switchNetwork?.(80001);
    }
  }

  const handleProceed = async () => {
    // verify if volunteer is on mumbai, if NGO is not on mumbai
    verifyChains();
    const res = await axios.get(`/api/authUserOrNGO?network=${chain.network}&address=${address}&type=${type}`);
    const authStatus = res.data.status;
    if (type === "volunteer") {
      if (authStatus === true) {
        router.push("/volunteer");
      }
      else {
        router.push("/onboarding/volunteer");
      }
    } else if (type === "ngo") {
      if (authStatus === true) {
        router.push("/ngo");
      }
      else {
        router.push("/onboarding/ngo");
      }
    }
  }

  return (
    <div className='flex flex-col justify-center space-y-8 items-center text-white'>
      <div className='max-w-sm rounded overflow-hidden shadow-lg bg-black'>
        <div className='px-6 py-4 flex flex-col justify-center relative'>
          <div className='container mb-2 flex flex-col items-center py-3 gap-y-2 space-y-4'>
            <div>
              <span className='font-bold font-space text-4xl'>Join Us</span>
            </div>
            <div>
              <p className='container font-light font-sub text-xl text-center '>
                Why not make earth better{" "}
                <span className='text-yellow-100 font-semibold'>together?</span>
              </p>
            </div>
            <div className='flex items-center border border-gray-200 rounded-xl w-full text-center'>
              <button
                id="bordered-radio-1"
                value="volunteer"
                name="type"
                onClick={() => {
                  setType("volunteer");
                }}
                className={
                  selectedTypeStyles +
                  (type === "volunteer" ? "bg-amber-500" : null)
                }>
                Volunteer
              </button>
              |
              <button
                id="bordered-radio-1"
                value="ngo"
                name="type"
                onClick={() => {
                  setType("ngo");
                }}
                className={
                  selectedTypeStyles + (type === "ngo" ? "bg-amber-500" : null)
                }>
                NGO
              </button>
            </div>
            <ConnectButton accountStatus="address" chainStatus="name" />
            {address && isConnected &&
              <button id="bordered-radio-1"
                onClick={handleProceed}
                className={selectedTypeStyles + (type === "ngo" ? "bg-amber-500" : "bg-purple-500")}
              >
                Proceed {isLoading && pendingChainId === 80001 && ' (switching)'}
              </button>

            }
          </div>
        </div>
      </div>
    </div>
  );
}
