import React, { useContext, useState } from 'react'

const WeatherIcon = (props)=>{
    let [icon,setIcon] = useState()
    let [tempture,setTemp] = useState()
    let [success,setSuccess] = useState(false)
    const zipCode= props.address? props.address.substring(props.address.length - 10,props.address.length - 5):null
    // console.log(zipCode)
    if(zipCode){
        const url = "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid="+process.env.REACT_APP_WEATHER_API_KEY
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
            <img src={icon} alt="weather icon"/>:
            <p><i class="fas fa-home"></i></p>
    )
}
export default WeatherIcon