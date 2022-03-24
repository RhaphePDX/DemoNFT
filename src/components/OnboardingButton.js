import MetaMaskOnboarding from '@metamask/onboarding';
import {useState,useEffect,useRef} from 'react';

export function OnboardingButton({accounts,setAccounts}) {

  const [buttonText, setButtonText] = useState('Click here to install MetaMask!');
  const [isDisabled, setDisabled] = useState(false);
  const onboarding = useRef();
  
  function handleNewAccounts(newAccounts) {
    setAccounts(newAccounts);
  }

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(`✔ ${accounts[0].substring(0,5)}...${accounts[0].slice(-4)}`);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText('Connect');
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      // window.ethereum
      //   .request({ method: 'eth_requestAccounts' })
      //   .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        const newAccounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setAccounts(newAccounts);
      } catch (error) {
        console.log("request a/c error: ", error);
      }
    } else {
      // start
      onboarding.current.startOnboarding();
    }
  };
  
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}