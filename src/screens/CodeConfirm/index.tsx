import React from 'react'
import { useMemo, useTranslation, useState, useNavigation, useEffect, useRef } from '@hooks'
import { View, Text, UsualButton, TextInputMask, KeyboardAvoidingView, ConfirmationCodeField, QuestionButton, Icon, TouchableOpacity, GhostButton, Keyboard } from '@components'
import { TGlobalState } from '@types'
import { connect } from 'react-redux';
import styles from './styles';
import { Dispatch } from 'redux';
import { AuthService } from '@httpServices';
import { colors } from '@constants';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SafeAreaView, TextInput } from 'react-native';
import { setToken } from '@reducers/appGlobalState';
import { verticalScale } from '@helpers';
type TProps = {
	dispatch: Dispatch
}

const CodeConfirm: React.FC<TProps> = ({ dispatch }) => {
	const { t } = useTranslation()
	const { setOptions, navigate } = useNavigation()
	const codeFieldRef = useRef<TextInput>(null)
	const [value, setValue] = useState('');
	const [needRefreshTimer, setNeedRefreshTimer] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false)
	const [counter, setCounter] = useState<number>(5);
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	useEffect(() => {
		codeFieldRef.current?.focus()
	}, [])

	useEffect(() => {
		let interval = setInterval(() => {
			setCounter((lastTimerCount) => {
				lastTimerCount <= 1 && clearInterval(interval);
				console.log(lastTimerCount);
				return lastTimerCount - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [needRefreshTimer]);

	setOptions({
		headerRight: () => <QuestionButton />
	})

	const resendCode = () => {
		setNeedRefreshTimer(!needRefreshTimer);
		setCounter(5);
	}

	const submit = async () => {
		Keyboard.dismiss()
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			navigate('Registration')
			// dispatch(setToken('asd'))
		}, 4000)
	}


	return (
		<SafeAreaView style = {{flex: 1}}>
			<KeyboardAvoidingView keyboardVerticalOffset={verticalScale(100)} style={styles.container}>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{t('text.enterVerificationCodeViaSMS:')}</Text>
					<CodeField
						ref={codeFieldRef}
						{...props}
						value={value}
						onChangeText={setValue}
						cellCount={4}
						rootStyle={styles.codeFiledRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<View
								onLayout={getCellOnLayoutHandler(index)}
								key={index}
								style={[styles.cellRoot, index === 1 ? styles.centerLeftInput : index === 2 ? styles.centerRightInput : null, isFocused || symbol ? styles.focusCell : null]}>
								<Text style={styles.cellText}>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							</View>
						)}
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
			</KeyboardAvoidingView >
		</SafeAreaView>
	)
}
const mapStateToProps = (state: TGlobalState) => ({

});

export default connect(mapStateToProps)(CodeConfirm);