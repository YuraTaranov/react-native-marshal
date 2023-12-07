import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from '@components';
import {connect} from 'react-redux';
import {animation} from '@helpers';
import styles from './styles';
import {colors} from '@constants';

const Loader: React.FC<TProps> = ({children, loader}) => {
  animation('ios');
  return (
    <View style={styles.container}>
      {children}
      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={colors.white_FFFFFF} />
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state: any) => ({
  loader: state.appGlobalState.loader,
});
export default connect(mapStateToProps)(Loader);

type TProps = {
  loader: boolean;
};
