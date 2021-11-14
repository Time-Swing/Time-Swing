import React from 'react'
import { Link } from 'react-router-dom'

function AgendaItem(props){

    let isIndetail = props.isIndetail//flag
    let startTime = props.timeStart && new Date(props.timeStart)
    let timeEnd = props.timeEnd && new Date(props.timeEnd)
    let renderContent = null
    // console.log("Time Start:"+startTime)
    // console.log("Time End:"+timeEnd)

    if(isIndetail){
        renderContent = 
        <div>
            <Link to={"/agenda/"+props.id}> 
            <p>{props.title}</p>
            </Link>
            <p>Begin At: {startTime.toLocaleString()}</p>
            {props.content && <p>Content: {props.content}</p>}
            {props.address && <p>Address: {props.address}</p>}
            <p>End At:   {timeEnd.toLocaleString()}</p>
        </div>
    }else{
        renderContent = 
        <div>
            <Link to={"/agenda/"+props.id}>
            <p>{props.title}</p>
            </Link>
            <p>Begin At: {startTime.toLocaleString()}</p>
            <p>End At:   {timeEnd.toLocaleString()}</p>
        </div>
    }
    return renderContent
}
export default AgendaItem
