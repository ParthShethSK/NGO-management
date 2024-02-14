const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("NetworkMapper", function() {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNetworkMapperFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const NetworkMapper = await ethers.getContractFactory("NetworkMapper");
    const networkMapperInstance = await NetworkMapper.deploy();

    return { owner, otherAccount, networkMapperInstance };
  }

  describe("Deployment of NetworkMapper.sol", function() {
    it("Should set the right owner", async function() {
      const { networkMapperInstance, owner } = await loadFixture(deployNetworkMapperFixture);
      expect(await networkMapperInstance.owner()).to.equal(owner.address);
    });
  });
})
