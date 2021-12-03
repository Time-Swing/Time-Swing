import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,} from "react-google-maps";
import Geocode from 'react-geocode';

class Map extends React.Component{
    state={
        lat:0,
        lng:0
    }
    componentDidMount(){
        Geocode.setApiKey(process.env.REACT_APP_API_KEY);
        Geocode.fromAddress(this.props.address).then(res=>{
            const lat = res.results[0].geometry.location.lat
            const lng = res.results[0].geometry.location.lng
            this.setState({lat:lat,lng:lng})
            })
        

    }
    render(){
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={this.state}
            >
                <Marker
                position={this.state}
                />
            </GoogleMap>
            ));
        return(
            <div>
                <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwPafMX9xyduviqWNIry3cFw-w-09upco&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )                 

    }
      
    
  }
  
  export default Map;