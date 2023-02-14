import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PaginadoCss from "./paginadoCss.module.css";

const Paginado = ({ games }) => {
    // "games" son los 15 elementos(juegos) enviados desde "allGames"

    const [localState, setLocalState] = useState(false);
    const [localStateCard, setLocalStateCard] = useState(false)

    let index = 1;
    let index2 = 100;
    let index3 = 1000;
    if (typeof games === "string") {
        return (
            <div>No existen coincidencias para filtrar</div>
        )
    }

    const handleMouseEnter = (e, id) => {
        setLocalState(true)
        // setLocalStateCard(e.target.id)
        setLocalStateCard(id)
    }

    const handleMouseLeave = (e, ele) => {
        setLocalState(false)
        // setLocalStateCard(false)
        setLocalStateCard(false)

    }

    const mostrarRatingGenres = (ele) => {
        if (ele.id === localStateCard) {
            return (
                <>
                    {localState ? <p>Rating: {ele.rating}⭐</p> : null}
                    {ele.genres?.map((gen, i) => {
                        index++
                        return (
                            <div key={index}>
                                {localState ? <div>{gen.name}</div> : null}
                            </div>
                        )
                    })}
                </>
            )
        } else {
            <div></div>
        }
    }

    const mostrarImagen = (ele) => {
        if (ele.id === localStateCard) {
            return (
                <>

                </>
            )
        } else {
            return (
                <>
                    <img src={ele.background_image} alt="gameimage" className={PaginadoCss.img} />
                </>
            )
        }
    }

    return (
        <div className={PaginadoCss.garden}>
            {games?.map((ele) => {
                index2 = index2 + 1;
                index3 = index3 + 1
                return (
                    <div key={index2} className={PaginadoCss.divCard}>
                        <div className={PaginadoCss.capaDeFondo}>
                            <div id={index3} onMouseEnter={(e) => handleMouseEnter(e, ele.id)} onMouseLeave={(e) => handleMouseLeave(e, ele.id)} className={`${PaginadoCss.card}`}>
                                <Link to={`/game/${ele.id}`}>
                                    {mostrarImagen(ele)}
                                </Link>
                                <Link to={`/game/${ele.id}`}>
                                    <h2 className={PaginadoCss.nombreDeCard}>⬇️{ele.name}⬇️</h2>
                                </Link>
                                {mostrarRatingGenres(ele)}
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    );
};

export default Paginado;