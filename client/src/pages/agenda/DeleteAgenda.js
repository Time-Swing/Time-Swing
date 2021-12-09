import React from 'react'
import { Redirect } from 'react-router'
import "../../css/agenda_style.css"

class DeleteAgenda extends React.Component{
    state={
        success:false,
        error:false,
    }

    
    handleDelete=(event)=>{
        //make a url call
        const url='/api/agenda/'+this.props.id
        fetch(url,{
            method:'DELETE'
        })
        .then(res=>{
            // console.log(res)
            if(res.status === 204){
                // console.log("in the result function with "+res.status)
                this.setState({
                    success:true,
                })
            }
        })
        .catch(err=>{
            this.setState({
                error:true,
            })
        })

    }

    render(){
        // const history = useHistory()
        let errorMessage = null;
        if(this.state.error) {
          errorMessage = (
            <div className="alert alert-danger">
              "There was an error Delete this post."
            </div>
          );
        }
        if(this.state.success){return <Redirect to={{pathname:'/transfer',state:{lastPage:"delete"}}} />};
        return(
            <div>
                {errorMessage}
                <div>
                    <button className="delete_button" onClick={this.handleDelete} > ✘ </button>
                </div>
            </div>
        )
        
    }
}
//<Redirect to={"/agendas/"+this.props.id} />
export default DeleteAgenda;