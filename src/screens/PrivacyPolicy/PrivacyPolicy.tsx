import React, {useEffect, useMemo} from 'react';

import {Text, ScrollView, Linking} from '@components';
import {useCallback, useNavigation} from '@hooks';
import {privacyPolicy, privacyPolicySupportPhone} from '@constants';
import styles from './styles';
import {connect} from 'react-redux';
import {TGlobalState, TSettingsText} from '@types';
import {Dispatch} from 'redux';
import {Dimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

type TProps = {
  dispatch: Dispatch;
  settings: TSettingsText[];
};

const PrivacyPolicy: React.FC<TProps> = ({dispatch, settings}) => {
  const {setOptions} = useNavigation();

  const onPressCall = useCallback(() => {
    Linking.openURL(`tel:0800508555`);
  }, []);

  useEffect(() => {
    setOptions({
      title: data?.title,
    });
  }, []);

  const data = useMemo(() => {
    return settings.find(item => item.type === 'privacy_policies');
  }, [settings]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {data ? (
        <RenderHtml
          contentWidth={Dimensions.get('screen').width}
          source={{html: data.text_html}}
        />
      ) : null}
      <Text style={styles.link} onPress={onPressCall}>
        {privacyPolicySupportPhone}
      </Text>
    </ScrollView>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  settings: state.settings.data,
});

export default connect(mapStateToProps)(PrivacyPolicy);
