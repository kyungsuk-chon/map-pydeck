import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import Hexbin from './Hexbin.js';

import fakeStoreLatLngData from './data/generated-data.json';

const MAP_PIXEL_HEIGHT = 1100;
const HEX_PIXEL_RADIUS = 30;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isMarkerOn: false,
    }
    this.toggleMarker = this.toggleMarker.bind(this);
  }

  toggleMarker() {
    this.setState({
      isMarkerOn: !this.state.isMarkerOn,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" style={{ height: 70}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hexbin Demo</h2>
        </div>
        <GoogleMapLoader
          query={{ libraries: 'geometry,drawing,places,visualization' }}
          containerElement={
            <div
              style={{ width: '100%', height: MAP_PIXEL_HEIGHT }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={12}
              options={{ mapTypeControl: false }}
              // defaultCenter={{ lat: 37.518397, lng: 126.978886 }}
              defaultCenter={{ lat: 37.5001178464064, lng: 127.03220096278 }} //역삼동 중심
            >
              <Hexbin
                hexPixelRadius={HEX_PIXEL_RADIUS}
                mapPixelHeight={MAP_PIXEL_HEIGHT}
                data={fakeStoreLatLngData}
                colorRange={['white', 'rgb(242, 117, 165)']}
              />

              {
                this.state.isMarkerOn ?
                fakeStoreLatLngData.map(point => ({ position: point })
                ).map((obj, idx) => (
                  <Marker
                    key={idx}
                    {...obj}
                  />
                ))
                :
                null
              }
            </GoogleMap>
          }
        />
        <button
          style={{ margin: 25, padding: 10 }}
          onClick={this.toggleMarker}
        >
          Toggle Markers
        </button>
      </div>
    );
  }
}

export default App;
