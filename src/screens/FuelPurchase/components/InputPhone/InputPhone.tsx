import React from 'react';
import {useTranslation, useState, useRef, useEffect, useCallback} from '@hooks';
import {MaterialInput, Platform, formatWithMask} from '@components';
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
  const [isPhoneFocus, setIsPhoneFocus] = useState<boolean>(false);

  const onPhoneFocus = useCallback(() => {
    setIsPhoneFocus(true);
  }, []);
  const onPhoneBlur = useCallback(() => {
    setIsPhoneFocus(false);
  }, []);

  const phoneValidator = (str: string): void => {
    // let result = str.replace(/\D/, '');
    setPhoneNumber(str);
    if (str.length > 11 && !!phoneRef && !!phoneRef?.current) {
      //@ts-ignore
      phoneRef.current?.blur();
    }
  };

  const formatPhone = formatWithMask({
    text: phoneNumber,
    mask: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
  });

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

  useEffect(() => {
    if (phoneNumber.length === 12) {
      setPhone(phoneNumber);
    }
  }, [phoneNumber, setPhone]);

  animation(Platform.OS as TPlatformName);
  return (
    <MaterialInput
      keyboardType={'number-pad'}
      returnKeyType={'done'}
      value={formatPhone.masked}
      onChangeText={phoneValidator}
      lineWidth={0.5}
      maxLength={12}
      label={t('Номер телефону')}
      prefix="+380"
      onFocus={onPhoneFocus}
      onBlur={onPhoneBlur}
      //   textColor={isPhoneFocus ? colors.black_000000 : colors.gray_8D909D}
      baseColor={
        formatPhone.masked || isPhoneFocus
          ? colors.black_000000
          : colors.gray_8D909D
      }
    />
  );
};
