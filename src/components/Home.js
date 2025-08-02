import React from 'react';
import Banner from './banner';
import Navbar from './Navbar';
import LiveAuction from './LiveAuction';
import TopSeller from './TopSeller';
import CreateAndSellSection from './CreateAndSellSection';
import Footer from './Footer';
import Trending from './Trending';
import NewsLetter from './Newsletter';
import MarketplaceFeatures from './MarketplaceFeatures';
import CategorySection from "./CategorySection";
import About from './About';
import Blogs from './BlogCarousel'
import { Contact } from './contact';




function Home() {
  return (
    <>
    <Navbar />
      <Banner />
      <LiveAuction />
      <CategorySection />

      <TopSeller />
      
      <Trending />

      <CreateAndSellSection />
      <MarketplaceFeatures />
      <Blogs />
<Contact />
      <About />
      <NewsLetter />




    </>
  );
}

export default Home;
