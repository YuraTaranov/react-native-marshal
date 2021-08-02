import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, Support } from '@components';
import { TGlobalState } from '@types';
import styles from './styles';
// import { useHeaderHeight } from '@react-navigation';

const Wrapper: React.FC<TProps> = ({ children }) => {

  // const headerHeight = useHeaderHeight();


  return (
    <Fragment>
      <Support />
      <View style={styles.container}>
        {children}
      </View>
    </Fragment>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  appGlobalState: state.appGlobalState,
})


export default connect(mapStateToProps)(Wrapper);

type TProps = {
  children: React.ReactNode;
};
