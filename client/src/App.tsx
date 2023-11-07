import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Game from "./pages/game/game";
import Home from "./pages/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/game' element={<Game />} />
          <Route path='/game/:lobby' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
