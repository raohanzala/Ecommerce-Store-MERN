import React, { useContext, useEffect } from "react";
import RecentOrderSection from "../components/RecentOrderSection";
import { ShopContext } from "../contexts/ShopContext";
// import ChartLine from "../components/ChartLine";
// import ChartBar from "../components/ChartBar";
// import RecentPosts from "../components/RecentPostsSection";
// import TopSellerSection from "../components/TopSellerSection";

function Dashboard() {
  console.log("sddsdsdsds");

    const {setPageTitle} = useContext(ShopContext)

    useEffect(()=> {
      setPageTitle('Dashboard')
    }, [])

  return (
    <div>
      <h2 className="text-2xl mb-8">Rao Hanzala</h2>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1.5fr_2fr] mb-10">
        <div className="bg-white rounded-xl py-5 min-h-[380px] shadow-sm w-full h-full">
          {/* <ChartLine /> */}
        </div>
        <div className="bg-white rounded-xl shadow-sm min-h-[380px] w-full h-full">
          {/* <ChartBar /> */}
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 gap-y-8 lg:grid-cols-[2fr_1.5fr]">
        <RecentOrderSection/>
        {/* <TopSellerSection /> */}
      </div>
    </div>
  );
}

export default Dashboard;
