import './styles/App.css';
import gitHubLogo from './assets/github-mark-light-32px.png';
import React, {useState} from "react";
import MintButton from './components/MintButton';
import { OnboardingButton } from './components/OnboardingButton';

const GITHUB_HANDLE = 'RhaphePDX';
const GITHUB_LINK = `https://github.com/${GITHUB_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {    

  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App bg-gray-900 min-h-screen">
      <header className="text-right p-10">
        <OnboardingButton accounts={accounts} setAccounts={setAccounts} />
      </header>
      <div>
        <div className="w-full text-center">
          <p className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 inline-block">Demo NFT Collection</p>
          <p className="text-white text-4xl mt-20">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          { accounts.length > 0 && <MintButton /> }
        </div>
        <div className="absolute bottom-0 text-center w-full py-10">
          <img alt="GitHub Mark Logo" className="inline" src={gitHubLogo} />
          <a
            className="text-white ml-2 text-xl"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${GITHUB_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;