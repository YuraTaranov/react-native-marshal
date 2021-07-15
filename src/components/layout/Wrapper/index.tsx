import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView } from '@components';
import { TGlobalState } from '@types';
import styles from './styles';

const Wrapper: React.FC<TProps> = ({ children, }) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.headerView}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </Fragment>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState
})


export default connect(mapStateToProps)(Wrapper);

type TProps = {
  children: React.ReactNode;
};
