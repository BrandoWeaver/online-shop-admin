import React, { memo } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';

import {
  Autocomplete,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { debounce } from '@mui/material/utils';

import theme from 'themes';

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: StructuredFormatting;
}

export interface ISearchRef {
  reset: () => void;
}
interface Isearchloaction {
  setAddress: React.Dispatch<React.SetStateAction<ICoord>>;
  setMapCenter: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const autocompleteService = { current: null };

const SearchLocation = (props: Isearchloaction) => {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [value, setValue] = React.useState<PlaceType | null>(null);

  const handleChange = (event: any, newValue: PlaceType | null) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    if (newValue) {
      const service = new window.google.maps.Geocoder();
      service.geocode({ placeId: newValue.place_id }, (result, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && result) {
          const location = {
            coord: {
              lat: result[0].geometry.location.lat(),
              lng: result[0].geometry.location.lng(),
            },
            address: newValue.description,
            address1: newValue.structured_formatting.secondary_text,
          };
          setValue(newValue);
          props.setAddress(location.coord);
          props.setMapCenter(location.address);
        }
      });
    }
  };

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: {
            input: string;
            componentRestrictions: { country: string };
          },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (
      !autocompleteService.current &&
      (window as any).google &&
      (window as any).google.maps &&
      (window as any).google.maps.places
    ) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      { input: inputValue, componentRestrictions: { country: 'KH' } },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      },
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      size='small'
      forcePopupIcon={false}
      disableClearable={value ? true : false}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterSelectedOptions
      value={value}
      options={options}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      componentsProps={{
        paper: {
          sx: {
            backgroundColor: theme.palette.background.default,
          },
          elevation: 1,
          square: true,
        },
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.place_id}>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <IoLocationOutline
                  style={{ marginRight: '10px' }}
                  size={25}
                  color={theme.palette.primary.main}
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
                  {option.description}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Search...'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position='end'>
                <MdSearch size={20} />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      )}
    />
  );
};

export default memo(SearchLocation);
