import { ethers } from "ethers";
import { useState } from "react";
import getKeyboardsContract from "../utils/getKeyboardsContract";
import abi from "../utils/Keyboards.json";
import SecondaryButton from "./secondary-button";

export default function TipButton({ keyboardsContract, index }) {
  const contractAddress = "0x30aA2CC8b9683CdF8a13A8B48dB47172195b8978";
  const contractABI = abi.abi;

  const [mining, setMining] = useState(false);

  const keyboardsContract = getKeyboardsContract(ethereum);

  const submitTip = async (e) => {
    if (!keyboardsContract) {
      console.error("KeyboardsContract object is required to submit a tip");
      return;
    }

    setMining(true);
    try {
      const tipTxn = await keyboardsContract.tip(index, {
        value: ethers.utils.parseEther("0.01"),
      });
      console.log(`Tip transaction started: ${tipTxn.hash}`);

      await tipTxn.wait();
      console.log(`Sent tip: ${tipTxn.hash}`);
    } finally {
      setMining(false);
    }
  };

  return (
    <SecondaryButton onClick={submitTip} disabled={mining}>
      {mining ? "Tipping..." : "Tip 0.01 eth"}
    </SecondaryButton>
  );
}
