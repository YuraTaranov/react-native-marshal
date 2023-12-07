import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Support, StatusBar} from '@components';
import {TGlobalState} from '@types';
import styles from './styles';
import {colors} from '@constants';

const Wrapper: React.FC<TProps> = ({children}) => {
  return (
    <Fragment>
      <StatusBar backgroundColor={colors.white_FFFFFF} animated={true} />
      <Support />
      <View style={styles.container}>{children}</View>
    </Fragment>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
});

export default connect(mapStateToProps)(Wrapper);

type TProps = {
  children: React.ReactNode;
};
