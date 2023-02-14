import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { actionGameDetails } from "../../redux/actions/actions"
import gamedetailscss from "./detailsCss.module.css"
export default function GameDetails() {

    const dispatch = useDispatch()
    const { details } = useParams()//"details" es el id del juego, obtenido por params
    const { gameDetails } = useSelector(state => state)
    const [descriptionState, setDescriptionState] = useState(false)
    // console.log(details)
    // console.log(gameDetails)

    if (Object.keys(gameDetails).length === 0) dispatch(actionGameDetails(details))

    useEffect(() => {

    }, [gameDetails])

    const handleMouseEnter = () => {
        console.log(descriptionState)
        console.log("enter")
        setDescriptionState(true)
    };

    const handleMouseLeave = () => {
        console.log(descriptionState)
        console.log("leave")
        setDescriptionState(false)
    };

    function onClickBack() {
        window.history.back();
    }
    return (
        <div className={gamedetailscss.divglobal}>
            <div className={gamedetailscss.button}>
                <button onClick={onClickBack}>Go back</button>
            </div>
            <div className={gamedetailscss.garden}>
                <div className={gamedetailscss.divtext}>
                    <h1>{gameDetails.name}</h1>
                    {descriptionState ? <div className={gamedetailscss.description} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><div dangerouslySetInnerHTML={{ __html: gameDetails.description }} /></div> : <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>ver descriptio...</p>}
                    <h3>Released: {gameDetails.released}</h3>
                    <h3>Rating : {gameDetails.rating}⭐</h3>
                    <div className={gamedetailscss.genreplatform}>
                        <div>
                            <h2>Genres</h2>
                            <div className={gamedetailscss.dividedos}>
                                {gameDetails.genres?.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            {e.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 >Platforms</h2>
                            <div className={gamedetailscss.dividedos}>
                                {gameDetails.platforms?.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            {e.platform.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={gamedetailscss.divimg}>
                    <img src={gameDetails.background_image} alt="not found" className={gamedetailscss.img} />
                </div>
            </div>
        </div>
    )
}


