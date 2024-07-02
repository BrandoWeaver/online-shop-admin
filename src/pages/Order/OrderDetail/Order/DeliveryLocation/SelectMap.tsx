import { GoogleMap, Libraries, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';

import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

import theme from 'themes';

import SearchLocation from './SearchLocation';

interface Iselect {
  selectMap: boolean;
  onChange: (data: google.maps.LatLngLiteral) => void;
  currentLocationButton?: boolean;
  currentAdd: string;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setCenter: React.Dispatch<React.SetStateAction<ICoord>>;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  centerMap: ICoord;
  label: string;
}
const libraries: Libraries = ['places', 'visualization'];
export interface ISearchRef {
  reset: () => void;
}
export const defaultCoord = { lat: 11.5752041, lng: 104.9000041 };
interface ICoord {
  lat: number;
  lng: number;
}

function SelectMap(props: Iselect) {
  const mapRef = useRef<google.maps.Map>();
  const [currentLocation, setCurrentLocation] = useState<ICoord>();
  // console.log('curentLocation:', currentLocation);
  const [location, setLocation] = useState<string>();
  useEffect(() => {
    if (props.label !== '') {
      setLocation(props.label);
    } else {
      setLocation('home');
    }
  }, [props.label]);
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: 'AIzaSyAvQvanOfyr5a0qtcDmWrvtE3uFWRqt_lw',
  //   libraries,
  // });

  // if (!isLoaded) {
  //   return <Skeleton />;
  // }

  const mapOptions = {
    center: {
      lat: 11.576096,
      lng: 104.9233301,
    },
    zoom: 15,
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    let userLocation = defaultCoord;
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(userLocation);
    });
  };

  const handleDragEnd = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()?.toJSON();
      if (newCenter) {
        props.onChange(newCenter);
      }
    }
  };
  // console.log('props.centerMap', props.centerMap);
  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchLocation
          setAddress={props.setCenter}
          setMapCenter={props.setAddress}
        />
      </Grid>
      {props.selectMap && (
        <Grid item xs={12} md={12} sx={{ mt: 1 }}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <IoLocationOutline
              size={25}
              color={theme.palette.primary.main}
              style={{ marginRight: '10px' }}
            />
            <Typography
              fontWeight={'bold'}
              sx={{
                fontSize: {
                  xs: 'body2.fontSize',
                  md: 'body1.fontSize',
                },
              }}
            >
              {props.currentAdd}
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: { md: 'calc(100vh - 500px)', xs: 'calc(100vh - 450px)' },
          width: '100%',
          mt: 1,
          position: 'relative',
        }}
      >
        {/* <GoogleMap
          onLoad={onMapLoad}
          onDragEnd={handleDragEnd}
          center={props.centerMap || currentLocation}
          zoom={mapOptions.zoom}
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
          }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy',
          }}
        ></GoogleMap> */}
        <Box
          top='50%'
          left='50%'
          position='absolute'
          sx={{
            transform: 'translate(-50%, -50%)',
            p: 0.25,
            mt: -1.8,
          }}
        >
          <FiMapPin
            size={35}
            style={{
              color: theme.palette.primary.main,
              background: theme.palette.background.default,
              borderRadius: '15px',
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} mt={1}>
        <Typography
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          Save location as:
        </Typography>
        <Box mt={2}>
          <Button
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },

              background: theme.palette.grey['50'],
              mr: 2,
              px: { xs: 0, md: 3 },
              border:
                location === 'home'
                  ? `1px solid ${theme.palette.primary.main}`
                  : 'none',
              color: theme.palette.secondary.main,
            }}
            onClick={() => {
              props.setLocation('home');
              setLocation('home');
            }}
          >
            Home
          </Button>

          <Button
            sx={{
              color: theme.palette.secondary.main,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },

              background: theme.palette.grey['50'],
              mr: 2,
              px: { xs: 0, md: 3 },

              border:
                location === 'work'
                  ? `1px solid ${theme.palette.primary.main}`
                  : 'none',
            }}
            onClick={() => {
              props.setLocation('work');
              setLocation('work');
            }}
          >
            Work
          </Button>

          <Button
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: theme.palette.secondary.main,
              px: { xs: 0, md: 3 },
              background: theme.palette.grey['50'],

              border:
                location === 'other'
                  ? `1px solid ${theme.palette.primary.main}`
                  : 'none',
            }}
            onClick={() => {
              props.setLocation('other');
              setLocation('other');
            }}
          >
            Other
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SelectMap;
