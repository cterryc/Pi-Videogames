import { useState } from "react";
import createGameCss from "./createGameCss.module.css"

//! esto son las opciones q necesita "fetch" para hacer el post, donde "obj" sera el formulario a enviar
const options = (obj) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    }
};

export default function CreateVideogame(props) {

    // Seteo el estao local de los inpunt y checkbox
    const [local, setLocal] = useState({
        localGeneros: [],
        localPlatforms: [],
        name: "",
        description: "",
        released: "",
        rating: 0
    })

    // seteo un estado para poder verificar errores
    const [errors, setErrors] = useState({
        localGeneros: [],
        localPlatforms: [],
        name: "",
        description: "",
        released: "",
        rating: 0,
        background_image: ""
    })

    // funcion para ver el stado actual y verificar si falta rellenar algun campo
    function catchErrors() {
        let errors = {};
        if (local.localGeneros.length <= 0) errors.localGeneros = "Generos: select at least 1 gender";
        if (local.localPlatforms.length <= 0) errors.localPlatforms = "Platform: select at least 1 platform";
        if (local.name.length <= 0) errors.name = "Name: must contain at least 1 characters";
        if (local.description <= 0) errors.description = "Description: is required";
        if (local.released <= 0) errors.released = "Date: is required";
        if (local.rating <= 0 && local.rating > 5) errors.rating = "Rating: select a number from 1 to 5";
        if (local.background_image <= 0) errors.background_image = "Image: insert an image"
        return errors;
    }

    // realizo destructuring al stado global y obtengo los generos y platforms q existen
    // const { generos, platforms } = useSelector((state) => state)
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

    // si el estado global no contiene generos, realizo un pedido a la api
    // if (generos.length <= 0) dispatch(GenerosGet())
    // si el estado global no contiene platforms, realizo un pedido a la api
    // if (platforms.length <= 0) dispatch(PlatformsGet())

    // capturo todos los cambios realizados en los input y checkbox
    function onChange(e) {
        // verifico si el evento es del tipo checkbox
        if (e.target.type === "checkbox") {
            // de no existir el tipo dentro de mi stado local, lo añado
            let findCheckbox = local[e.target.value].find(ele => ele === e.target.name);
            if (!findCheckbox) {
                setLocal({
                    ...local,
                    [e.target.value]: [...local[e.target.value], e.target.name]
                })
                setErrors({
                    ...errors,
                    [e.target.value]: [...errors[e.target.value], e.target.name]
                })
            } else {
                // al desmarcar el checkbox se repite el evento, enviandome el value, lo filtro y lo quito del estado local
                let filterLocal = local[e.target.value].filter(ele => ele !== findCheckbox);
                setLocal({
                    ...local,
                    [e.target.value]: filterLocal
                })
                setErrors({
                    ...errors,
                    [e.target.value]: filterLocal
                })


            }
        }
        // si el evento tiene de nombre text, seteo los input en el estado local
        if (e.target.name === "text") {
            setLocal({
                ...local,
                [e.target.id]: e.target.value
            })
        }
    }

    // envio todo el formulario y relaizo un "fetch-post"
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(catchErrors())
        if (local.rating > 5 || local.rating < 1) return alert("Rating: select a number from 1 to 5")
        if (local.localGeneros.length > 3) return alert("Genres: select less than three")
        if (local.localPlatforms.length > 3) return alert("Platforms: select less than three")
        if (Object.keys(catchErrors()).length !== 0) {
            return alert("Rellenar todos los campos")
        }
        // creo un objeto con las propiedades necesarias para crear el juego y con los valores del estado local //! recordar q se hizo esto por el avance del Pi, y no tener q renombrar todo.
        let enviarPost = {
            name: local.name,
            description: local.description,
            released: local.released,
            rating: local.rating,
            genres: local.localGeneros,
            platforms: local.localPlatforms,
            background_image: local.background_image
        }
        fetch('http://localhost:3001/videogames', options(enviarPost))
            .then(response => response.json())
            .then(response => alert(response))
        props.history.push('/videogames')
    }

    return (
        <form onChange={onChange} onSubmit={onSubmit} >
            <div className={createGameCss.formGlobal}>
                <h1 className={createGameCss.h3}>CREATE YOUR GAME</h1>
                <h5>Rellenar todos los campos: </h5>
                <div className={createGameCss.inputLabels}>
                    <div className={createGameCss.labels}>
                        <label className={local.name ? createGameCss.p2 : createGameCss.p1}>Name: </label>
                        <label className={local.rating ? createGameCss.p2 : createGameCss.p1}>Rating: </label>
                        <label className={local.released ? createGameCss.p2 : createGameCss.p1}>Date: </label>
                        <label className={local.description ? createGameCss.p2 : createGameCss.p1}>Description: </label>
                        <label className={local.background_image ? createGameCss.p2 : createGameCss.p1}>Image: </label>
                    </div>
                    <div className={createGameCss.inputs}>
                        <input className={createGameCss.elementoInputs} placeholder=" Name..." type="text" name="text" id="name" />
                        <input className={createGameCss.elementoInputs} placeholder=" choose from 1 to 5..." type="number" name="text" id="rating" />
                        <input className={createGameCss.elementoInputs} placeholder=" Date" type="date" name="text" id="released" />
                        <textarea className={createGameCss.elementoInputs} placeholder=" Description..." type="text" name="text" id="description" />
                        <input className={createGameCss.elementoInputs} placeholder=" insert url image..." type="text" name="text" id="background_image" />
                    </div>
                </div>
                <div className={createGameCss.genresPlatforms}>
                    <div>
                        <h2>Platforms</h2>
                        {local.localPlatforms.length <= 0 || local.localPlatforms.length >= 4 ? <p className={createGameCss.p1Box}>sleccionar de 1 a 3 elementos X</p>
                            : <p className={createGameCss.p2Box}>sleccionar de 1 a 3 elementos ✓</p>}
                        <div className={createGameCss.platforms}>
                            {platforms?.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" name={e} value="localPlatforms" />
                                        <label>{e}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>Genres</h2>
                        {local.localGeneros.length <= 0 || local.localGeneros.length >= 4 ? <p className={createGameCss.p1Box}>sleccionar de 1 a 3 elementos X</p>
                            : <p className={createGameCss.p2Box}>sleccionar de 1 a 3 elementos ✓</p>}
                        <div className={createGameCss.genres}>
                            {generos?.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" name={e} value="localGeneros" />
                                        <label>{e}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <input type="submit" className={createGameCss.button} />
            </div>
        </form>
    )
}