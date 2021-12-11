import React from 'react';
import { Redirect } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";
import "../../css/post_style.css"
import { AuthContext } from '../../context/AuthContext';

const API_KEY = process.env.REACT_APP_API_KEY
console.log(process.env.REACT_APP_API_KEY)
class PostAgenda extends React.Component {
    static contextType = AuthContext;
    state = {
      error: false,
      success: false,
      more:'none',
      moreOrless:"▼",
      content:{
          title:'',
          timeStart:'',
          timeEnd:'',
          content:'',
          address:'',
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
              [name]:value,
          }
      }
      
  })
}

  showMore = (e) =>{
    if(this.state.more === ''){
      this.setState({more:'none',moreOrless:'▼'})
    }
    else{
      this.setState({more:'',moreOrless:'▲'})
    }
  }

  saveAgenda = (event) => {
    // console.log(JSON.stringify(this.state.content))
    fetch("/api/agenda/", {
      method: 'POST',
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
    if(this.state.success) return <Redirect to="/agendas" />;

    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error saving this post."
        </div>
      );
    }

    return (
      <div className="Post">
        { errorMessage }
        <div>
          <input className="input" 
            type="text" 
            placeholder="Type the title" 
            name="title"
            value={this.state.content.title}
            onChange={this.handleChanged}
          />
        </div>
        <br/>

        <div>
          <input className="input"
              type="datetime-local" 
              name="timeStart"
              value={this.state.content.timeStart}
              onChange={this.handleChanged}
            />
        </div>
        <br/>
        <button class="lessMore" onClick={this.showMore}>{this.state.moreOrless}</button>
        <br/>
        <div style={{display:this.state.more}}>
        <div>
        <br/>
        <Autocomplete className="input"
         apiKey={API_KEY}
         options={{
          types: ["address"],
          componentRestrictions: { country: "us" }
        }}
        onPlaceSelected={(place) => {
          console.log(place.formatted_address)
          this.setState(preData=>{
            return {
                ...preData,
                content:{
                    ...preData.content,
                    "address":place.formatted_address
                }
            }
        })
        }}        
/>
          <br/>
        </div>
        <br/>
        <div>
        <input className="input"
              type="datetime-local" 
              name="timeEnd"
              value={this.state.content.timeEnd}
              onChange={this.handleChanged}
            />
        </div>
        <br/>
        <div>
          <textarea className="content"
            name="content"
            placeholder="Content" 
            value={this.state.content.content}
            onChange={this.handleChanged}
          />
          <br/>
        </div>
        </div>

        <br/>
        <div>
          <button className="button" onClick={this.saveAgenda}>Save Post</button>
        </div>
      </div>
    );
  }
}

export default PostAgenda;