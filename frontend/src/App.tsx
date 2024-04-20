import React, { useState } from 'react';
import './style/index.scss';
<<<<<<< HEAD
import { Header, MainRoute, SearchModal } from "./components/index";
=======
import { MainRoute } from "./components/index";
>>>>>>> 6a54f524831f9b4c1275c1134efe2649e46dcbe9

function App() {
  const [searchClick, setSearchClick] = useState(false);
  const [mypageClick, setMypageClick] = useState(false);
  
  return (
<<<<<<< HEAD
    <div className={`App ${searchClick ? 'overlay' : ''}`}>
      <Header
        setSearchClick={setSearchClick}
        setMypageClick={setMypageClick}
      />
      <MainRoute />

      {searchClick? <SearchModal searchClick={searchClick} setSearchClick={setSearchClick} /> : <></>}
=======
    <div className="App">
      <MainRoute />
>>>>>>> 6a54f524831f9b4c1275c1134efe2649e46dcbe9
    </div>
  );
}

export default App;
