import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;

/* Components:
    App
    |_Header
    |_MainContainer
        |_SearchBar
        |_StockContainer
        |   |_Stock
        |_Portfolio Container
            |_Stock
*/
