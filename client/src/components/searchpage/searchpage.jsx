import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGamesSearch } from "../../redux/actions/actions";
import FiltroSearch from "../filtroSearch/filtroSearch.jsx";
import Paginado from "../paginado/paginado.jsx";
import searchPageCss from "./searchpageCss.module.css";

export default function SearchPage() {

    const dispatch = useDispatch()
    const { videogamesFromApi, gamesSearchFromApi } = useSelector(state => state)
    const [localVideogamesFromApi, setLocalVideogamesFromApi] = useState([])
    const [localGamesSearchFromApi, setLocalGamesSearchFromApi] = useState([])
    // se crea para usar como contador de paginas donde cero = pagina 1
    const [currentPage, setCurrentPage] = useState(0);
    const [noSeEncontraronJuegos, setNoSeEncontraronJuegos] = useState(false)

    // useEffect(() => {
    //     dispatch(actionVideogamesFromApi(["necesario para Pedir api cuando se renderice la primera vez"]))
    // }, [])
    // useEffect(() => {
    //     setLocalVideogamesFromApi(videogamesFromApi)
    // }, [videogamesFromApi])
    useEffect(() => {
        setLocalGamesSearchFromApi(gamesSearchFromApi)
        setNoSeEncontraronJuegos(false)
        // if (gamesSearchFromApi.length !== 0) {
        // }
    }, [gamesSearchFromApi])

    function filtrarJuegos(juegosFiltrados) {
        if (gamesSearchFromApi.length > 0) setLocalGamesSearchFromApi(juegosFiltrados)
        else setLocalVideogamesFromApi(juegosFiltrados)
    }

    function buscarJuegos(nombreDelJuego) {
        dispatch(actionGamesSearch(nombreDelJuego))
    }

    let allGamesForCurrentPage;
    let buttons;
    let startIndex;
    let totalPages;
    if (localGamesSearchFromApi.length > 0) {
        totalPages = Math.ceil(localGamesSearchFromApi.length / 15)
        buttons = new Array(totalPages).fill(1);

        // inicio de conteo del indice de allGames en este primer caso seria 0, luego 15, luego 30 => esto indica q inicia desde ese elemento
        startIndex = currentPage * 15;

        // "startIndex" seria el indice de inicio y "startIndex + 15" seria el indice de inicio mas 15 ==> me devuelve ese rango de elementos
        allGamesForCurrentPage = localGamesSearchFromApi.slice(startIndex, startIndex + 15);
    } else {
        totalPages = Math.ceil(localVideogamesFromApi.length / 15)
        buttons = new Array(totalPages).fill(1);

        // inicio de conteo del indice de allGames en este primer caso seria 0, luego 15, luego 30 => esto indica q inicia desde ese elemento
        startIndex = currentPage * 15;

        // "startIndex" seria el indice de inicio y "startIndex + 15" seria el indice de inicio mas 15 ==> me devuelve ese rango de elementos
        allGamesForCurrentPage = localVideogamesFromApi.slice(startIndex, startIndex + 15);
    }

    let estadoQueVaAFiltrar = gamesSearchFromApi.length > 0 ? gamesSearchFromApi : videogamesFromApi;


    function funcionJuegosNoEncontrados() {
        setTimeout(() => {
            setNoSeEncontraronJuegos(true)
        }, 5000);
    }

    if (localGamesSearchFromApi.length < 1) {
        if (!noSeEncontraronJuegos) {
            return (
                <div>
                    <FiltroSearch juegosParaFiltrar={estadoQueVaAFiltrar} filtrarJuegos={filtrarJuegos} buscarJuegos={buscarJuegos} />
                    <div className={searchPageCss.gifImage}>
                        {funcionJuegosNoEncontrados()}
                    </div>
                </div>
            )
        }
        return (
            <div>
                <FiltroSearch juegosParaFiltrar={estadoQueVaAFiltrar} filtrarJuegos={filtrarJuegos} buscarJuegos={buscarJuegos} />
                <div className={searchPageCss.fondoNegro}>
                    <h1>Games Not Found</h1>
                </div>
            </div>
        )
    }

    return (
        <div>
            <FiltroSearch juegosParaFiltrar={estadoQueVaAFiltrar} filtrarJuegos={filtrarJuegos} buscarJuegos={buscarJuegos} />
            {/* con el "onClick" seteamos el estado local para renderizar la paginado, segun el indice del array*/}
            <div className={searchPageCss.buttonContainer}>
                <div></div>
                <div className={searchPageCss.buttonsCentrales}>
                    {currentPage > 0 ? <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button> : <button disabled={true}>Previous</button>}
                    {buttons.map((e, i) => {
                        return (
                            <button onClick={() => setCurrentPage(i)} key={i + e}>{i + e}</button>
                        )
                    })}
                    {/* con el "onClick" seteamos el estado local, segun el numero de la paginado sumamos o restamos 1*/}
                    {currentPage < totalPages - 1 ? <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button> : <button disabled={true}>Next</button>}
                </div>
                <div></div>
            </div>
            <Paginado games={allGamesForCurrentPage} />
        </div>
    )
}
