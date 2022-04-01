import { ethers } from "ethers";
import whitelistNFT from '../utils/WhitelistNFT.json';

//const CONTRACT_ADDRESS = "0xa2AAa19041C4f56E6fa098273276fB4BF5B5BDb4";
const CONTRACT_ADDRESS = "0x3345EBf437b1993ef446C5052c65F8AE82B4a35c";

const MintButton = () => {

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      const coupon = {
        "r":"0x80ff20f07ab1da913d57966eebb57b2f3db0207ed181531f6fe776a1dd8c8de1",
        "s":"0x7a4f19d0859a2022e63005f1f0f404a50ea06e00399d11448849e8b99ffb6092",
        "v":27
      }
      const allotted = 2;
      const qty = 1;
      const priceInEth = 0.0001;
      

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, whitelistNFT.abi, signer);
        
        console.log("Going to pop wallet now to pay gas...")

        const mintPriceBn = ethers.utils.parseEther(priceInEth.toString());
        console.log('Multiplier:' + mintPriceBn.mul(qty));
        
        let nftTxn = await connectedContract.mintPresale(qty,allotted,coupon,mintPriceBn.mul(qty));

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