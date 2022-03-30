async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardContractsFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardContractsFactory.deploy();
  await keyboardsContract.deployed();

  console.log(`Contract deployed to: ${keyboardsContract.address}`);

  const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn1.wait();

  const keyboardTxn2 = await keyboardsContract
    .connect(somebodyElse)
    .create(1, false, "grayscale");
  await keyboardTxn2.wait();

  const balanceBefore = await hre.ethers.provider.getBalance(
    somebodyElse.address
  );
  console.log(
    `somebodyElse's balance before: ${hre.ethers.utils.formatEther(
      balanceBefore
    )}`
  );

  const tipTxn = await keyboardsContract.tip(1, {
    value: hre.ethers.utils.parseEther("1000"),
  });
  await tipTxn.wait();

  const balanceAfter = await hre.ethers.provider.getBalance(
    somebodyElse.address
  );
  console.log(
    `somebodyElse's balance after: ${hre.ethers.utils.formatEther(
      balanceAfter
    )}`
  );

  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
