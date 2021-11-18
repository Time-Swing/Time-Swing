import React from 'react'
import { Link } from 'react-router-dom'

function AgendaItem(props){

    let isIndetail = props.isIndetail
    let startTime = props.timeStart && new Date(props.timeStart)
    let timeEnd = props.timeEnd && new Date(props.timeEnd)
    let renderContent = null
    console.log("Time Start:"+startTime)
    console.log("Time End:"+timeEnd)
    
    if(isIndetail){
        let timeEndhide = 'none'
        if (timeEnd){
            timeEndhide = ''
        }
        renderContent = 
        <div>
            <Link to={"/agenda/"+props.id}>
            <p>{props.title}</p>
            </Link>
            <p>Begin At: {startTime.toString()}</p>
            {props.content && <p>Content: {props.content}</p>}
            {props.address && <p>Address: {props.address}</p>}
            <p style={{display:timeEndhide}}>End At:   {timeEnd.toString()}</p>
        </div>

    }else{
        renderContent = 
        <div>
            <Link to={"/agenda/"+props.id}>
            <p>{props.title}</p>
            </Link>         
            </div>
    }
    return renderContent
}
export default AgendaItem
