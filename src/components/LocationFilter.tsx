import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { IMapData } from './FindLocations';

export interface ILocationFilterProps {
  props: IMapData[],
  setPosition(arg: IMapData[]): void
  children?: JSX.Element
}

export default function LocationFilter ({props: mapData, setPosition, children}: ILocationFilterProps) {
  const [locationData, setLocationData] = useState<IMapData[]>(mapData)

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    const index = parseInt(event.currentTarget.attributes.getNamedItem('data-positionpointer')?.value!);
    setPosition([locationData[index]])
    setLocationData([locationData[index]])
  }

  useEffect(()=>{
    setLocationData(mapData)
  },[mapData])

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={locationData}
        renderItem={(item, index) => (
            <List.Item data-positionpointer={index} onClick={handleClick} style={{cursor: 'pointer'}}>
                <List.Item.Meta
                    avatar={<Avatar src="https://cdn4.iconfinder.com/data/icons/location-3-1/713/19-Map-512.png" />}
                    title={item.name + " ("+item.distance/1000 + "km)"}
                    description={item.location.formatted_address}
                />
            </List.Item>
        )}
      />
      {children}
    </>
  );
}
