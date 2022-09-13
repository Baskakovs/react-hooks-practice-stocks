import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer({onBuy}) {

  const [list, setList] = useState([])
  const [stocks, setStocks] = useState([])
  const [isAlpha, setIsAlpha] = useState(false)
  const [isPrice, setIsPrice] = useState(false)
  const [portfolio, setPortfolio] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:3001/stocks`)
    .then(res=>res.json())
    .then(obj=>{
      setList(obj)
    })
  },[])

  useEffect(()=>{
    setStocks(list)
  },[list])


function handleBuy(event){
  fetch(`http://localhost:3001/stocks/${event.target.id}`,{
    method: "PATCH",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      bought: true
    })
  })
  .then(res=>res.json())
  .then((obj)=>{
    setPortfolio([...portfolio, obj])
    let newList = stocks.filter((stock)=>{
      if(obj.id !== stock.id) return stock
    })
    setStocks(newList)
  })

}


function handleSell(event){
  fetch(`http://localhost:3001/stocks/${event.target.id}`,{
    method: "PATCH",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      bought: false
    })
  })
  .then(res=>res.json())
  .then((obj)=>{
    setStocks([...stocks, obj])
    let newList = portfolio.filter((stock)=>{
      if(obj.id !== stock.id) return stock
    })
    setPortfolio(newList)
  })
}

function handleFilter(event){
  fetch(`http://localhost:3001/stocks`)
  .then(res=>res.json())
  .then(obj=>{
    let newList = obj.filter((stock)=>{
      if(stock.type == event.target.value){
        return stock
      }
    })
    setStocks(newList)
  })
  
}


function handleChecked(event){
  const ev = event.target.value
  if(ev === "Alphabetically"){
    if(isAlpha == true){
      setIsPrice(()=> false)
      setIsAlpha(()=>true)
    }else{
      setIsAlpha(()=>true)
    }
  } else if(ev === "Price"){
    if(isAlpha == true){
      setIsAlpha(()=> false)
      setIsPrice(()=>true)
    }else{
      setIsPrice(()=>true)
    }
    
  }
}


  return (
    <div>
      <SearchBar onFilter={handleFilter} onChecked={handleChecked}/>
      <div className="row">
        <div className="col-8">
          <StockContainer data={(isAlpha ? stocks.sort( (a,b) => a.name < b.name ? -1 : 1) : (isPrice ? stocks.sort( (a,b) => a.price < b.price ? -1 : 1): stocks))} onBuy={handleBuy}/>
        </div>
        <div className="col-4">
     {     <PortfolioContainer data={portfolio} onSell={handleSell}/> }
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

// function handleChecked(event){
//   console.log(event.target.value)
//   if(event.target.value === "Alphabetically"){
//   const sorted = list.sort(function(a, b) {
//     let nameA = a.name
//     let nameB = b.name
//     if (nameA < nameB) {
//       return -1; 
//     }
//     if (nameA > nameB) {
//       return 1; 
//     }
//     return 0; 
//   });
//   setStocks(sorted)
//   }else {
//     const sorty = list.sort(function(a, b) {
//       let nameA = a.price
//       let nameB = b.price
//       if (nameA < nameB) {
//         return -1; 
//       }
//       if (nameA > nameB) {
//         return 1; 
//       }
//       return 0; 
//     });

//     setStocks(sorty)
//   }
// }