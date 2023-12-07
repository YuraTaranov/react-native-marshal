// @flow
import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import _ from 'lodash';
import {colors} from '@constants';

type TIconParam = {
  name?: string,
  fill?: string,
  width?: number,
  height?: Number,
};

const SVG = ({name, fill, width, height}: TIconParam) => {
  const graphics = {
    addCard: {
      width: 256,
      height: 256,
      content: (
        <G>
          <Path
            d="M232 128a104 104 0 10-104 104 104 104 0 00104-104z"
            fill="#f5f6f6"
          />
          <Path
            d="M76.19 165.55a6.91 6.91 0 01-6.91-6.9L69.2 97a6.93 6.93 0 016.9-7l95.9-.27v.5l-95.87.29A6.45 6.45 0 0069.7 97l.08 61.69a6.42 6.42 0 006.41 6.4h21.19v.5H76.19z"
            fill="#445962"
          />
          <Path
            d="M76.26 90.23a6.73 6.73 0 00-6.7 6.77l.14 62.12a6.73 6.73 0 006.73 6.7l21.11-.05L172.92 90z"
            fill="#dfdfe0"
          />
          <Path
            d="M181.7 90h-8.78l-75.39 75.73 84.33-.18a6.73 6.73 0 006.7-6.73l-.13-62.11a6.91 6.91 0 00-.52-2.58 6.73 6.73 0 00-3.64-3.62 6.69 6.69 0 00-2.57-.51z"
            fill="#d3d2d2"
          />
          <Path
            d="M101.34 107.29H79.05a2.2 2.2 0 00-2.19 2.2v13.18a2.2 2.2 0 002.2 2.19h22.29a2.2 2.2 0 002.19-2.2v-13.18a2.2 2.2 0 00-2.2-2.19z"
            fill="#93a0a8"
          />
          <Path
            d="M99.64 132.24H76.9v5.83l22.74-.05zM126.65 132.19l-22.74.05v5.82l22.73-.05zM153.66 132.13l-22.73.05V138l22.74-.05zM180.67 132.08h-22.74V138h22.74z"
            fill="#263137"
          />
          <Path
            d="M133.33 145.66l46.67-.09V142l-46.67.1zM147.61 151.49l32.4-.06v-3.28l-32.4.07zM147.63 157.37l32.4-.07V154l-32.4.07z"
            fill="#445962"
          />
          <Path d="M202 90a19 19 0 10-19 19 19 19 0 0019-19z" fill="#f6d082" />
          <Path d="M185 82h-4v6h-6v4h6v6h4v-6h6v-4h-6z" fill="#fff" />
        </G>
      ),
    },
  };

  const viewBoxWidth = graphics[name].width;
  const viewBoxHeight = graphics[name].height;
  const viewBoxRatio = viewBoxWidth / viewBoxHeight;

  return (
    <Svg
      width={width || (height && _.parseInt(height * viewBoxRatio)) || 100}
      height={height || (width && _.parseInt(width / viewBoxRatio)) || 100}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
      {graphics[name].content}
    </Svg>
  );
};

SVG.defaultProps = {
  name: 'addCard',
  fill: colors.black_000000,
};

export default SVG;
