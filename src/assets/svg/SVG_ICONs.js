// @flow
import React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
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
    location: {
      width: 24,
      height: 24,
      content: (
        <G>
          <Path
            d="M21,11A9,9,0,0,0,13,3.05V1H11V3.05a9,9,0,0,0-7.95,8H1v2H3.05a9,9,0,0,0,8,8V23h2V21A9,9,0,0,0,21,13H23V11ZM12,19a7,7,0,1,1,7-7A7,7,0,0,1,12,19Z"
            fill={fill}
          />
          <Path
            d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
            fill={fill}
          />
        </G>
      ),
    },
    point: {
      width: 20,
      height: 20,
      content: (
        <G>
          <Path
            fill={fill}
            d="M10,20C4.5,20,0,15.5,0,10C0,4.5,4.5,0,10,0c5.5,0,10,4.5,10,10C20,15.5,15.5,20,10,20z M10,2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S14.4,2,10,2z"
          />
          <Circle fill={fill} cx="10" cy="10" r="3" />
        </G>
      ),
    },
    creditcard: {
      width: 24,
      height: 24,
      content: (
        <G>
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.81818 4H21.1818C22.186 4 23 4.89543 23 6V18C23 19.1046 22.186 20 21.1818 20H2.81818C1.81403 20 1 19.1046 1 18V6C1 4.89543 1.81403 4 2.81818 4ZM3 11V18H21V11H3ZM3 9H21V6H3V9Z"
            fill={fill}
          />
          <Path d="M11 13V15H9V13H11Z" fill={fill} />
          <Path d="M8 15V13H5V15H8Z" fill={fill} />
        </G>
      ),
    },
    gas: {
      width: 24,
      height: 24,
      content: (
        <G fill={fill}>
          <Path d="M18.4,22H5.6c-0.9,0-1.9-0.4-2.5-1c-0.7-0.7-1-1.6-1-2.5V7.6c0-0.5,0.1-0.9,0.3-1.4C2.5,5.8,2.7,5.4,3,5c0.3-0.3,0.7-0.6,1.2-0.8C4.6,4.1,5.1,4,5.6,4H6V3c0-0.6,0.4-1,1-1h5c0.6,0,1,0.4,1,1v1h1c2.1,0,4.1,0.8,5.7,2.3C21.2,7.9,22,9.9,22,12v6.4c0,0.5-0.1,0.9-0.3,1.4c-0.2,0.4-0.4,0.8-0.8,1.2s-0.7,0.6-1.2,0.8C19.4,21.9,18.9,22,18.4,22z M5.6,6 C5.4,6,5.2,6,5,6.1C4.8,6.2,4.6,6.3,4.5,6.5C4.3,6.6,4.2,6.8,4.1,7C4,7.2,4,7.4,4,7.6v10.9c0,0.4,0.2,0.8,0.5,1.1C4.7,19.8,5.2,20,5.6,20h12.9c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.2,0.5-0.3s0.3-0.3,0.3-0.5c0.1-0.2,0.1-0.4,0.1-0.6V12c0-1.6-0.6-3.1-1.8-4.2S15.6,6,14,6h-2c-0.6,0-1-0.4-1-1V4H8v1c0,0.6-0.4,1-1,1H5.6z" />
          <Path d="M12,17.9c-2.2,0-4-1.8-4-4c0-2.2,2.7-5.1,3.3-5.6c0.4-0.4,1-0.4,1.4,0c0.5,0.5,3.3,3.4,3.3,5.6C16,16.1,14.2,17.9,12,17.9zM12,10.5c-1,1.1-2,2.6-2,3.4c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2C14,13.1,13,11.6,12,10.5z" />
        </G>
      ),
    },
    androidToBack: {
      width: 1024,
      height: 1024,
      content: (
        <G fill={fill}>
          <Path d="M411.7,872.8l-292-327.2c-22.8-25.6-22.8-67,0-92.5l292-327.2c22.8-25.6,59.8-25.6,82.6,0s22.8,67,0,92.5L302,433.9h559.8c32.2,0,58.4,29.3,58.4,65.4c0,36.1-26.1,65.4-58.4,65.4H302l192.3,215.5c11.4,12.8,17.1,29.5,17.1,46.3c0,16.7-5.7,33.5-17.1,46.3C471.5,898.4,434.5,898.4,411.7,872.8z" />
        </G>
      ),
    },
    iosToBack: {
      width: 1024,
      height: 1024,
      content: (
        <G fill={fill}>
          <Path d="M709.8,120.7c22.5,22.5,22.5,58.9,0,81.3L405.4,506.4l304.4,304.4c22.5,22.5,22.5,58.9,0,81.3s-58.9,22.5-81.3,0l-345-345c-22.5-22.5-22.5-58.9,0-81.3l345-345C650.9,98.2,687.3,98.2,709.8,120.7L709.8,120.7z" />
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
