import React from 'react'
import { Link } from 'react-router-dom'

function AgendaItem(props){

    let isIndetail = props.isIndetail
    let startTime = props.timeStart && new Date(props.timeStart)
    let timeEnd = props.timeEnd && new Date(props.timeEnd)
    let renderContent = null
    const shortTitle = props.title.length >=20 ? props.title.substring(0,20)+"..." : props.title
 
    
    
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
            {props.content && <pre>Content: <br/> {props.content}</pre>}
            {props.address && <p>Address: {props.address}</p>}
            <p style={{display:timeEndhide}}>End At:   {timeEnd.toString()}</p>
        </div>

    }else{
        renderContent = 
        <div>
            <Link to={"/agenda/"+props.id}>
            <p>{shortTitle}</p>
            </Link>         
            </div>
    }
    return renderContent
}
export default AgendaItem
