import { Alert, OpenAppSettings } from "@components";
import { i18n } from "@services";

const openAppSettings = () => {
		Alert.alert(
		  '',
		  i18n.t('Для використання цього функціоналу, додатку потрібна ваша геолокація, хочете увімкнути її в налаштуваннях пристрою?'),
		  [
			{
			  text: i18n.t('Так'),
			  onPress: () => {
				OpenAppSettings.open();
			  },
			  style: 'default',
			},
			{
			  text: i18n.t('Ні'),
			  onPress: () => {},
			  style: 'cancel',
			},
		  ],
		);
}

export default openAppSettings