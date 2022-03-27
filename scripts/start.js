async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardContractsFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await keyboardContractsFactory.deploy();
  await keyboardsContract.deployed();

  console.log(`Contract deployed to: ${keyboardsContract.address}`);

  let keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);

  const keyboardTxn1 = await keyboardsContract.create("Keyboard 1");
  await keyboardTxn1.wait();

  const keyboardTxn2 = await keyboardsContract.create("Keyboard 2");
  await keyboardTxn2.wait();

  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);

  keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards();
  console.log("As somebody else", keyboards);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
