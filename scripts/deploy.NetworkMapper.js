const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const NetworkMapper = await hre.ethers.getContractFactory("NetworkMapper");

  const data = fs.readFileSync("contractAddresses.txt", "utf8");
  let lines = data.split("\n");
  if (lines[lines.length - 1] !== '' || lines[lines.length - 1] !== null) {
    lines.slice(0, -1)
  }
  let address
  lines = lines.map((line) => {
    address = line.substring((line.indexOf(":") + 1));
    return address == "" ? "0x0000000000000000000000000000000000000000" : address;
  })
  console.log(lines);

  const networkMapperInstance = await NetworkMapper.deploy(lines);
  await networkMapperInstance.deployed();
  console.log(`Contract NetworkMapper.sol deployed to ${networkMapperInstance.address}, contains addresses of other contracts on each chain`);

  const addressText = `mumbai:${networkMapperInstance.address}\n`;
  fs.appendFile("contractAddresses.txt", addressText, err => { console.log(err) })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
