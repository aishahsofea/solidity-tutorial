import { ethers } from "ethers";
import abi from "../utils/Keyboards.json";

const contractAddress = "0x30aA2CC8b9683CdF8a13A8B48dB47172195b8978";
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
