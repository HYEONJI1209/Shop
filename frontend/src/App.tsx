import React, { useState } from 'react';
import './style/index.scss';
import { Header, MainRoute, SearchModal } from "./components/index";

function App() {
  const [searchClick, setSearchClick] = useState(false);
  const [mypageClick, setMypageClick] = useState(false);
  
  return (
    <div className={`App ${searchClick ? 'overlay' : ''}`}>
      <Header
        setSearchClick={setSearchClick}
        setMypageClick={setMypageClick}
      />
      <MainRoute />

      {searchClick? <SearchModal searchClick={searchClick} setSearchClick={setSearchClick} /> : <></>}
    </div>
  );
}

export default App;
