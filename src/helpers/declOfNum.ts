export const declOfNum = (number: number, titles: Array<string>): string => {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
export const formatPriceName = (val: number) => {
  const data = val.toFixed(2);
  const spitValue = data.split('.');
  const value =
    val < 1
      ? spitValue[1]
      : spitValue[1] === '00'
      ? spitValue[0]
      : `${spitValue[0]}.${spitValue[1]}`;
  return {
    title: val < 1 ? 'коп./л' : 'грн./л',
    value,
  };
};

export const literFormat = (value: number) => {
  return Number.isInteger(value) ? value : value.toFixed(1);
};
