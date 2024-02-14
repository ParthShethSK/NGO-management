const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const subContract = await hre.ethers.getContractFactory("SubContract");
  const subContractInstance = await subContract.deploy();

  const addressText = `${subContractInstance.address}\n`;

  fs.appendFile("contractAddresses.txt", addressText, err => { console.log(err) })

}

main().catch((error) => {
  console.error(error, "Error encountered");
  fs.appendFile("contractAddresses.txt", "\n");
  process.exitCode = 1;
});
