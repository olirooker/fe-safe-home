import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService
} from '@react-google-maps/api';
import { useRef } from 'react';

const Map = () => {
  const getOrigin = useRef('');
  const getDestination = useRef('');
  const onClick = () => {};

  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input
                id='ORIGIN'
                className='form-control'
                type='text'
                ref={getOrigin}
                placeholder='current location'
              />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input
                id='DESTINATION'
                className='form-control'
                type='text'
                ref={getDestination}
              />
            </div>
          </div>
        </div>

        <button className='btn btn-primary' type='button' onClick={onClick}>
          Build Route
        </button>
      </div>
      <div className='map-container'>
        <GoogleMap
          id='map-example'
          mapContainerStyle={{
            height: '150px',
            width: '100%'
          }}
          zoom={13}
          center={{ lat: 53.4808, lng: -2.2462 }}
        ></GoogleMap>
      </div>
    </div>
  );
};

export default Map;
