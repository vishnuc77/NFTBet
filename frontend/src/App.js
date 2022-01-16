import { ethers } from "ethers";
import { useState } from "react";
import "./App.css";

function App() {
  //const [balance, setBalance] = useState(0);
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function store() {}

  return (
    <div className="App">
      <header className="App-header">
        <br />
        <button className="button" onClick={store}>
          Store
        </button>
        <br />
        <br />
      </header>
    </div>
  );
}

export default App;
