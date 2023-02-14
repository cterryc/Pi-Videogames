import { JUEGOS_LISTA, GENEROS, PLATFORMS, JUEGOS_SEARCH, SEARCHPAGESTATE, FILTERSEARCHSTATE, JUEGO_DETAILS } from "../actionsTypes/actionsTypes.js";

export function actionVideogamesFromApi(videogamesFromAPi) {
    // if (videogamesFromAPi.length === 0) {
    //     console.log("entro al arrah Vacio")
    //     return {
    //         type: JUEGOS_LISTA,
    //         payload: []
    //     }
    // }
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
            .then(infoApi => infoApi.json())
            .then(games => {
                dispatch({ type: JUEGOS_LISTA, payload: games })
            })
    }
}

export const actionGamesSearch = (name) => {
    if (typeof name !== "string") {
        return {
            type: JUEGOS_SEARCH,
            payload: []
        }
    }
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames?name=${name}`)
            .then(infoApi => infoApi.json())
            .then(games => {
                dispatch({ type: JUEGOS_SEARCH, payload: games })
            })
            .catch(error => console.log(error))
    }
}

export const searchPagseState = (state) => {
    return {
        type: SEARCHPAGESTATE,
        payload: state
    }
}

export const actionFilterState = (filterSearchState) => {
    return {
        type: FILTERSEARCHSTATE,
        payload: filterSearchState
    }
}
export const GenerosGet = () => {

    let generos = [
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

    return {
        type: GENEROS,
        payload: generos
    }
}

export const PlatformsGet = () => {

    let platforms = [
        "PC",
        "iOS",
        "Android",
        "macOS",
        "PlayStation 4",
        "PlayStation 5",
        "XBOX",
        "PS Vita"
    ]

    return {
        type: PLATFORMS,
        payload: platforms
    }
}

export const actionGameDetails = (id) => {

    return function (dispatch) {
        return fetch(`http://localhost:3001/videogame/${id}`)
            .then(infoApi => infoApi.json())
            .then(details => {
                dispatch({
                    type: JUEGO_DETAILS,
                    payload: details
                })
            })
            .catch(error => console.log(error))
    }
}

// export const genres = (state = initialState, action) => {

// }

// export const gameCreation = (state = initialState, action) => {

// }

/* export function games() {
    return async function (dispatch) {
        console.log("entro a la accion")
        const games = await axios.get(`http://localhost:3001/videogames`)
        console.log(games.data)
                return dispatch({ type: JUEGOS_LISTA, payload: games.data })
        
    }
} */