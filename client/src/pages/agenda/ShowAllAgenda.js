import React from 'react'
import AgendaItem from '../../components/AgendaItem'
import Loading from '../../components/Loading'

class AgendaListPage extends React.Component{
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
                        return <AgendaItem 
                                    key={index}
                                    id={agendaItem.id}
                                    timeStart={agendaItem.timeStart}
                                    timeEnd = {agendaItem.timeEnd}
                                    title={agendaItem.title}
                                    content={agendaItem.content}
                                    address={agendaItem.address}
                                    createdAt= {agendaItem.createdAt}
                                />
                    })
                })
            })
            .catch(err=>console.log("Error on fetch all agendas"+err))
    }

    render(){
        if(this.state.isLoading){return <Loading/>}
        return (
            <div>
                {this.state.agendas}
            </div>
        )
    }
}

export default AgendaListPage