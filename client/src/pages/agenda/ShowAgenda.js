import React from 'react'
import AgendaItem from '../../components/AgendaItem'
import Loading from '../../components/Loading'
import { useHistory, Redirect } from 'react-router-dom'
import Map from '../../components/Map'
import "../../css/show_style.css"
import "../../css/agenda_style.css"

//This page is for showing a agendaItem in detail
class ShowAgenda extends React.Component{
    state={
        agendaItem:null,
        isLoading:true,
        notFound:false,
        address:null,
    }

    componentDidMount(){
        const {id} = this.props.match.params
        const url = "/api/agenda/"+id
        fetch(url)
            .then(res=>res.json())
            .then(target=>{
                target["isIndetail"] = true
                // console.log(target)
                this.setState({
                    agendaItem:<AgendaItem {...target} />,
                    isLoading:false,
                    address:target.address,
                })
            })
            .catch(err=>{
                this.setState({notFound:true})
                console.log("A error happend on get detail for an agendaITem "+err)
            })
    }

    goBack(event) {
        window.history.back();
    }

    render(){
        if(this.state.notFound) {return <Redirect to="/" />};
        if(this.state.isLoading){return <Loading/>}
        
        return (
            <div className="ShowBox">
                <div className="goback_div">
                    <button onClick={this.goBack} className="goback_btn">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
                {this.state.agendaItem}
                {this.state.address && <Map address={this.state.address}/>}
            </div>   
        )
    }
}

export default ShowAgenda