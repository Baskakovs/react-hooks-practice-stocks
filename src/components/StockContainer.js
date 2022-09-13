import React from "react";
import Stock from "./Stock";

function StockContainer({data, onBuy}) {
  return (
    <div>
      <h2>Stocks</h2>
      {data.map((stock)=>{
        return <Stock key={stock.id} stock={stock} onAction={onBuy}/>
      })}
    </div>
  );
}

export default StockContainer;
