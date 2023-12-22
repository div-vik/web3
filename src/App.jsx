import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [connect, setConnect] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        accountChanged([res[0]]);
      });
    } else {
      setErrorMessage("Install MetaMask!");
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance));
      });
  };

  const style = {
    backgroundImage:
      "url(" +
      "https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D" +
      ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flex items-center justify-center h-screen" style={style}>
      <div className="w-[80%] md:w-[60%] 2xl:w-[35%] 2xl:h-[50%] flex flex-col items-center justify-center backdrop-blur-md px-5 py-8 rounded-2xl">
        <div className="mb-10 w-[50%] md:w-[40%] 2xl:w-[30%]">
          <img
            className="rounded-full object-cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
            alt="nft"
          />
        </div>

        <div className="text-white w-full flex items-center justify-center mb-5">
          {defaultAccount !== null ? (
            <div className="flex-col">
              <div className="flex text-xs md:text-base 2xl:text-xl mb-1">
                <p className="mr-2">Address: </p>
                <p>{defaultAccount}</p>
              </div>

              <div className="flex text-xs md:text-base 2xl:text-xl">
                <p className="mr-2">Balance: </p>
                <p>ETH {userBalance}</p>
              </div>

              <button
                onClick={() => setDefaultAccount(null)}
                className="bg-black px-4 py-2 rounded-lg mt-5"
              >
                Disconnect Connect Wallet
              </button>

              <div>{errorMessage !== null && { errorMessage }}</div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-black px-4 py-2 rounded-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
