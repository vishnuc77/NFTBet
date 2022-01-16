const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  Staking = await ethers.getContractFactory("StakingContract");

  [owner, addr1, addr2] = await ethers.getSigners();
  hardhatStaking = await Staking.deploy(addr1.address);
  await hardhatStaking.deployed();

  console.log("Staking Address ", hardhatStaking.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
