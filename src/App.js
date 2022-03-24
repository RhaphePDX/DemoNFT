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
    <div className="App">
      <header>
        <OnboardingButton accounts={accounts} setAccounts={setAccounts} />
      </header>
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Demo NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          { accounts.length > 0 && <MintButton /> }
        </div>
        <div className="footer-container">
          <img alt="GitHub Mark Logo" className="github-logo" src={gitHubLogo} />
          <a
            className="footer-text"
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