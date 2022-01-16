import { ethers } from "ethers";
import { useState } from "react";
import Staking from "./Staking.json";
import Nft from "./Nft.json";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(0);
  const [connectedAddress, setConnectedAddress] = useState(0);
  const [isadmin, setIsadmin] = useState(false);
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    const staking = new ethers.Contract(Staking.address, Staking.abi, signer);
    const nft = new ethers.Contract(Nft.address, Nft.abi, signer);
    const owner = await staking.owner();
    const balance = await provider.getBalance(addr);
    setBalance(ethers.utils.formatEther(balance.toString()));
    setConnectedAddress(addr);
    if (owner === addr) {
      setIsadmin(true);
    } else {
      setIsadmin(false);
    }
  }

  async function pickWinner() {
    if (typeof window.ethereum !== "undefined") {
      let winnerAddress;
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        Staking.address,
        Staking.abi,
        signer
      );
      try {
        winnerAddress = await contract.pickWinner();
        console.log(winnerAddress);
      } catch (err) {
        console.log("Error: ", err);
      }

      const nft = new ethers.Contract(Nft.address, Nft.abi, signer);
      try {
        await nft.safeMint(winnerAddress);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function bet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        Staking.address,
        Staking.abi,
        signer
      );
      const wei = ethers.utils.parseEther("0.01");
      const override = {
        value: wei,
      };
      try {
        await contract.stake(override);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return (
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <div>
            <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                class="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div class="flex items-center justify-between w-full md:w-auto">
                    <a href="#" class="text-2xl text-indigo-600">
                      NFTBet
                    </a>
                  </div>
                </div>
                <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  <a
                    href="#"
                    class="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {balance}ETH
                  </a>
                  <a
                    href="#"
                    class="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {connectedAddress}
                  </a>
                </div>
              </nav>
            </div>
          </div>
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <br />
              <button
                className="
                bg-violet-500
                rounded-md
                p-2
                inline-flex
                items-center
                justify-center
                text-white
                hover:bg-violet-400
                active:bg-violet-600
                focus:outline-none
                focus:ring
                focus:ring-violet-300
                aria-expanded=false"
                onClick={requestAccount}
              >
                Connect wallet
              </button>
              <br /> <br />
              {isadmin ? (
                <div>
                  <button
                    className="
                      bg-violet-500
                      rounded-md
                      p-2
                      inline-flex
                      items-center
                      justify-center
                      text-white
                      hover:bg-violet-400
                      active:bg-violet-600
                      focus:outline-none
                      focus:ring
                      focus:ring-violet-300
                      aria-expanded=false"
                    onClick={pickWinner}
                  >
                    Pick Winner
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="
                      bg-violet-500
                      rounded-md
                      p-2
                      inline-flex
                      items-center
                      justify-center
                      text-white
                      hover:bg-violet-400
                      active:bg-violet-600
                      focus:outline-none
                      focus:ring
                      focus:ring-violet-300
                      aria-expanded=false"
                    onClick={bet}
                  >
                    Bet
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
