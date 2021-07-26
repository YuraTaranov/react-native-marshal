import React from 'react'
import { Platform, SafeAreaView, TextInput } from 'react-native';
import { TextField } from 'rn-material-ui-textfield';
import { connect } from 'react-redux';
import moment from 'moment'
import { useMemo, useTranslation, useState, useNavigation, useRef, useEffect } from '@hooks'
import { View, Text, UsualButton, KeyboardAvoidingView, QuestionButton, Icon, TouchableOpacity, Keyboard, MaterialInput, DateTimePicker } from '@components'
import { TGlobalState } from '@types'
import { animation, verticalScale } from '@helpers';
import styles from './styles';

type TProps = {
	appGlobalState: TGlobalState['appGlobalState']
}

const Registration: React.FC<TProps> = ({ appGlobalState }) => {
	const { t } = useTranslation()

	let nameTIRef = useRef<TextField>(null)

	const textInputMaskRef = useRef<TextInput>(null)
	const { setOptions, navigate } = useNavigation()
	const [nameValue, setNameValue] = useState<string>('')
	const [surnameValue, setSurnameValue] = useState<string>('')
	const [birthdayValue, setBirthdayValue] = useState<Date>(new Date());
	const [sexValue, setSexValue] = useState<string>('');
	const [visibleDatePicker, setVisibleDatePicker] = useState<boolean>(false)
	const [consentPersonalData, setConsentPersonalData] = useState<boolean>(false);
	const [agreeLoyaltyProgram, setAgreeLoyaltyProgram] = useState<boolean>(false);
	const [textInputFocus, setTextInputFocus] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		textInputMaskRef.current?.focus()
	}, [])

	setOptions({
		headerRight: () => <QuestionButton />
	})

	const submit = async () => {
		Keyboard.dismiss()
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			navigate('CodeConfirm')
		}, 3000)
		// const { data } = await AuthService.checkPhone(phoneNumber)
	}

	const onChangeDate = (event: any, date: Date | undefined) => {
		if (date) {
			setVisibleDatePicker(Platform.OS === 'ios');
			setBirthdayValue(date)
		}
	}

	const onFocusField = () => {
		setVisibleDatePicker(false)
	}

	animation('ios')

	const onPressDateInput = () => {
		Keyboard.dismiss()
		setVisibleDatePicker(true)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView keyboardVerticalOffset={verticalScale(100)} style={styles.container}>
				<View style={styles.contentContainer}>
					<Text style={styles.title}>{t('text.enterYourPersonalInformation')}</Text>
					<MaterialInput
						onFocus={onFocusField}
						onRef={(ref) => { }}
						keyboardType={'ascii-capable'}
						returnKeyType={'next'}
						value={nameValue}
						label={t('textInput.name')}
						onChangeText={setNameValue} />
					<MaterialInput
						onFocus={onFocusField}
						onRef={(ref) => { }}
						keyboardType={'ascii-capable'}
						returnKeyType={'next'}
						value={surnameValue}
						label={t('textInput.surname')}
						onChangeText={setSurnameValue} />
					<View>
						<TouchableOpacity style={styles.buttonTI} onPress={onPressDateInput}>
						</TouchableOpacity>
						<MaterialInput
							renderRightAccessory
							rightAccessoryName={'calendar-dates'}
							value={moment(birthdayValue).format('DD.MM.YYYY')}
							label={t('textInput.dateOfBirth')}
							onChangeText={setSurnameValue} />
					</View>
					<View>
						<TouchableOpacity style={styles.buttonTI} disabled={true}>
						</TouchableOpacity>
						<MaterialInput
							renderRightAccessory
							rightAccessoryName={'arrow-down'}
							returnKeyType={'next'}
							value={sexValue}
							label={t('textInput.sex')}
							onChangeText={setSurnameValue} />
					</View>
				</View>
				{
					visibleDatePicker &&
					<DateTimePicker

						mode={'date'}
						locale={appGlobalState.lang}
						value={birthdayValue}
						is24Hour={true}
						display='spinner'
						onChange={onChangeDate}
					/>
				}
				<UsualButton
					title={t('button.title.continue')}
					loading={loading}
					dark={loading || !false}
					disabled={false}
					buttonStyle={{ marginBottom: 16, }}
					onPress={submit}
				/>
			</KeyboardAvoidingView >
		</SafeAreaView>
	)
}
const mapStateToProps = (state: TGlobalState) => ({
	appGlobalState: state.appGlobalState
});

export default connect(mapStateToProps)(Registration);