import {Alert} from 'react-native';

export const errorHandler = (error: any, method?: string) => {
  console.log(error, method || 'Pass the method');
  // const message = error.data?.message || '';
  let resultString = '';

  const errors = error?.data?.errors || [];
  // const resultString = `${message}\n${errors.join('\n')}`;
  if (errors.length) {
    resultString = `${errors.join('\n')}`;
  } else {
    resultString = error.data?.message || '-';
  }
  Alert.alert('', resultString);
};
