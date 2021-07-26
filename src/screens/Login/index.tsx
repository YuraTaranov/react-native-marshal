import React from 'react'
import { SafeAreaView, TextInput } from 'react-native';
import { useMemo, useTranslation, useState, useNavigation, useRef, useEffect } from '@hooks'
import { View, Text, UsualButton, TextInputMask, KeyboardAvoidingView, QuestionButton, Icon, TouchableOpacity, Keyboard } from '@components'
import { TGlobalState } from '@types'
import { connect } from 'react-redux';
import styles from './styles';
import { colors } from '@constants';
import { verticalScale } from '@helpers';

type TProps = {}

const Login: React.FC<TProps> = ({ }) => {
	const { t } = useTranslation()
	const textInputMaskRef = useRef<TextInput>(null)
	const { setOptions, navigate } = useNavigation()
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [textInputFocus, setTextInputFocus] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		textInputMaskRef.current?.focus()
	}, [])

	setOptions({
		headerRight: () => <QuestionButton />
	})

	const onChangeText = (val: string | undefined) => {
		setPhoneNumber(val || '')
	}

	const submit = async () => {
		Keyboard.dismiss()
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			navigate('CodeConfirm')
		}, 3000)
		// const { data } = await AuthService.checkPhone(phoneNumber)
	}
	const clearPhoneNumber = () => setPhoneNumber('')

	const disabled = useMemo(() => phoneNumber.length < 9, [phoneNumber])

	const textInputBorderColor = useMemo(() => {
		return { borderBottomColor: textInputFocus || phoneNumber.length || loading ? colors.gray_2D2D2D : colors.gray_E1E1E8 }
	}, [phoneNumber, textInputFocus])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView keyboardVerticalOffset={verticalScale(100)} style={styles.container}>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{t('text.enterYourPhoneNumber')}</Text>
					<View style={[styles.phoneNumberView, textInputBorderColor]}>
						<Text style={styles.prefix}>+380 </Text>
						<TextInputMask
							ref={textInputMaskRef}
							onFocus={() => setTextInputFocus(true)}
							onBlur={() => setTextInputFocus(false)}
							style={styles.textInput}
							maxLength={11}
							keyboardType={'number-pad'}
							value={phoneNumber}
							mask={'[00] [000] [00] [00]'}
							onChangeText={(formatted, extracted) => onChangeText(extracted)}
						/>
						{
							phoneNumber.length ?
								<TouchableOpacity style={styles.closeBtn} onPress={clearPhoneNumber}>
									<Icon name={'Union'} color={colors.black_000000} size={14} />
								</TouchableOpacity> : null
						}
					</View>
				</View>
				<UsualButton
					title={t('button.title.continue')}
					loading={loading}
					dark={loading || !disabled}
					disabled={disabled}
					buttonStyle={{ marginBottom: 16, }}
					onPress={submit}
				/>
			</KeyboardAvoidingView >
		</SafeAreaView>
	)
}
const mapStateToProps = (state: TGlobalState) => ({});

export default connect(mapStateToProps)(Login);