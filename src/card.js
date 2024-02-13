import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function Card(props) {
    const [getImage, setImage] = useState("")
    const [getData, setData] = useState("")
    const [getBackgroundImage, setBackgroundImage] = useState("")
    const [getStat, setStat] = useState('none')
    const [getMiddleOverlay, setMiddleOverlay] = useState('none')
    useEffect(function () {
        ApiCall()
    }, [])

    async function ApiCall() {
        try {
            let request = await fetch(props.value.url)
            let response = await request.json()
            setImage(response[0].image)
            setData(response)
            backgroundHandler(response)
        } catch (err) {
            console.log('sorry for the error 2')
        }
    }

    function backgroundHandler(getData) {
        if (getData[0].type === 'rock') {
            setBackgroundImage('linear-gradient(to top, #c79081 0%, #dfa579 100%)')
        } else if (getData[0].type === 'ghost') {
            setBackgroundImage('linear-gradient(to top, #b7b7b8 0%, #e2ebf0 100%)')
        } else if (getData[0].type === 'electric') {
            setBackgroundImage('linear-gradient(to right, #f83600 0%, #f9d423 100%)')
        } else if (getData[0].type === 'bug') {
            setBackgroundImage('linear-gradient(to top, #e6b980 0%, #eacda3 100%)')
        } else if (getData[0].type === 'poison') {
            setBackgroundImage('linear-gradient(to top, #df89b5 0%, #bfd9fe 100%)')
        } else if (getData[0].type === 'normal') {
            setBackgroundImage('linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)')
        } else if (getData[0].type === 'fairy') {
            setBackgroundImage('linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)')
        } else if (getData[0].type === 'fire') {
            setBackgroundImage('linear-gradient(120deg, #f6d365 0%, #fda085 100%)')
        } else if (getData[0].type === 'grass') {
            setBackgroundImage('linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)')
        } else if (getData[0].type === 'water') {
            setBackgroundImage('linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)')
        } else if (getData[0].type === 'ground') {
            setBackgroundImage('linear-gradient(315deg, #772f1a 0%, #f2a65a 74%)')
        }
    }

    function knowMoreBtnHandler() {
        setStat('flex')
        setMiddleOverlay('block')
    }

    function overlayCancelHandler() {
        setStat('none')
        setMiddleOverlay('none')
    }
    return <div>
        <div key={props.index} className="cards" style={{ 'backgroundImage': getBackgroundImage }}>
            <div className="cards-id" key={`${props.index}-cards-id`}>#{props.index + 1}</div>
            <div className="cards-img" key={`${props.index}-cards-img`}><img src={getImage} /></div>
            <div className="cards-name" key={`${props.index}-cards-name`}>{getData ? getData[0].name.toUpperCase() : ""}</div>
            <div className="cards-type" key={`${props.index}-cards-type`}>Type:{getData ? getData[0].type : ""}</div>
            <div className="cards-now-button" key={`${props.index}-cards-now-button`}><button key={`${props.index}-cards-button`} onClick={knowMoreBtnHandler}>Know More</button></div>
        </div>
        <div id="main" style={{ 'display': getStat, 'backgroundImage': getBackgroundImage }}>
            <div id="child1">
                <img src={getImage} />
                <span>{getData ? getData[0].name : ""}</span>
            </div>
            <div id="child2" style={{ 'backgroundColor': 'rgba(255,255,255,0.4)' }}>
                <table>
                    {getData ? getData[0].stats.map(function (value, index) {
                        return <tr><td className="dataApiStats">{value.stat.name}</td><td>: {value.base_stat}</td></tr>
                    }) : ""}
                </table>
            </div>
            <FontAwesomeIcon icon={faXmark} className="overlay-cancel"  onClick={overlayCancelHandler} />
        </div>

        <div style={{ 'display': getMiddleOverlay, 'backgroundColor': 'rgba(0,0,0,0.9)' }} className="middleOverlay"></div>
    </div>
}

export default Card;