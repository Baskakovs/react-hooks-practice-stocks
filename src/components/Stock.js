import React,{useState} from "react";

function Stock({stock, onAction}) {
  const {name, price, id, bought} = stock


  return (
    <div value={bought} onClick={onAction}>
      <div className="card" >
        <div className="card-body" id={id}>
          <h5 className="card-title" id={id}>{name}</h5>
          <p className="card-text" id={id}>{price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
