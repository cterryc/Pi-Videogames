require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../db');
const axios = require("axios")

//!  ------> POST /videogames <-------

router.post('/', async (req, res) => {
    let { name, description, released, rating, genres, platforms, background_image } = req.body;
    platforms = platforms.toString()
    // genres es un "String", conviertiendo en Array
    if (typeof genres === "string") {
        genres = genres.split(', ')
    }
    try {
        //insertando datos en la tabla "Videgame"
        let gameCreated = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            background_image
        })

        // esto me trae los generos que la variable "genres" provenientes del body, usara al momento de agregar las propiedades a mi tabla "VideogamesGenero", para mayor info hacer un "console.log"
        let genreDb = await Genero.findAll({ where: { name: genres } });
        console.log("Esto es genredb => ", genreDb)

        // agrengando los generos a la relacion videogamegeneros
        await gameCreated.addGenero(genreDb);
        res.status(200).json('Created succesfully')
    } catch (err) {
        res.status(400).send("Create Game FAIL")
    }
})

//!  ------> GET /videogames Lista de todos los Videojuegos<-------

router.get("/", async (req, res) => {


    // buscar a la API los generos => el cual me dara un "OBJETO" con una propiedad "results"
    // "results" => me dara un ARRAY de objetos, cada objeto es un genero q contiene juegos.
    const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)

    // recibo un objeto que contiene la propiedad results, el cual me dara un ARRAY de objetos, 
    // cada objeto es un genero q contiene juegos.
    const genres = response.data.results;

    // Insertando todos los "nombres de cada generos" en la tabla "Genero".
    await genres.forEach(g => {
        Genero.create({
            name: g.name
        })
            .then(genres => {
                //con esto podria capturar el resultado de la creacion o solo mandar un console.log en pantalla
                console.log('Genres created Succesfull')
            })
            .catch(error => {
                //si hay un error al crear un elemento en la tabla, con esto atrapo el error y asi el server no se cae
                if (error.name === 'SequelizeUniqueConstraintError') {//! para capturar el error igualar siempre con "SequelizeUniqueConstraintError"

                } else {
                    // con esto atrapo un error q no sea por duplicado
                    console.error('Error creando Genero:', error);
                }
            });
    })

    // extrayendo nombre Query
    const nameQuery = req.query.name;

    // Obteniendo los juegos creados desde mi servidor local => esto sera un array
    const responseDb = await Videogame.findAll({ include: Genero })




    //!  ------> GET /videogames Query<-------
    if (nameQuery) {
        try {

            let cambiandoGeneroAgenres = responseDb.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                    genres: game.Generos,
                    background_image: game.background_image
                }
            })

            // Obteniendo todos los juegos de la API GAME
            const getApi = await axios(`https://api.rawg.io/api/games?search=${nameQuery}&key=${API_KEY}`)

            // filtrando toda la info para q solo me devuelva un array de juegos, con las propeidades que necesito
            const responseApi = getApi.data.results.map(ele => {
                return {
                    id: ele.id,
                    name: ele.name,
                    background_image: ele.background_image,
                    released: ele.released,
                    rating: ele.rating,
                    genres: ele.genres,
                    platforms: ele.platforms
                }
            })

            // Concatenando ambos array responseApi y responseDb
            // const responseTotal = responseApi.concat(responseDb)
            const responseTotal = [...cambiandoGeneroAgenres, ...responseApi]

            let arrayNames = [];
            // let i = 0;
            for (game of responseTotal) {
                if (arrayNames.length >= 15) {
                    break
                }
                if (game.name.toLowerCase().includes(nameQuery.toLocaleLowerCase())) {
                    arrayNames.push(game);
                }
            }
            console.log("La cantidad de elementos Encontrados: ", arrayNames.length)

            //verificando si arrayNames es menor para responder
            if (arrayNames.length >= 1) {
                res.status(200).json(arrayNames)
            }
            else {
                res.status(400).send({error:"Game Not Fund"})
            }
        } catch (error) {
            res.status(400).send({error:"Server Error, API no responde"})
        }

    } else {

        //!  ------> GET /videogames <-------
        try {

            let cambiandoGeneroAgenres = responseDb.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                    genres: game.Generos,
                    background_image: game.background_image
                }
            })

            // creando un array con todos los Links de la API q voy a solicitar, para poder tener los 100 juegos
            let arrayGetApi = [
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
                axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
            ]
            // aqui voy a introducir todos los juegos obtenidos de la API
            let getTotalApi = []

            // Recorriendo "arrayGetApi", y capturando cada uno uno de los EndPoints
            await Promise.all(arrayGetApi)
                .then(e => {
                    //! capturando los elementos de cada EndPoint y concatenando con "getTotalApi"
                    e.forEach(e => {
                        //"e.data.results" es un array donde cada elemento es un objeto y cada objeto contiene un juego, estoy capturando todos los elementos e intruduciendolos en el array "getTotalApi"
                        getTotalApi = [...getTotalApi, ...e.data.results]
                    })
                })
                .catch(e => console.log(e))

            //! concateno los juegos de mi "DB" = "responseDb" con los de la "Api Rawg" = "getTotalApi"
            getTotalApi = [...cambiandoGeneroAgenres, ...getTotalApi]

            console.log(getTotalApi.length)
            res.status(200).send(getTotalApi)
        } catch (error) {
            res.status(400).send("Server error, games not found")
        }
    }
})





module.exports = router;