import React from 'react';
import { Redirect } from 'react-router-dom';
// import { DatePicker } from 'rsuite';


class PostAgenda extends React.Component {
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
    // console.log(name,value)
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


  saveAgenda = (event) => {
    // console.log(JSON.stringify(this.state.content))
    fetch("/api/agenda/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.content),
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    if(this.state.success) return <Redirect to="/" />;

    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error saving this post."
        </div>
      );
    }

    return (
      <div>
        { errorMessage }
        <div>
          <input 
            type="text" 
            placeholder="Type the title" 
            name="title"
            value={this.state.content.title}
            onChange={this.handleChanged}
          />
        </div>
        <br/>
        <div>
          <input 
            type="text" 
            placeholder="Address" 
            name="address"
            value={this.state.content.address}
            onChange={this.handleChanged}
          />
          <br/>
        </div>
        <br/>
        <div>
          <input 
              type="datetime-local" 
              name="timeStart"
              value={this.state.content.timeStart}
              onChange={this.handleChanged}
            />
        </div>
        <br/>
        <div>
        <input 
              type="datetime-local" 
              name="timeEnd"
              value={this.state.content.timeEnd}
              onChange={this.handleChanged}
            />
        </div>
        <br/>
        <div>
          <input 
            type="text" 
            name="content"
            placeholder="Content" 
            value={this.state.content.content}
            onChange={this.handleChanged}
          />
          <br/>
        </div>
        <br/>
        <div>
          <button className="btn btn-primary" onClick={this.saveAgenda}>Save Post</button>
        </div>
      </div>
    );
  }
}

export default PostAgenda;