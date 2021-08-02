import React from 'react';
import {useCallback} from '@hooks';
import {Text, TouchableOpacity} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {setSupport} from '@reducers/modalController';

type TProps = {
  dispatch: Dispatch;
};

const QuestionButton: React.FC<TProps> = ({dispatch}) => {
  const onPress = useCallback(() => {
    dispatch(setSupport(true));
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>?</Text>
    </TouchableOpacity>
  );
};

export default connect()(QuestionButton);
