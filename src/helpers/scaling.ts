import { sizes } from '@constants';
const { horizontalCoefficient, verticalCoefficient } = sizes;

export const rem = (value: number) => `${value / sizes.rem}rem`;
export const scale = (size: number) => horizontalCoefficient * size;
export const verticalScale = (size: number) => verticalCoefficient * size;
export const moderateScale = (size: number, factor = 0.5) => size + ( scale(size) - size ) * factor;
