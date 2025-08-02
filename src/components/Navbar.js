
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import fullLogo from '../logo.png';

function Navbar() {
  
  const [connected, toggleConnect] = useState(false);
  const [currAddress, updateAddress] = useState("0x");
  const [searchQuery, setSearchQuery] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate(); 
  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const btn = document.querySelector(".enableEthereumButton");
    btn.textContent = "Connected";
    btn.classList.remove("bg-blue-500", "hover:bg-blue-700");
    btn.classList.add("bg-green-500", "hover:bg-green-600");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      updateButton();
      getAddress();
      toggleConnect(true);
      window.location.reload();
    });
  }

  useEffect(() => {
    if (!window.ethereum) return;
    if (window.ethereum.isConnected()) {
      getAddress();
      toggleConnect(true);
      updateButton();
    }

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  }, []);

  const isActive = (path) => location.pathname === path;

  const paths = ["/", "/marketPlace", "/sellNFT", "/earn","/graph","#footer", "/profile","/connect"];
  const names = ["Home", "Market", "Create", "Earn","Spot","Contact", "Profile","Connect"];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/marketPlace?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
  };

  return (
    <div className="bg-[#0a0a23] text-white w-full shadow-md">
      <nav className="flex items-center justify-between px-6 md:px-8 py-4 flex-wrap gap-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={fullLogo} alt="Logo" className="w-15 h-10" />
          <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            NFTs MarketPlace
          </span>
        </Link>

        <ul className="flex space-x-6 text-md font-medium items-center">
          {paths.map((path, idx) => {
            const name = names[idx];

            if (path === "#footer") {
              return (
                <li key={path}>
                  <button
                    onClick={() => {
                      const footer = document.getElementById("footer");
                      if (footer) {
                        footer.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="transition-all hover:text-pink-400"
                  >
                    {name}
                  </button>
                </li>
              );
            }

            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`transition-all ${
                    isActive(path)
                      ? "text-pink-500 border-b-2 border-pink-500"
                      : "hover:text-pink-400"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search NFTs..."
            className="px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg text-white font-medium transition-all"
          >
            Search
          </button>
        </form> */}

        <button
          className="enableEthereumButton border border-purple-500 hover:border-pink-500 text-white font-medium py-2 px-4 rounded-full transition-all"
          onClick={connectWebsite}
        >
          {connected ? "Connected" : "Connect Wallet"}
        </button>
      </nav>

      <div className="text-right text-xs text-gray-400 px-8 pb-2">
        {currAddress !== "0x"
          ? `Connected to ${currAddress.substring(0, 15)}...`
          : "Not Connected. Please login to view NFTs"}
      </div>
    </div>
  );
}

export default Navbar;
