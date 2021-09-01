import React from 'react';
import {useTranslation, useState, useRef} from '@hooks';
import {MaterialInput, Platform} from '@components';
import {animation} from '@helpers';
import {colors} from '@constants';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TPlatformName} from 'src/helpers/animation';

type TProps = {
  setPhone: (str: string) => void;
};

export const InputPhone: React.FC<TProps> = ({setPhone}) => {
  const {t} = useTranslation();
  const re = /^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/;
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneRef = useRef();

  const phoneValidator = (str: string): void => {
    let result = str.replace(/\D/, '');
    setPhoneNumber(result);
    if (result.length > 11 && !!phoneRef && !!phoneRef?.current) {
      //@ts-ignore
      phoneRef.current?.blur();
    }
  };
  const onBlurPhone = () => {
    if (phoneNumber.length < 12) {
      setPhone('');
    } else if (phoneNumber.length === 12) {
      setPhoneNumber(phoneNumber.replace(re, '+$1 $2 $3 $4 $5'));
    }
  };
  const onFocusPhone = () => {
    setPhoneNumber(phoneNumber.replace(/\D/g, ''));
  };
  animation(Platform.OS as TPlatformName);
  return (
    <MaterialInput
      //@ts-ignore
      onRef={phoneRef}
      keyboardType={'phone-pad'}
      value={phoneNumber}
      lineWidth={0.5}
      onChangeText={phoneValidator}
      label={t('Recipients_phone_number')}
      onBlur={onBlurPhone}
      onFocus={onFocusPhone}
      tintColor={
        phoneNumber.length < 12 || phoneNumber.length > 12
          ? colors.red_F10000
          : colors.black_1B1B1B
      }
    />
  );
};
