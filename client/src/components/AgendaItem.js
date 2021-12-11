import React from 'react'
import { Link } from 'react-router-dom'
import "../../src/css/show_style.css"



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
            <p className="title">{props.title}</p>
            </Link>
            <p>Begin At: <p className="output">{startTime.toString()}</p></p>
            <p style={{display:timeEndhide}}>End At:<p className="output">{timeEnd.toString()}</p></p>
            {props.content && <p>Content: <pre className="output"> {props.content}</pre></p>}
        </div>

    }else{
        renderContent = 
        <div>
            <Link to={"/agenda/"+props.id}>
            {shortTitle}
            </Link>         
            </div>
    }
    return renderContent
}
export default AgendaItem
