import React from "react";
import Image from 'react-bootstrap/Image';

import Card from 'react-bootstrap/Card';



const Cards = (props) => {
    const image = `http://openweathermap.org/img/wn/${props.data.weather[0].icon}.png`
    const dateTime = (seconds) => {
        const date = new Date(seconds * 1000)
        return date.toString()
    }




    // console.log(props.data)
    return (
        <div className="cardContainer" style={{ backgroundColor: "green", margin: "10px" }}>
            <div className="row">




                <div className="cardDate">{dateTime(props.data.dt)}</div >
                <br /><br />

                <Image className="mx-auto" src={image} />
                <br /><br />
                <div className="cardWindSpeed">Wind Speed: {props.data.wind_speed} MPH</div >
                <br /><br />
                <div className="cardMinTemp">Min Temprature: {props.data.temp.min} °F</div >
                <br /><br />
                <div className="cardMaxTemp">Max Temprature: {props.data.temp.max} °F</div >
                <br /><br />
                <div className="cardDescription">Description: {props.data.weather[0].description} </div >
                <br />

            </div>
        </div>
        //     </div>
        // </div >
    )
}

export default Cards