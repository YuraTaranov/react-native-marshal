import {Alert} from 'react-native';
import i18next from 'i18next';

export const errorHandler = (error: any, method?: string) => {
  console.log('REQUEST ERROR', method || 'Pass the method', error);
  // const message = error.data?.message || '';

  if (error.status === 418) {
    return Alert.alert(
      '',
      i18next.t('Перевірте підключення до Інтернету або спробуйте пізніше'),
    );
  }

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
