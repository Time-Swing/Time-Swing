import React from 'react'
import { Redirect } from 'react-router'


class NewAgenda extends React.Component{
    state = {
        error: false,
        success: false,
        content:{
            title:'',
            timeStart:'',
            timeEnd:'',
            content:'',
            address:''
        }, 
    }

    handleChanged = (event) =>{
        const {name, value} = event.target
        // console.log("name: "+name+ "...value:"+value)
        this.setState(preData=>{
            return {
                ...preData,
                content:{
                    ...preData.content,
                    [name]:value
                }
            }
            
        })
    }

    saveAgenda = (event) =>{
        // console.log(this.state.content)
        //call the api post
        const url = "/api/agenda/"
        fetch(url,{
            method:'post',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state.content)
        })
            .then(res=>{
                if(res.ok){return res.json()}

                throw new Error('Content vailidation')
            })
            .then(agenda=>{
                this.setState({
                    success:true,
                })
            })
            .catch(err=>{
                this.setState({
                    error:true
                })
            })
    }

    render(){
        //may need a hit to user
        if(this.state.success) return <Redirect to="/" />;

        //showing error if need
        let errorMessage = null
        if(this.state.error) {
            errorMessage = (
                <div className="alert alert-danger">
                "There was an error saving this post."
                </div>
            )
        }

        return (
            <div className=''> 
                {errorMessage}
                <div className=''>
                    <input type='text' name="title" placeholder="Title" value={this.state.content.title} onChange={this.handleChanged} required/> <br/>
                    <input type='datetime-local' name="timeStart" placeholder="Start Time" value={this.state.content.timeStart} onChange={this.handleChanged} required/><br/>
                    <input type='datetime-local' name="timeEnd" placeholder="End Time" value={this.state.content.timeEnd} onChange={this.handleChanged} /><br/>
                    <input type='text' name="content" placeholder="Content" value={this.state.content.content} onChange={this.handleChanged} /><br/>
                    <input type='text' name="address" placeholder="A Place" value={this.state.content.address} onChange={this.handleChanged} /><br/>
                    <button className="btn btn-primary" onClick={this.saveAgenda}>Save Agenda</button>
                </div>
            </div>
        )
    }
}

export default NewAgenda