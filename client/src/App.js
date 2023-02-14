import React from "react";
import { Route } from "react-router-dom";
import CreateVideogame from "./components/createGame/createGame.jsx";
import GameDetails from "./components/details/details.jsx";
import Landing from "./components/landing/landing.jsx";
import NavBar from "./components/navbar/navbar.jsx";
import SearchPage from "./components/searchpage/searchpage.jsx";
import Videogames from "./components/videogames/videogames.jsx";

function App() {

  return (
    <div className="App">

      <Route exact strict path={"/"} component={Landing} />
      <Route path={"/:videogames"} render={() => <NavBar />} />
      <Route exact path={"/videogames"} render={() => <Videogames />} />
      <Route exact path={"/searchpage"} component={SearchPage} />
      <Route path={"/createVideogame"} component={CreateVideogame} />
      <Route exact path={"/game/:details"} component={GameDetails} />
    </div>
  );
}

export default App;