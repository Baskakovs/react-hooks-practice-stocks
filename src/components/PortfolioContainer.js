import React from "react";
import Stock from "./Stock";

function PortfolioContainer({data, onSell}) {

  return (
    <div>
      <h2>My Portfolio</h2>
      {
        data.map((stock)=>{
          return <Stock stock={stock} onAction={onSell}/>
        })
      }
    </div>
  );
}

export default PortfolioContainer;
