import React from 'react'
import { Link } from 'react-router-dom'

function AgendaItem(props){
    return (
        <div>
            <Link to={"/agenda/"+props.id}>
                <p>{props.title}</p>
            </Link>
                <p>{props.timeStart}</p>
                {props.timeEnd && <p>{props.timeEnd}</p>} 
                {/* {props.content} && <p>{props.content}</p> */}
                <p>{props.createdAt}</p>
        </div>
    )
}
export default AgendaItem