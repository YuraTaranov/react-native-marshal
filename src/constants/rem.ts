import {sizes} from '@constants';

const rem = (value: number) => {
  return `${value / sizes.rem}rem`
};

export default rem;