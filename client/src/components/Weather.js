import React, {useState } from 'react'
import "../css/agenda_style.css"

const WeatherIcon = (props)=>{
    console.log(process.env.REACT_APP_WEATHER_API_KEY)
    let [icon,setIcon] = useState()
    let [tempture,setTemp] = useState()
    let [success,setSuccess] = useState(false)
    const zipCode= props.address? props.address.substring(props.address.length - 10,props.address.length - 5):null
    console.log(zipCode)
    if(zipCode){
        const url = "https://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid="+process.env.REACT_APP_WEATHER_API_KEY
        // console.log(url)
        fetch(url)
            .then(result=>result.json())
            .then(data=>{
                let iconUrl ="https://openweathermap.org/img/wn/"+data.weather[0].icon+".png"
                setSuccess(true)
                setIcon(iconUrl)
                setTemp(data.main.temp)
            })
    }
    
    return (
        success?
            <img src={icon} alt="weather icon" className="img_style"/>:
            <i class="fas fa-home"></i>
    )
}
export default WeatherIcon