import React from 'react';
import {Redirect} from 'react-router-dom'

class Transfer extends React.Component{
    state = {
        nextPage:"",
    }
    componentDidMount(){
        if(this.props.location.state.lastPage === "delete"){
            this.setState({nextPage:"/agendas"})
        }else{
            this.setState({nextPage:"/signup"})
        }
        
        // console.log("in the transfer page:"+this.props.location.state.lastPage)
    }
    // /<Redirect to={this.state.nextPage} />
    render(){
        
        // console.log("render in the transfer page:"+this.props.location.state.lastPage)
        return <Redirect to='/agendas' />
    }
}

export default Transfer;