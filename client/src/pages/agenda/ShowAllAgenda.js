import React from 'react'
import AgendaItem from '../../components/AgendaItem'
import Loading from '../../components/Loading'
import DeleteAgenda from './DeleteAgenda'
import "../../css/agenda_style.css"
import { AuthContext } from '../../context/AuthContext';
import WeatherIcon from '../../components/Weather';

class AgendaListPage extends React.Component{
    static contextType = AuthContext;
    state = {
        agendas:[],
        isLoading:true
    }

    componentDidMount(){
        const url = "/api/agenda"
        fetch(url)
            .then(res=>res.json())
            .then(agendaData=>{
                this.setState({
                    isLoading:false,
                    agendas:agendaData.map((agendaItem,index)=>{
                        return (
                            <div className="agenda_row_style">
                                
                                    <AgendaItem 
                                        key={index}
                                        id={agendaItem.id}
                                        timeStart={agendaItem.timeStart}
                                        timeEnd = {agendaItem.timeEnd}
                                        title={agendaItem.title}
                                        content={agendaItem.content}
                                        address={agendaItem.address}
                                        createdAt= {agendaItem.createdAt}
                                    />
                                    <WeatherIcon address={agendaItem.address}/>
                                
                                <div className="delete_style">
                                    <DeleteAgenda key={index} id={agendaItem.id} />
                                </div>
                            </div>)         
                    })
                })
            })
            .catch(err=>console.log("Error on fetch all agendas"+err))
    }

    render(){
        if(this.state.isLoading){return <Loading/>}
        return (
            <div><center>
                {this.state.agendas}
            </center></div>
        )
    }
}

export default AgendaListPage