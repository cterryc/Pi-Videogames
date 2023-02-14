require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const { Videogame, Genero } = require('../db');
const axios = require('axios');

// importando la tabla "Videogame" <== el nombre "Videogame" es porque se le declaro con ese nombre
// mirar /models/Videogame.jss

//! -----> GET a "/Videogame/:iD" <--------

router.get('/:id', async (req, res) => {
    // extrayendo nombre Query
    const { id } = req.params;

    // Obteniendo los juegos creados desde mi servidor local => esto sera un array
    const responseDb = await Videogame.findAll({ include: Genero })
    // luego comparo con el "id" solicitado
    const gameDb = responseDb.find(game => game.id === id)

    try {
        if (gameDb) {
            gameDb.platforms = gameDb.platforms.split(", ").map(ele => {
                return {
                    platform: {name:ele}
                }
            })
            console.log("Esto es gameDb =>",gameDb)
            let gamedb2 = gameDb.toJSON()
            gamedb2.genres = gamedb2.Generos;
            let date = new Date(gamedb2.released);
            gamedb2.released = date.toLocaleDateString()
            res.status(200).json(gamedb2)
        } else {

            // Obteniendo todos los juegos de la API GAME
            const getApi = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

            const detail = getApi.data
            console.log(detail)

            // filtrando toda la info para q solo me devuelva un array de juegos, con las propeidades que necesito
            const detailsGame = {
                id: detail.id,
                name: detail.name,
                background_image: detail.background_image,
                released: detail.released,
                rating: detail.rating,
                genres: detail.genres,
                platforms: detail.platforms,
                description: detail.description
            }

            res.status(200).json(detailsGame)
        }

    } catch (error) {
        res.status(400).send("Server Error, API Details not FOUND")
    }
})

module.exports = router;