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

  Object.values(Object.assign({}, error?.data?.errors)).forEach(e => {
    if (Array.isArray(e) && e.length > 0) {
      resultString = resultString + `${e[0]}\n` || '';
    }
  });
  if (!resultString.trim()) {
    resultString = error.data?.message || '-';
  }
  if (error.data.message === 'Unauthenticated.') {
    console.log('Unauthenticated');
  } else {
    Alert.alert('', resultString);
  }
};
