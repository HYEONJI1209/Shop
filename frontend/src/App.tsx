import React, { useState } from 'react';
import './style/index.scss';
import { Header, MainRoute, SearchModal, Footer } from "./components/index";

function App() {
  const [searchClick, setSearchClick] = useState(false);
  const [mypageClick, setMypageClick] = useState(false);
  const [HeaderOptionClick, setHeaderOptionClick] = useState("")

  return (
    <div className={`App ${searchClick ? 'overlay' : ''}`}>
      <Header
        setSearchClick={setSearchClick}
        setMypageClick={setMypageClick}
        setHeaderOptionClick={setHeaderOptionClick}
      />
      <MainRoute
      HeaderOptionClick={HeaderOptionClick}
      setHeaderOptionClick={setHeaderOptionClick}
      />
      <Footer />

      {searchClick ? <SearchModal searchClick={searchClick} setSearchClick={setSearchClick} /> : <></>}
    </div>
  );
}

export default App;
