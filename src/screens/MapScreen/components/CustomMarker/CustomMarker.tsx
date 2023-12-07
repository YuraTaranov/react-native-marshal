import React from 'react';
import {useCallback, useState} from '@hooks';
import {Marker} from '@components';
import {MarkerItem} from '../MarkerItem/MarkerItem';
import {TMarker} from '../../MapScreen';
import {ios} from '@constants';

type TProps = {
  m: TMarker;
  openMarker: (data: TMarker) => () => void;
  selectedMarker: TMarker;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const CustomMarker: React.FC<TProps> = ({
  m,
  openMarker,
  selectedMarker,
  coordinate,
}) => {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  const onLoadEnd = useCallback(() => {
    setTracksViewChanges(false);
  }, []);

  return (
    <Marker
      key={`${m?.id}`}
      onPress={openMarker(m)}
      tracksViewChanges={ios ? true : tracksViewChanges}
      coordinate={coordinate}>
      <MarkerItem
        selected={selectedMarker?.id === m?.id}
        marker={m}
        onLoadEnd={onLoadEnd}
      />
    </Marker>
  );
};

export default CustomMarker;
