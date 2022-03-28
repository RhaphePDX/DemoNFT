import { ethers } from "ethers";
import demoNft from '../utils/DemoNFT.json';

const CONTRACT_ADDRESS = "0xa2AAa19041C4f56E6fa098273276fB4BF5B5BDb4";

const MintButton = () => {

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, demoNft.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.mint();

        console.log("Mining...please wait.")
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={askContractToMintNft} className="cta-button connect-wallet-button p-5 bg-red-600 text-white mt-10">Mint NFT</button>
}

export default MintButton