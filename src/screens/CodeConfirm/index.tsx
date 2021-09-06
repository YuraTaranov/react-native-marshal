import React from 'react';
import {
  useTranslation,
  useState,
  useNavigation,
  useEffect,
  useRef,
  useCallback,
} from '@hooks';
import {
  View,
  Text,
  UsualButton,
  KeyboardAvoidingView,
  QuestionButton,
  GhostButton,
  Keyboard,
} from '@components';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {SafeAreaView, TextInput} from 'react-native';
import {ios} from '@constants';
import {verticalScale} from '@helpers';
import {setLoading, checkCode, checkPhone} from '@reducers/login';
import {Dispatch} from 'redux';

type TProps = {
  dispatch: Dispatch;
  loading: boolean;
};

const CodeConfirm: React.FC<TProps> = ({dispatch, loading}) => {
  const {t} = useTranslation();
  const {setOptions} = useNavigation();
  const codeFieldRef = useRef<TextInput>(null);
  const [value, setValue] = useState('');
  const [needRefreshTimer, setNeedRefreshTimer] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(60);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    codeFieldRef.current?.focus();
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setCounter(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [needRefreshTimer]);

  const resendCode = useCallback(() => {
    dispatch(checkPhone({needNavigate: false}));
    setNeedRefreshTimer(!needRefreshTimer);
    setCounter(60);
  }, [needRefreshTimer]);

  const submit = useCallback(async () => {
    Keyboard.dismiss();
    dispatch(setLoading(true));
    dispatch(checkCode(value));
  }, [value]);

  const renderCell = useCallback(
    ({index, symbol, isFocused}) => (
      <View
        onLayout={getCellOnLayoutHandler(index)}
        key={index}
        style={[
          styles.cellRoot,
          index === 1
            ? styles.centerLeftInput
            : index === 2
            ? styles.centerRightInput
            : null,
          isFocused || symbol ? styles.focusCell : null,
        ]}>
        <Text style={styles.cellText}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={verticalScale(100)}
        behavior={ios ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {t('text.enterVerificationCodeViaSMS:')}
          </Text>
          <CodeField
            ref={codeFieldRef}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
        </View>
        <GhostButton
          title={t('text.resendCode')}
          timer={counter}
          loading={false}
          disabled={counter > 0 || loading}
          onPress={resendCode}
        />
        <UsualButton
          buttonStyle={styles.usualBtn}
          title={t('button.title.continue')}
          loading={loading}
          disabled={value.length < 4}
          onPress={submit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  loading: state.login.loading,
});

export default connect(mapStateToProps)(CodeConfirm);
