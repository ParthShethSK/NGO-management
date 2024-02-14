import { useState } from "react";
import pinFileToIPFS from "../../../interfaces/pinata";

export default function Home() {
  const [file, setImage] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

  const handleSubmit = async (event) => {
    console.log(file);
    const response = await pinFileToIPFS(file);
    console.log(response);
  };

  return (
    <div className="justify-center items-center text-center gap-8 flex flex-row font-space">
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-4/5 px-4 py-4 mt-6 shadow-lg rounded-lg bg-white space-y-8">
        <div className="font-bold text-xl mb-2 text-amber-500">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            Upload proof of work
          </h5>
          <p className="font-normal text-gray-400 font-sub text-lg">
            Upload PNGs only. Make sure to clock out before the stipulated
            ending time!
          </p>
        </div>
        <div>
          <div className="font-bold text-xl mb-2 text-white flex flex-col justify-center items-center gap-y-8">
            <input
              type="file"
              name="myImage"
              onChange={uploadToClient}
              className="text-black font-light items-center justify-center text-center border-2 border-gray-200"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white !bg-amber-700 hover:!bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-space rounded-lg text-xl px-5 py-2.5 text-center "
            >
              Upload photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
