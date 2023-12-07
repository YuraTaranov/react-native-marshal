import {TProfile} from '@types';

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeUserPersonalData = (data: TProfile) => {
  const {name, surname, ...rest} = data;

  const capitalizedObj = {
    ...rest,
    name: name ? name.toUpperCase() : '',
    surname: surname ? surname.toUpperCase() : '',
  };

  return capitalizedObj;
};
