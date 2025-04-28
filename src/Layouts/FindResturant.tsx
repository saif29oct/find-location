import { useState, useMemo } from 'react';
import LocationFilter from '../components/LocationFilter';
import MapView from '../components/MapView';
import UseFetch from '../Hooks/useFetch';
import type { IUseFetchProps } from '../Hooks/useFetch';
import { IMapState } from '../reduxSlices/mapSlice';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store';
import { Col, Row, Input, Button } from 'antd';
import SearchLocation from '../components/SearchLocation';
import { Loading } from '../components/Loading';
const { Search } = Input;

export interface IMapData {
  categories?: [],
  chains?: [],
  distance: number,
  fsq_id: string,
  geocodes: {
    main: {
      latitude: number
      longitude: number
    }
  },
  link?: string,
  location: {
    description: string,
    formatted_address: string
  },
  name: string,
  related_places?: {},
  timezone?: string
}

export function FindResturant () {

  const currentPostion = useSelector((state: ReduxState) => state.map);

  const makeGetRequestUrl = ({latitude, longitude, zoom, name, radious, categories}: IMapState): IUseFetchProps => {
    const ll = "ll=" + latitude + "%2C" + longitude;
    const radiousStr = radious ? "radius=" + radious + "&" : null;
    const categoriesStr = categories ? "categories" + categories + "&" : null;
    const nameStr = name ? "query=" + name + "&" : null;
    const urlStr = "https://api.foursquare.com/v3/places/search?" + nameStr + radiousStr + categoriesStr + ll;

    return {
      url: urlStr,
      options: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.REACT_APP_FOUR_SQUARE_API_KEY
        }
      }
    }
  }

  const fetchProps = useMemo(() => makeGetRequestUrl(currentPostion), [currentPostion]);

  let mapData: IMapData[] | [] = UseFetch(fetchProps);

  const [place, setPlace] = useState<IMapData[] | []>([]);

  const [searchRequest, setSearchRequest] = useState<IUseFetchProps | null>(null);

  const onSearch = (name: string) => {
    if (name.length > 2) {
      const position = { name, ...currentPostion };
      setSearchRequest(makeGetRequestUrl(position));
    }

    if (name.length === 0) {
      setSearchRequest(null);
    }
  }

  const searchBoxEnter = () => {
    setPlace([]);
  }

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

  const nearestRestaurant = () => {
    setSearchRequest(null);
    if (mapData.length > 0) {
      const randomNum = random(0, mapData.length - 1);
      setPlace([mapData[randomNum]]);
    }
  }

  // Check if data is being fetched
  const isFetching = mapData.length === 0;

  return (
      <>
        <Row>
          <Col sm={24} md={24} push={9}>
            <img className="logo" src='restaurantLogo.jpeg' alt='Restaurant Logo' />
          </Col>
        </Row>

        <Row>
          <Col  xs={24} sm={24} md={8} style={{ padding: 5 }}>
            <Button onClick={() => { nearestRestaurant() }} type="primary" style={{ margin: 5, height: 50 }} block>
              Find a random Restaurant near you
            </Button>
            <Search
                placeholder="Search Restaurant (Min Length 3)"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                onClick={() => { searchBoxEnter() }}
                style={{ margin: 5 }}
            />
            {
              searchRequest ? <SearchLocation props={searchRequest} setPlace={setPlace} /> : (place.length > 0) ? <LocationFilter props={place} setPosition={setPlace} /> : null
            }
          </Col>
          <Col xs={24} sm={24} md={16} style={{ padding: 10 }}>
            {
              isFetching ? <Loading /> :
                  (place.length === 0 && mapData.length === 0) ? <Loading /> :
                      <MapView props={place.length === 1 ? place : mapData} search={place.length === 1 ? true : false} />
            }
          </Col>
        </Row>
      </>
  );
}
