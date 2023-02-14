const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const genres = require('./genres.js');
const videogame = require('./videogame.js');
const videogames = require('./videogames.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', genres);
router.use('/videogame', videogame);
router.use('/videogames', videogames);


module.exports = router;
