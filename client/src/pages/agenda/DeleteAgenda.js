import React from 'react'
import { Redirect } from 'react-router-dom';


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
        
        if(this.state.success) return <Redirect to="/" />;//;

        return(
            <div>
                {errorMessage}
                <div>
                    <button onClick={this.handleDelete} > X </button>
                </div>
            </div>
        )
        
    }
}

export default DeleteAgenda;