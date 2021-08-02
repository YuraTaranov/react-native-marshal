import React from 'react';
import {Dispatch} from 'redux';
import {SafeAreaView, TextInput} from 'react-native';
import {
  useMemo,
  useTranslation,
  useState,
  useNavigation,
  useRef,
  useEffect,
  useCallback,
} from '@hooks';
import {
  View,
  Text,
  UsualButton,
  TextInputMask,
  KeyboardAvoidingView,
  QuestionButton,
  Icon,
  TouchableOpacity,
  Keyboard,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '@constants';
import {verticalScale} from '@helpers';
import {setPhone, checkPhone} from '@reducers/login';

type TProps = {
  dispatch: Dispatch;
  phone: string;
  loading: boolean;
};

const Login: React.FC<TProps> = ({dispatch, phone, loading}) => {
  const {t} = useTranslation();
  const textInputMaskRef = useRef<TextInput>(null);
  const {setOptions} = useNavigation();
  const [textInputFocus, setTextInputFocus] = useState<boolean>(false);

  useEffect(() => {
    textInputMaskRef.current?.focus();
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  const onChangeText = useCallback((val: string | undefined) => {
    dispatch(setPhone(val || ''));
  }, []);

  const submit = useCallback(async () => {
    Keyboard.dismiss();
    dispatch(checkPhone({needNavigate: true}));
  }, []);

  const clearPhoneNumber = useCallback(() => {
    dispatch(setPhone(''));
  }, []);

  const setInputFocusTrue = useCallback(() => {
    setTextInputFocus(true);
  }, []);

  const setInputFocusFalse = useCallback(() => {
    setTextInputFocus(false);
  }, []);

  const changeText = useCallback((formatted, extracted) => {
    onChangeText(extracted);
  }, []);

  const disabled = useMemo(() => phone.length < 9, [phone]);

  const textInputBorderColor = useMemo(() => {
    return {
      borderBottomColor:
        textInputFocus || phone.length || loading
          ? colors.gray_2D2D2D
          : colors.gray_E1E1E8,
    };
  }, [phone, textInputFocus]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalScale(90)}
        style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('text.enterYourPhoneNumber')}</Text>
          <View style={[styles.phoneNumberView, textInputBorderColor]}>
            <Text style={styles.prefix}>+380 </Text>
            <TextInputMask
              ref={textInputMaskRef}
              onFocus={setInputFocusTrue}
              onBlur={setInputFocusFalse}
              style={styles.textInput}
              maxLength={11}
              keyboardType={'number-pad'}
              value={phone}
              mask={'[00] [000] [00] [00]'}
              onChangeText={changeText}
            />
            {phone.length ? (
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={clearPhoneNumber}>
                <Icon name={'Union'} color={colors.black_000000} size={14} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <UsualButton
          title={t('button.title.continue')}
          loading={loading}
          dark={loading || !disabled}
          disabled={disabled}
          buttonStyle={styles.buttonStyle}
          onPress={submit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  phone: state.login.phone,
  loading: state.login.loading,
});

export default connect(mapStateToProps)(Login);
