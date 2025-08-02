// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import SellNFT from './components/SellNFT';
// import Marketplace from './components/Marketplace';
// import Profile from './components/Profile';
// import NFTPage from './components/NFTpage';
// import Home from './components/Home';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/marketPlace" element={<Marketplace />}/>
//         <Route path="/" element={<Home />}/>

//         <Route path="/sellNFT" element={<SellNFT />}/> 
//         <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
//         <Route path="/profile" element={<Profile />}/> 
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();





import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';
import Home from './components/Home';
import Footer from './components/Footer';
import Connect from './components/ConnectWallet';
import Features from './components/MarketplaceFeatures';
import BlogCarousel from './components/BlogCarousel';
import ReadMoreBlog from './components/ReadMoreBlog';
import Resell from './components/ResellNFT';
import Earn from './components/earn';
import Game from './components/game';
import Graph from './components/graph';
import WithdrawSection from './components/withdraw';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <>
      <main className="flex-grow">

        <Routes>

          <Route path="/marketPlace" element={<Marketplace />} />
          <Route path="/" element={<Home />} />
          <Route path="/sellNFT" element={<SellNFT />} />
          <Route path="/nftPage/:tokenId" element={<NFTPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/features" element={<Features />} />
          <Route path="/blogs" element={<BlogCarousel />} />
        <Route path="/blog/:id" element={<ReadMoreBlog />} />
        <Route path="/resell" element={<Resell />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/game" element={<Game />} />
        <Route path="/withdraw" element={<WithdrawSection />} />




        





        </Routes>
        </main>
        <Footer />


        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
