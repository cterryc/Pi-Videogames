import React from "react";
import Lich from "./video/Remasterización de la cinemática de Wrath of the Lich King _ World of Warcraft.mp4";
import landing from "./landingCss/landing.module.css";
import { connect } from "react-redux";
import { actionVideogamesFromApi } from "../../redux/actions/actions.js";

let videoCss = {
    position: "absolute",
    width: "100%",
    left: "50%",
    top: "50%",
    height: "100%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: "-1",
    volume: "25%"
}

class Landingpage extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    onClick = () => {
        this.props.history.push("/videogames")
    }

    componentDidMount() {
        //! si activamos lo comentado abajo, el landing page tmb hara el get a la api al ser montado
        // if (this.props.allgames <= 0) {
        //     this.props.actionVideogamesFromApi()
        // }
    }

    render() {
        return (
            <div>
                <video src={Lich} autoPlay muted loop style={videoCss} />
                <button onClick={(e) => this.onClick(e)} className={landing.boton}><span>INGRESAR</span></button>
            </div>
        )
    }
}

function stateToProps(state) {
    return {
        videogamesFromApi: state.videogamesFromApi
    }
}

export default connect(stateToProps, { actionVideogamesFromApi })(Landingpage);