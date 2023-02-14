// import { useDispatch } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { actionGamesSearch } from "../../redux/actions/actions";
import filtroSearchCss from "./filtroSearchCss.module.css";

export default function FiltroSearch({ juegosParaFiltrar, filtrarJuegos, buscarJuegos }) {
    let generos = [
        "Select...",
        "Action",
        "Indie",
        "Adventure",
        "RPG",
        "Strategy",
        "Shooter",
        "Casual",
        "Simulation",
        "Puzzle",
        "Arcade",
        "Platformer",
        "Racing",
        "Massively-Multiplayer",
        "Sports",
        "Fighting",
        "Family",
        "Board Games",
        "Educational",
        "Card"
    ]

    const labels = ["Genres", "Db or APi", "Rating or A-Z"];
    const dbApi = ["Select...", "Data Base", "APi"];
    const rating = ["Select...", "1 to 5", "5 to 1", "A to Z", "Z to A"];
    let arraysTotal = [generos, dbApi, rating];

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("");//qwe
    const history = useHistory();
    const [selectState, setSelectState] = useState({
        "Genres": "Select...",
        "Db or APi": "Select...",
        "Rating or A-Z": "Select...",
    })


    function onChange(e) {
        setSelectState({
            ...selectState,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault()

        let gamesAreFiltered = []
        if (selectState.Genres && selectState.Genres !== "Select...") {
            let filterByGenres = juegosParaFiltrar.filter(ele => {
                // "some()" => comprueba si al menos un elemento del array cumple con la condición
                return ele.genres.some(valueObj => {
                    return (
                        //! valueObj.value.startsWith(filterConditions.startsWith) ||
                        //? valueObj.value.endsWith(filterConditions.endsWith) ||
                        valueObj.name.includes(selectState.Genres)
                    );
                });
            });
            if (filterByGenres.length === 0) {
                let vacioTermporal = []
                gamesAreFiltered = "Genres"
                // if (location.pathname === "/videogames") {
                setTimeout(() => {
                    filtrarJuegos(gamesAreFiltered)
                }, 1000);
                return filtrarJuegos(vacioTermporal)
            }
            gamesAreFiltered = filterByGenres;
        }
        if (selectState["Db or APi"] === "Data Base") {
            if (gamesAreFiltered.length === 0) gamesAreFiltered = juegosParaFiltrar
            let filterByDbApi = gamesAreFiltered?.filter(ele => {
                return ele.id.toString().length > 10
            })
            gamesAreFiltered = filterByDbApi;
            if (gamesAreFiltered.length === 0) gamesAreFiltered = "Data Base";
        }
        if (selectState["Db or APi"] === "APi") {
            if (gamesAreFiltered.length === 0) gamesAreFiltered = juegosParaFiltrar
            let filterByDbApi = gamesAreFiltered.filter(ele => {
                return ele.id.toString().length < 10
            })
            gamesAreFiltered = filterByDbApi;
            if (gamesAreFiltered.length === 0) gamesAreFiltered = "APi";
        }

        if (selectState["Rating or A-Z"] === "A to Z") {
            if (selectState.Genres === "Select..." && selectState["Db or APi"] === "Select...") gamesAreFiltered = juegosParaFiltrar
            if (typeof gamesAreFiltered !== "string") {
                gamesAreFiltered.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
            }
        }
        if (selectState["Rating or A-Z"] === "Z to A") {
            if (selectState.Genres === "Select..." && selectState["Db or APi"] === "Select...") gamesAreFiltered = juegosParaFiltrar
            if (typeof gamesAreFiltered !== "string") {
                gamesAreFiltered.sort(function (a, b) {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
                });
            }
        }
        if (selectState["Rating or A-Z"] === "1 to 5") {
            if (selectState.Genres === "Select..." && selectState["Db or APi"] === "Select...") gamesAreFiltered = juegosParaFiltrar
            if (typeof gamesAreFiltered !== "string") {
                gamesAreFiltered.sort(function (a, b) {
                    return a.rating - b.rating;
                });
            }
        }
        if (selectState["Rating or A-Z"] === "5 to 1") {
            if (typeof gamesAreFiltered !== "string") {
                if (selectState.Genres === "Select..." && selectState["Db or APi"] === "Select...") gamesAreFiltered = juegosParaFiltrar
                gamesAreFiltered.sort(function (a, b) {
                    return b.rating - a.rating;
                });
            }
        }
        if (selectState.Genres === "Select..." && selectState["Db or APi"] === "Select..." && selectState["Rating or A-Z"] === "Select...") {
            let vacioTermporal = []
            // if (location.pathname === "/videogames") {
            filtrarJuegos(vacioTermporal)
            console.log(vacioTermporal)
            setTimeout(() => {
                console.log("esto es lo q esta apunto de ser enviado desde Filter => ", juegosParaFiltrar)
                filtrarJuegos(juegosParaFiltrar)
            }, 1000);
            return;
        }
        let vacioTermporal = []
        // if (location.pathname === "/videogames") {
        filtrarJuegos(vacioTermporal)
        setTimeout(() => {
            filtrarJuegos(gamesAreFiltered)
        }, 1000);
        // }
    }
    //creamos estas variables para asignarlas como Key
    let index = 1;
    let index2 = 100;

    function onChangeSearch(e) {
        setInputSearch(e.target.value)
    }
    const location = useLocation()
    // console.log("esto es location => ",location.pathname);


    function onSubmitSearch(e) {
        if (location.pathname === "/videogames") history.push("/searchpage")
        e.preventDefault();
        if (inputSearch.length < 1) return setInputSearch("");
        // buscarJuegos(inputSearch)
        setInputSearch("");

        // esto es, para poder setear el estado "searchGames" de manera instantanea en un array vacio
        let inputTemporal = "";

        // si el input contiene informacio(nombre) se redigira hacia la pagina
        // if (inputSearch.length > 0) {
        //     history.push("/searchpage")

        //en el caso de q no haya nada en el input este interrumpira cualquier accion
        // } else if (inputSearch.length < 1) return

        // despues de q la pagina sea redirigida, se hara un dispatch para q la pagina searchPage al ser renderizada muestre el loading
        // dispatch(actionGamesSearch(inputTemporal))

        //esto seteara el estado global "searchpagestate"
        dispatch(actionGamesSearch(<h2>Loading...</h2>))

        // para poder realizar dos dispatch, se recomienda usar set time out para un dispatch  mas limpio
        setTimeout(() => {
            dispatch(actionGamesSearch(inputSearch))
        }, 1000)
        setInputSearch(inputTemporal);
    }



    return (
        <div className={filtroSearchCss.todosImputsYButtons}>
            <div >
                <form onSubmit={onSubmitSearch} className={filtroSearchCss.barraSearch}>
                    <input className={filtroSearchCss.inputSearch} type="text" placeholder="Search..." onChange={onChangeSearch} value={inputSearch} />
                    <input className={filtroSearchCss.paraEsquinas} type="submit" name="Value" value={"  Send "} />
                </form>
            </div>

            {/* formulario CheckBox */}
            <form onSubmit={onSubmit} onChange={onChange} className={filtroSearchCss.todosSelectores}>
                {/* preguntando si existen generos y mapeando la variable "labels" q contiene el titulo de cada selector */}
                {generos.length > 0 ? labels.map((e, i) => {
                    index++/* le subis el valor a "index" por cada iteracion */
                    return (
                        <div key={index} className={filtroSearchCss.selector}>
                            <label >{e}</label>
                            <select name={e} id={e}>
                                {arraysTotal[i].map((x, y) => {
                                    index2++/* le subis el valor a "index2" por cada iteracion */
                                    return (
                                        <option key={index2}>{x}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    )
                }) : null}
                <input type="submit" value="Filter" className={filtroSearchCss.buttonFilter} />
            </form>

        </div>
    )
}