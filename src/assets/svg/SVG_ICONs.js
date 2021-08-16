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
    logo: {
      width: 50,
      height: 50,
      content: (
        <G>
          <Path
            d="M15 40.79l.88-2.69L1.16 27.25h12.55l-3.66-11 10.33 7.44 4.43-13.93 4.45 13.89 10.34-7.46-3.67 11h12.54L33.8 38.1l.88 2.69z"
            fill="#fff"
            fill-rule="evenodd"
          />
          <Path
            d="M11.83 18.74l2.85 8.57h4.65l.83-2.59zM35 27.31l2.85-8.57-8.22 5.94.91 2.63z"
            fill={fill}
            fill-rule="evenodd"
          />
          <Path
            d="M16.29 39.93l.71-2.12-13-9.56h16l4.9-15.34 4.93 15.34h15.89l-12.91 9.56.7 2.11z"
            fill={fill}
            fill-rule="evenodd"
          />
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
  name: 'logo',
  fill: colors.black_000000,
};

export default SVG;
