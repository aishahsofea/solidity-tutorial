async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardContractsFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardContractsFactory.deploy();
  await keyboardsContract.deployed();

  console.log(`Contract deployed to: ${keyboardsContract.address}`);

  const keyboardTxn = await keyboardsContract.create(0, true, "sepia");
  const keyboardTxnReceipt = await keyboardTxn.wait();
  // console.log(keyboardTxnReceipt.events);

  const tipTxn = await keyboardsContract
    .connect(somebodyElse)
    .tip(0, { value: hre.ethers.utils.parseEther("1") });
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
