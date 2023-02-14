import { JUEGOS_LISTA, GENEROS, PLATFORMS, JUEGOS_SEARCH, SEARCHPAGESTATE, FILTERSEARCHSTATE, JUEGO_DETAILS } from "../actionsTypes/actionsTypes.js";

const initialState = {
    videogamesFromApi: [],
    generos: [],
    platforms: [],
    gamesSearchFromApi: [],
    searchpagestate: <h2>Loading...</h2>,
    filterState:[],
    gameDetails: {}
}

const gamesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case JUEGOS_LISTA:
            return {
                ...state,
                videogamesFromApi: actions.payload
            }
        case GENEROS:
            return {
                ...state,
                generos: actions.payload
            };
        case PLATFORMS:
            return {
                ...state,
                platforms: [...state.platforms, ...actions.payload]
            }
        case JUEGOS_SEARCH:
            return {
                ...state,
                gamesSearchFromApi: actions.payload
            }
        case SEARCHPAGESTATE:
            return {
                ...state,
                searchpagestate: actions.payload
            }
        case FILTERSEARCHSTATE:
            return {
                ...state,
                filterState: actions.payload
            }
        case JUEGO_DETAILS:
            return {
                ...state,
                gameDetails: actions.payload
            }
        // case JUEGO_DETAILS:
        //     return {
        //         ...state,
        //         details: action.payload
        //     }
        // case JUEGOS_FAVORITOS:
        //     return {
        //         ...state,
        //         favoritesGames: [...state.favoritesGames, ...action.payload]
        //     }
        // case JUEGO_CREATION:
        //     return {
        //         ...state,
        //         post: [...state.games, ...action.payload]
        //     }

        default:
            return state
    }
}

export default gamesReducer;


