async function main() {
  const keyboardContractsFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardContractsFactory.deploy();
  await keyboardsContract.deployed();

  console.log(`Contract deployed to: ${keyboardsContract.address}`);

  const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn1.wait();

  const keyboardTxn2 = await keyboardsContract.create(1, false, "grayscale");
  await keyboardTxn2.wait();

  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
