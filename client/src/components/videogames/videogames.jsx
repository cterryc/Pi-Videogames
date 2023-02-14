import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGamesSearch, actionVideogamesFromApi } from "../../redux/actions/actions";
import FiltroSearch from "../filtroSearch/filtroSearch";
import Paginado from "../paginado/paginado";
import videogamesCss from "./videogamesCss.module.css"

export default function Videogames() {

    const dispatch = useDispatch()
    const { videogamesFromApi } = useSelector(state => state)
    const [localVideogamesFromApi, setLocalVideogamesFromApi] = useState([])
    // se crea para usar como contador de paginas donde cero = pagina 1
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(actionVideogamesFromApi())
        console.log("cuantos get hace Linea 18")
    }, [])
    useEffect(() => {
        console.log("cuantos get hace Linea 21")
        setLocalVideogamesFromApi(videogamesFromApi)
    }, [videogamesFromApi])


    function filtrarJuegos(juegosFiltrados) {
        setLocalVideogamesFromApi(juegosFiltrados)
    }

    function buscarJuegos(nombreDelJuego) {
        dispatch(actionGamesSearch(nombreDelJuego))
    }

    let allGamesForCurrentPage;
    let buttons;
    let startIndex;
    let totalPages;

    totalPages = Math.ceil(localVideogamesFromApi.length / 15)
    buttons = new Array(totalPages).fill(1);

    // inicio de conteo del indice de allGames en este primer caso seria 0, luego 15, luego 30 => esto indica q inicia desde ese elemento
    startIndex = currentPage * 15;

    // "startIndex" seria el indice de inicio y "startIndex + 15" seria el indice de inicio mas 15 ==> me devuelve ese rango de elementos
    allGamesForCurrentPage = localVideogamesFromApi.slice(startIndex, startIndex + 15);
    // }

    let estadoQueVaAFiltrar = videogamesFromApi;


    if (localVideogamesFromApi.length < 1) {
        return (
            <div>
                <FiltroSearch juegosParaFiltrar={estadoQueVaAFiltrar} filtrarJuegos={filtrarJuegos} buscarJuegos={buscarJuegos} />
                <div className={videogamesCss.gifImage}></div>
            </div>
        )
    }

    const onCLickState = (e, i) => {
        setCurrentPage(i)
    }

    return (
        <div>
            <FiltroSearch juegosParaFiltrar={estadoQueVaAFiltrar} filtrarJuegos={filtrarJuegos} buscarJuegos={buscarJuegos} />
            {/* con el "onClick" seteamos el estado local para renderizar la paginado, segun el indice del array*/}
            <div className={videogamesCss.buttonContainer}>
                <div></div>
                <div className={videogamesCss.buttonsCentrales}>
                    {currentPage > 0 ? <button className={videogamesCss.previusNext} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button> : <button className={videogamesCss.desactivado} disabled={true}>Previous</button>}
                    {buttons.map((e, i) => {
                        return (
                            <button id={i} className={i === currentPage ? videogamesCss.active : videogamesCss.individualButton} onClick={(e) => onCLickState(e, i)} key={i + e}>{i + e}</button>
                        )
                    })}
                    {/* con el "onClick" seteamos el estado local, segun el numero de la paginado sumamos o restamos 1*/}
                    {currentPage < totalPages - 1 ? <button className={videogamesCss.previusNext} onClick={() => setCurrentPage(currentPage + 1)}>Next</button> : <button className={videogamesCss.desactivado} disabled={true}>Next</button>}
                </div>
                <div></div>
            </div>
            <Paginado games={allGamesForCurrentPage} />
            <div className={videogamesCss.buttonContainer}>
                <div></div>
                <div className={videogamesCss.buttonsCentrales}>
                    {currentPage > 0 ? <button className={videogamesCss.previusNext} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button> : <button className={videogamesCss.desactivado} disabled={true}>Previous</button>}
                    {buttons.map((e, i) => {
                        return (
                            <button id={i} className={i === currentPage ? videogamesCss.active : videogamesCss.individualButton} onClick={(e) => onCLickState(e, i)} key={i + e}>{i + e}</button>
                        )
                    })}
                    {/* con el "onClick" seteamos el estado local, segun el numero de la paginado sumamos o restamos 1*/}
                    {currentPage < totalPages - 1 ? <button className={videogamesCss.previusNext} onClick={() => setCurrentPage(currentPage + 1)}>Next</button> : <button className={videogamesCss.desactivado} disabled={true}>Next</button>}
                </div>
                <div></div>
            </div>
        </div>
    )
}
