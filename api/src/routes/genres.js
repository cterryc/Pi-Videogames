require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios');

// importando la tabla "Genero" <== el nombre "Genero" es porque se le declaro con ese nombre, mirar /models/Genero.js
const { Genero } = require('../db');

//! -----> GET a "/genres" <--------

router.get('/', async (req, res) => {
    try {

        // si ya los tengo cargados en la DB los consumo desde alli.
        const genresDb = await Genero.findAll();
        if (genresDb.length) {
            console.log("Entrando a genresDb <==")
            return res.status(200).json(genresDb)
        }

        // si no lo tengo los voy a buscar a la API ==> el cual me dara un "OBJETO" con una propiedad "results"
        // "results" => me dara un ARRAY de objetos, cada objeto es un genero q contiene juegos.
        const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)

        // recibo un objeto que contiene la propiedad results, el cual me dara un ARRAY de objetos, 
        // cada objeto es un genero q contiene juegos.
        const genres = response.data.results;

        // Insertando todos los "nombres de cada generos" en la tabla "Genero"
        await genres.forEach(g => {
            Genero.create({
                    name: g.name
            })
        })

        // enviando al front un "json" con los nombres de los generos
        const genresREADY = genres.map(game => {
            return {
                id: game.id,
                name: game.name
            }
        });
        res.status(200).json(genresREADY)
    } catch (err) {
        res.status(400).send("Error en el Servidor")
    }
})

module.exports = router;