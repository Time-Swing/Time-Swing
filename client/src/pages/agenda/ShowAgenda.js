import React from 'react'
import AgendaItem from '../../components/AgendaItem'
import Loading from '../../components/Loading'
import { Redirect } from 'react-router-dom'

//This page is for showing a agendaItem in detail
class ShowAgenda extends React.Component{
    state={
        agendaItem:null,
        isLoading:true,
        notFound:false
    }

    componentDidMount(){
        const {id} = this.props.match.params
        const url = "/api/agenda/"+id
        fetch(url)
            .then(res=>res.json())
            .then(target=>{
                console.log(target)
                this.setState({
                    agendaItem:<AgendaItem {...target} />,
                    isLoading:false
                })
            })
            .catch(err=>{
                this.setState({notFound:true})
                console.log("A error happend on get detail for an agendaITem "+err)
            })
    }

    render(){
        if(this.state.notFound) {return <Redirect to="/" />};
        if(this.state.isLoading){return <Loading/>}
        return (
            this.state.agendaItem
        )
    }
}


export default ShowAgenda