import React from "react";
import { NavLink } from "react-router-dom";
import navbarcss from "./navbar.module.css";

function NavBar() {




    return (
        <div className={navbarcss.todosLosBotones}>
            <div></div>
            <div className={navbarcss.botonesDelMedio}>
                <NavLink to="/" ><button className={navbarcss.botonesIndividuales}>Intro</button></NavLink>
                <NavLink activeClassName={navbarcss.active} to="/videogames" ><button onClick={(e) => e} className={navbarcss.botonesIndividuales}>Videogames</button></NavLink>
                <NavLink activeClassName={navbarcss.active} to="/createVideogame" ><button className={navbarcss.botonesIndividuales}>Create Game</button></NavLink>
            </div>
            <div></div>
        </div>
    )

}

export default NavBar;