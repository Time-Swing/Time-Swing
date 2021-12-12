import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    TrafficLayer} from "react-google-maps";
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

        const googleLink="https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_API_KEY+"&v=3.exp&libraries=geometry,drawing,places"
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.state}
                defaultOptions={{mapTypeControl: false,streetViewControl: false}}
            >
                <Marker
                position={this.state}>
                    <InfoWindow>
                        <div>{this.props.address}</div>
                    </InfoWindow>
                </Marker>
                <TrafficLayer autoUpdate />
            </GoogleMap>
            ));
        return(
            <div>
                <MapWithAMarker
                googleMapURL={googleLink}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `200px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                
                />
            </div>
        )                 

    }
      
    
  }
  
  export default Map;