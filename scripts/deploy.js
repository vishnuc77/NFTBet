const fs = require("fs");
const { ethers } = require("hardhat");

const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Staking = await ethers.getContractFactory("StakingContract");
  const staking = await Staking.deploy(deployer.address);

  const Nft = await ethers.getContractFactory("Nft");
  const nft = await Nft.deploy();

  console.log("Staking Contract Address ", staking.address);
  console.log("NFT Contract Address ", nft.address);

  const data_staking = {
    address: staking.address,
    abi: JSON.parse(staking.interface.format("json")),
  };
  fs.writeFileSync("frontend/src/Staking.json", JSON.stringify(data_staking));

  const data_nft = {
    address: nft.address,
    abi: JSON.parse(nft.interface.format("json")),
  };
  fs.writeFileSync("frontend/src/Nft.json", JSON.stringify(data_nft));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
